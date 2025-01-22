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

  public async validateLogin(req: Request<object, any, userSignInReqParams>, res: Response): Promise<void> {
    //TODO:- can create a cache if already login don't validate one more time
    const reqBody = req.body;
    reqBody.username = reqBody.username?.trim();
    const { username, password } = reqBody;
    const userModel = await this._pmContext.userService.getUserData(username);
    if (!userModel || !username) {
      return res.render('signIn', { errorMessage: USER_NOT_FOUND_WITH_EMAIL });
    }
    const userPasswordAttempted = PmCache.nodeCache.get<number>(USER_PASS_ENTER_COUNT_CACHE_KEY(username));
    if (password !== userModel.password) {
      const userAttemptedCount = userPasswordAttempted ? userPasswordAttempted + 1 : 1;
      PmCache.nodeCache.set<number>(USER_PASS_ENTER_COUNT_CACHE_KEY(username), userAttemptedCount, 180); // save for 3 mins
      return res.render('signIn', { errorMessage: ENTERED_WRONG_USER_PASSWORD(userAttemptedCount) });
    }
    (req.session as any).user = { username }; // Store user info in session
    res.status(200).render('homePage');
  }

  public async sessionUserValidation(req: Request, res: Response): Promise<boolean> {
    const userSessionDetails = (req.session as any)?.user?.username;
    const userModel = await this._pmContext.userService.getUserData(userSessionDetails);
    if (userModel) {
      return true;
    }
    return false;
  }
}
