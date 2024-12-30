import { userService } from '#service/userService';
import { OTP_CACHE_KEY } from '#src/constant';
import PmCache from '#src/helper/pmCache';
import UserRepository from '#src/repository/userRepository';
import { VerifyOtpRequestParams } from '#src/types/verifyOtp';
import { CryptoDataEncryption } from '#utils/crypto';
import { Request, Response } from 'express';

export class VerifyOtpController {
  private _userRepository: UserRepository;
  private _userService: userService;
  constructor() {
    this._userRepository = new UserRepository();
    this._userService = new userService(this._userRepository);
  }
  public async verifyOtp(req: Request<VerifyOtpRequestParams>, res: Response) {
    const verifyOtpRequestParams = req.body;
    const decryptEmail = new CryptoDataEncryption().decryptEmail(verifyOtpRequestParams.email);
    const userOtp = PmCache.nodeCache.get(OTP_CACHE_KEY(decryptEmail));
    if (!userOtp) {
      //TODO:- redirect to otp page with a message please try again.
    }
    if (verifyOtpRequestParams.otp === userOtp) {
      await this._userService.update({ verifiedUser: true }, decryptEmail);
      return res.status(200).render('homePage');
    }
    return res.status(400).render('errorMessage', { errorMessage: 'Wrong OTP please try again' });
  }
}
