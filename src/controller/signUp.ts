import { Request, Response } from 'express';
import logger from '@mindpath/logger';

import { ERROR_CODES_MESSAGE } from '#src/constant/error';
import { UserSignUpDto } from '#src/dto/userSignUpDto';
import { UserSchema } from '#src/joi/userSchema';
import { UserModel } from 'src/models/userModel';
import { userService } from 'src/service/userService';
import { PROJECT_ROUTES } from '#src/constant';

export default class SignUp {
  private _userService: userService;
  constructor(userService: userService) {
    this._userService = userService;
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
        return res.status(403).send('Please enter a valid field' + error.message);
      }
      const userModel = new UserModel();
      userModel.firstName = value.firstName;
      userModel.lastName = value.lastName;
      userModel.email = value.email;
      userModel.phone = value.countryCode + value.phone;
      userModel.companyName = value.companyName;
      await this._userService.addUserData(userModel);
      const verificationLink = process.env.DOMAIN_URL ?? 'http://localhost';
      return res.render('validationTextPage', {
        verificationLink: `${verificationLink}/${PROJECT_ROUTES.REVERIFICATION_PAGE}`,
      });
    } catch (error) {
      logger.error({
        error: error,
        message: 'Unable to process user signUp',
      });
      return res.status(500).send(ERROR_CODES_MESSAGE[500]);
    }
  }
}
