import { Request, Response } from 'express';
import logger from '@mindpath/logger';

import { ERROR_CODES_MESSAGE, ERROR_MESSAGE_FOR_DUPLICATE_EMAIL_ENTRY } from '#src/constant/error';
import { UserSignUpDto } from '#src/dto/userSignUpDto';
import { UserSchema } from '#src/joi/userSchema';
import { UserModel } from '#models/userModel';
import { userService } from 'src/service/userService';
import PmContext from '#src/helper/pmContext';
import { generateOTP, sendErrorResponseWithErrorRenderPage } from '#utils/utils';
import { CryptoDataEncryption } from '#utils/crypto';
import { ResendPath } from '#src/enum/path';
import { UserRoleModel } from '#models/userRoleModel';
import { UserRoleEnumType } from '#src/enum/userRole';

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
        return sendErrorResponseWithErrorRenderPage(res, 403, errorMessage);
      }
      let userModel = new UserModel();
      userModel.firstName = value.firstName;
      userModel.lastName = value.lastName;
      userModel.email = value.email;
      if (value.phone) {
        userModel.phone = value.countryCode + value.phone;
      }
      userModel.companyName = value.companyName;
      // const userRoleModel = new UserRoleModel();
      // userRoleModel.role = UserRoleEnumType.Admin;
      // userRoleModel.userModel = userModel;
      // userModel.roleModel = userRoleModel;
      try {
        userModel = await this._userService.addUserData(userModel);
        const userRoleModel = new UserRoleModel();
        userRoleModel.role = UserRoleEnumType.Admin;
        await this._pmContext.userRoleService.addUserRole(userRoleModel, userModel);
      } catch (error) {
        const errorMessage = (error as Error)?.message;
        if (errorMessage.includes('Duplicate entry')) {
          return sendErrorResponseWithErrorRenderPage(
            res,
            400,
            ERROR_CODES_MESSAGE[400],
            ERROR_MESSAGE_FOR_DUPLICATE_EMAIL_ENTRY,
          );
        } else {
          logger.error({
            error,
            source: 'SignUp#processSignUpData',
          });
          return sendErrorResponseWithErrorRenderPage(res, 500, ERROR_CODES_MESSAGE[500]);
        }
      }
      await this._pmContext.helperClass.processOtpWithEmail(userModel.email, generateOTP(5));
      const encryptedEmail = new CryptoDataEncryption().encryptEmail(value.email);
      //need to create a route for it to route it back.
      return res.render('otpValidationTextPage', { userEmail: encryptedEmail, path: ResendPath.VERIFY_OTP });
    } catch (error) {
      logger.error({
        error: error,
        source: 'SignUp#processSignUpData',
        message: 'Unable to process user signUp',
      });
      return sendErrorResponseWithErrorRenderPage(res, 500, ERROR_CODES_MESSAGE[500]);
    }
  }
}
