import { Request, Response } from 'express';
import PmContext from '#src/helper/pmContext';
import { UNABLE_TO_FIND_USER_ACCOUNT } from '#src/constant/error';
import { generateOTP } from '#utils/utils';
import { CryptoDataEncryption } from '#utils/crypto';
import { ResendPath } from '#src/enum/path';

export class FindAccount {
  private _pmContext: PmContext;
  constructor() {
    this._pmContext = new PmContext();
  }
  public async findAccountAndProcessOtp(req: Request, res: Response) {
    const { email } = req.body;
    const userModel = await this._pmContext.userService.getUserData(email);
    if (!userModel) {
      return res.render('forgotPassword', { errorMessage: UNABLE_TO_FIND_USER_ACCOUNT });
    }
    await this._pmContext.helperClass.processOtpWithEmail(email, generateOTP(5));
    const encryptedEmail = new CryptoDataEncryption().encryptEmail(email);
    return res.render('otpValidationTextPage', { userEmail: encryptedEmail, path: ResendPath.FORGET_PASSWORD });
  }
}
