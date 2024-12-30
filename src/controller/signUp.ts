import { Request, Response } from 'express';
import logger from '@mindpath/logger';

import { ERROR_CODES_MESSAGE } from '#src/constant/error';
import { UserSignUpDto } from '#src/dto/userSignUpDto';
import { UserSchema } from '#src/joi/userSchema';
import { UserModel } from 'src/models/userModel';
import { userService } from 'src/service/userService';
import PmContext from '#src/helper/pmContext';
import { generateOTP } from '#utils/utils';
import { CryptoDataEncryption } from '#utils/crypto';

export default class SignUp {
  private _pmContext: PmContext;
  private _userService: userService;
  constructor(pmContext: PmContext) {
    this._pmContext = pmContext;
    this._userService = pmContext.userService;
  }
  public async processSignUpData(req: Request, res: Response) {
    try {
      const userSignUpData = new UserSignUpDto(req.body);
      const { error, value } = UserSchema.validate(userSignUpData);
      if (error) {
        logger.warn({
          error,
          message: 'User not able to sign up.',
        });
        const errorMessage = error.message;
        return res.status(403).render('errorMessage', { errorMessage });
      }
      const userModel = new UserModel();
      userModel.firstName = value.firstName;
      userModel.lastName = value.lastName;
      userModel.email = value.email;
      userModel.phone = value.countryCode + value.phone;
      userModel.companyName = value.companyName;
      let isDuplicateEntry = false;
      try {
        await this._userService.addUserData(userModel);
      } catch (error) {
        const errorMessage = (error as Error)?.message;
        if (errorMessage.includes('Duplicate entry')) {
          isDuplicateEntry = true;
        } else {
          logger.error({
            error,
            source: 'SignUp#processSignUpData',
          });
          return res.status(500).render('errorMessage', { errorMessage: ERROR_CODES_MESSAGE[500] });
        }
      }
      if (isDuplicateEntry) {
        return res.status(400).render('errorMessage', {
          errorMessage: ERROR_CODES_MESSAGE[400],
          errorDetails:
            'The email address already exists. You can either create an account using a new email or reset the password for the existing email.',
        });
      }
      await this._pmContext.helperClass.processOtpWithEmail(userModel.email, generateOTP(5).otp);
      const encryptedEmail = new CryptoDataEncryption().encryptEmail(value.email);
      return res.render('validationTextPage', { userEmail: encryptedEmail });
    } catch (error) {
      logger.error({
        error: error,
        source: 'SignUp#processSignUpData',
        message: 'Unable to process user signUp',
      });
      return res.status(500).render('errorMessage', { errorMessage: ERROR_CODES_MESSAGE[500] });
    }
  }
}
