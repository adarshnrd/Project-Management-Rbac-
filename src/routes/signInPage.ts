import { Router, Request, Response } from 'express';
import SignIn from '../controller/signIn';

export const signInRouter = Router();

signInRouter.get('/signIn', (req: Request, res: Response) => {
  return res.render('signIn');
});

signInRouter.post('/signIn', (req: Request, res: Response) => {
  console.log('hello to signIn');
  new SignIn().validateLogin(req, res);
  return;
});
