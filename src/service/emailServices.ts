import BrevoRepository from '#src/repository/brevoRepository';
import { BrevoEmailSendType } from '#src/types/brevoEmail';

export default class EmailService {
  private _brevoRepository: BrevoRepository;
  constructor(brevoRepository: BrevoRepository) {
    this._brevoRepository = brevoRepository;
  }

  public async sendEmail(emailType: BrevoEmailSendType): Promise<void> {
    return await this._brevoRepository.sendEmail(emailType);
  }
}
