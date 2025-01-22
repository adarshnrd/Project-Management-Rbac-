import { userService } from '#service/userService';
import { APP_PORT, DOMAIN_URL, OTP_CACHE_KEY, PROJECT_ROUTES } from '#src/constant';
import { ERROR_CODES_MESSAGE, OTP_MAX_ATTEMPTED_ERROR_MESSAGE, SOMETHING_WENT_WRONG } from '#src/constant/error';
import { ResendPath } from '#src/enum/path';
import PmCache from '#src/helper/pmCache';
import PmContext from '#src/helper/pmContext';
import UserRepository from '#src/repository/userRepository';
import { OtpValidateOptions, ResendRequestParams, VerifyOtpRequestParams } from '#src/types/verifyOtp';
import { CryptoDataEncryption } from '#utils/crypto';
import { generateOTP, sendErrorResponseWithErrorRenderPage } from '#utils/utils';
import { Request, Response } from 'express';

export class VerifyOtpController {
  private _userRepository: UserRepository;
  private _userService: userService;
  private _pmContext: PmContext;
  private _cryptoDataEncryption: CryptoDataEncryption;
  constructor() {
    this._userRepository = new UserRepository();
    this._userService = new userService(this._userRepository);
    this._pmContext = new PmContext();
    this._cryptoDataEncryption = new CryptoDataEncryption();
  }
  public async verifyOtp(req: Request<VerifyOtpRequestParams>, res: Response) {
    const verifyOtpRequestParams = req.body;
    let decryptEmail = '';
    const homeUrl = process.env.HOME_URL ?? `${DOMAIN_URL}:${APP_PORT}${PROJECT_ROUTES.HOME_DEFAULT_PAGE}`;
    if (!verifyOtpRequestParams.email) {
      return sendErrorResponseWithErrorRenderPage(
        res,
        400,
        ERROR_CODES_MESSAGE[400],
        SOMETHING_WENT_WRONG,
        undefined,
        homeUrl,
      );
    }
    decryptEmail = this._cryptoDataEncryption.decryptEmail(verifyOtpRequestParams.email);
    const otpCacheKey = OTP_CACHE_KEY(decryptEmail);
    const otpValidateOptions = PmCache.nodeCache.get<OtpValidateOptions>(otpCacheKey);
    if (!otpValidateOptions) {
      await this._pmContext.helperClass.processOtpWithEmail(decryptEmail, generateOTP(5));
      res.status(400).render('otpValidationTextPage', {
        userEmail: verifyOtpRequestParams.email,
        otpInNodeCacheNotFound: true,
        path: ResendPath.VERIFY_OTP,
      });
      return;
    }
    const { otp, userAttemptedOtpCount, expiryTimeInMins } = otpValidateOptions;
    const currentTime = new Date().getTime();
    if (currentTime <= expiryTimeInMins && Number(verifyOtpRequestParams.otp) === otp && userAttemptedOtpCount < 4) {
      await this._userService.update({ verifiedUser: true }, decryptEmail);
      return res.status(200).render('createPasswordPage', { userEmail: verifyOtpRequestParams.email });
    }
    otpValidateOptions.userAttemptedOtpCount = otpValidateOptions.userAttemptedOtpCount + 1;
    if (otpValidateOptions.userAttemptedOtpCount >= 3) {
      //Need to find solution for this should we delete the detail of user.
      await this._userService.delete(decryptEmail);
      return sendErrorResponseWithErrorRenderPage(
        res,
        400,
        ERROR_CODES_MESSAGE[400],
        OTP_MAX_ATTEMPTED_ERROR_MESSAGE,
        undefined,
        homeUrl,
      );
    }
    const cacheDeleted = expiryTimeInMins - currentTime;
    PmCache.nodeCache.set<OtpValidateOptions>(otpCacheKey, otpValidateOptions, new Date(cacheDeleted).getSeconds());
    return res.status(400).render('otpValidationTextPage', {
      userEmail: verifyOtpRequestParams.email,
      wrongOtpAttempted: otpValidateOptions.userAttemptedOtpCount,
      path: ResendPath.VERIFY_OTP,
    });
  }

  public async resendOtp(req: Request<object, object, ResendRequestParams>, res: Response) {
    const reqBody = req.body;
    // let renderPage = '';
    const decryptEmail = this._cryptoDataEncryption.decryptEmail(reqBody.email);
    await this._pmContext.helperClass.processOtpWithEmail(decryptEmail, generateOTP(5));
    if (reqBody.path === ResendPath.VERIFY_OTP) {
      return res.status(200).render('otpValidationTextPage', {
        userEmail: reqBody.email,
        path: ResendPath.VERIFY_OTP,
      });
    }
  }
}
