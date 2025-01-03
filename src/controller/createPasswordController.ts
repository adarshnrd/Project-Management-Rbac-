import { USER_PASS_ALREADY_PROCESSED } from '#src/constant';
import { PASSWORD_NOT_SAVED_ERROR } from '#src/constant/error';
import PmCache from '#src/helper/pmCache';
import PmContext from '#src/helper/pmContext';
import { userSignInReqParams } from '#src/types/userSignIn';
import { CryptoDataEncryption } from '#utils/crypto';
import { sendErrorResponseWithErrorRenderPage } from '#utils/utils';
import { Request, Response } from 'express';

export class CreatePasswordController {
  private _pmContext: PmContext;
  private _cryptoDataEncryption: CryptoDataEncryption;
  constructor() {
    this._pmContext = new PmContext();
    this._cryptoDataEncryption = new CryptoDataEncryption();
  }
  public async saveUserPassword(req: Request<object, object, userSignInReqParams>, res: Response) {
    const { password, email } = req.body;
    const isPasswordIsSaveCacheKey = USER_PASS_ALREADY_PROCESSED(email);
    const isPasswordAlreadyProcessed = PmCache.nodeCache.get<boolean>(isPasswordIsSaveCacheKey);
    if (isPasswordAlreadyProcessed) {
      //TODO:- need to improve here.
      return res.render('homePage');
    }
    //TODO:- what if email is not there render a page asking the user email and password.
    const decryptEmail = this._cryptoDataEncryption.decryptEmail(email);
    const isPasswordIsSave = await this._pmContext.userService.updateUserPassword(decryptEmail, password);
    if (!isPasswordIsSave) {
      return sendErrorResponseWithErrorRenderPage(res, 400, PASSWORD_NOT_SAVED_ERROR);
    }
    PmCache.nodeCache.set<boolean>(isPasswordIsSaveCacheKey, true);
    return res.status(200).render('homePage');
  }
}
