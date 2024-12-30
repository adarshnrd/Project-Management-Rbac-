import logger from '@mindpath/logger';

import { BREVO_ROUTES } from '#src/constant/brevo';
import { BrevoEmailSendType } from '#src/types/brevoEmail';
import axios from 'axios';
export default class BrevoRepository {
  private _apiKey: string;
  private _baseUrl: string;
  constructor(apiKey: string, baseUrl: string) {
    this._apiKey = apiKey;
    this._baseUrl = baseUrl;
  }
  public async sendEmail(emailData: BrevoEmailSendType): Promise<void> {
    try {
      const url = `${this._baseUrl}${BREVO_ROUTES.SEND_EMAIL}`;
      await axios.post(url, emailData, {
        headers: {
          accept: 'application/json',
          'api-key': this._apiKey,
          'content-type': 'application/json',
        },
      });
      return;
    } catch (error) {
      logger.error({
        error,
        source: 'BrevoRepository#sendEmail',
      });
    }
  }
}
