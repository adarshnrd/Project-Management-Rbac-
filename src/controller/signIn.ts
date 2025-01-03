import { USER_PASS_ENTER_COUNT_CACHE_KEY } from '#src/constant';
import { ENTERED_WRONG_USER_PASSWORD, USER_NOT_FOUND_WITH_EMAIL } from '#src/constant/error';
import PmCache from '#src/helper/pmCache';
import PmContext from '#src/helper/pmContext';
import { userSignInReqParams } from '#src/types/userSignIn';
import { Request, Response } from 'express';

export default class SignIn {
  private _pmContext: PmContext;
  constructor() {
    this._pmContext = new PmContext();
  }

  public async validateLogin(req: Request<object, object, userSignInReqParams>, res: Response) {
    const { email, password } = req.body;
    const userModel = await this._pmContext.userService.getUserData(email);
    if (!userModel) {
      return res.render('signIn', { errorMessage: USER_NOT_FOUND_WITH_EMAIL });
    }
    const userPasswordAttempted = PmCache.nodeCache.get<number>(USER_PASS_ENTER_COUNT_CACHE_KEY(email));
    if (password !== userModel.password) {
      const userAttemptedCount = userPasswordAttempted ? userPasswordAttempted + 1 : 1;
      PmCache.nodeCache.set<number>(USER_PASS_ENTER_COUNT_CACHE_KEY(email), userAttemptedCount, 180); // save for 3 mins
      return res.render('signIn', { errorMessage: ENTERED_WRONG_USER_PASSWORD(userAttemptedCount) });
    }
    res.status(200).render('homePage');
  }
}
