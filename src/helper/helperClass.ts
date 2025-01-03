import logger from '@mindpath/logger';

import PmContext from './pmContext';
import { BrevoEmailSendType, GenerateOtpResponse } from '#src/types/brevoEmail';
import { OTP_VERIFICATION_TEMPLATE } from '#src/constant/messageTemplate';
import { DEFAULT_EMAIL_USER_NAME, OTP_CACHE_KEY, OTP_EMAIL_SUBJECT, SENDER_EMAIL } from '#src/constant';
import PmCache from './pmCache';
import NodeCache from 'node-cache';
import { OtpValidateOptions } from '#src/types/verifyOtp';

export class HelperClass {
  private _pmContext: PmContext;
  private _nodeCache: NodeCache;
  constructor(pmContext: PmContext) {
    this._pmContext = pmContext;
    this._nodeCache = PmCache.nodeCache;
  }

  public async processOtpWithEmail(email: string, generateOtpResponse: GenerateOtpResponse): Promise<void> {
    try {
      const { otp, otpExpireTime } = generateOtpResponse;
      const htmlContent = OTP_VERIFICATION_TEMPLATE(otp);
      //TODO:-Can be modified it We can get the data from signUp just by adding.
      const userModel = await this._pmContext.userService.getUserData(email);
      if (!userModel) {
        logger.warn({
          message: 'Unable to find UserModel',
          source: 'HelperClass#processOtpWithEmail',
        });
        return;
      }
      const emailSenderType: BrevoEmailSendType = {
        sender: {
          name: DEFAULT_EMAIL_USER_NAME,
          email: SENDER_EMAIL,
        },
        to: [
          {
            name: userModel.firstName,
            email: userModel.email,
          },
        ],
        subject: OTP_EMAIL_SUBJECT(otp),
        htmlContent,
      };
      console.log(emailSenderType);
      // await this._pmContext.emailService.sendEmail(emailSenderType);
      const otpValidateOptions: OtpValidateOptions = {
        otp: Number(otp),
        expiryTimeInMins: otpExpireTime,
        userAttemptedOtpCount: 0,
      };
      this._nodeCache.set<OtpValidateOptions>(OTP_CACHE_KEY(email), otpValidateOptions, 300);
    } catch (error) {
      logger.error({
        error: error as Error,
        action: 'error',
        source: 'DialogUtils#processOtpViaEmail',
      });
    }
    return;
  }
}
