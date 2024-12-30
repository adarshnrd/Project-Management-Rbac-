import logger from '@mindpath/logger';

import PmContext from './pmContext';
import { BrevoEmailSendType } from '#src/types/brevoEmail';
import { OTP_VERIFICATION_TEMPLATE } from '#src/constant/messageTemplate';
import { DEFAULT_EMAIL_USER_NAME, OTP_CACHE_KEY, OTP_EMAIL_SUBJECT, SENDER_EMAIL } from '#src/constant';
import PmCache from './pmCache';
import NodeCache from 'node-cache';

export class HelperClass {
  private _pmContext: PmContext;
  private _nodeCache: NodeCache;
  constructor(pmContext: PmContext) {
    this._pmContext = pmContext;
    this._nodeCache = PmCache.nodeCache;
  }

  public async processOtpWithEmail(email: string, otp: string): Promise<void> {
    try {
      const htmlContent = OTP_VERIFICATION_TEMPLATE(otp);
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
      await this._pmContext.emailService.sendEmail(emailSenderType);
      this._nodeCache.set<number>(OTP_CACHE_KEY(email), Number(otp), 300);
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
