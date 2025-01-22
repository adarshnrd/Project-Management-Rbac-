import { Router, Request, Response } from 'express';
import SignIn from '../controller/signIn';

export const signInRouter = Router();

signInRouter.get('/signIn', async (req: Request, res: Response) => {
  if (req.session && (req.session as any)?.user) {
    if (await new SignIn().sessionUserValidation(req, res)) {
      return res.render('homePage');
    }
    return res.render('signIn');
  } else {
    return res.render('signIn');
  }
});

signInRouter.post('/signIn', (req: Request, res: Response) => {
  new SignIn().validateLogin(req, res);
  return;
});
