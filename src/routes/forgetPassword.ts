import { FindAccount } from '#src/controller/findAccount';
import { Router, Request, Response } from 'express';

export const forgotPasswordRouter = Router();

forgotPasswordRouter.get('/forgotPassword', (req: Request, res: Response) => {
  return res.render('forgotPassword');
});

forgotPasswordRouter.post('/findAccount', (req: Request, res: Response) => {
  return new FindAccount().findAccountAndProcessOtp(req, res);
});

forgotPasswordRouter.get('/cancel', (req: Request, res: Response) => {
  return res.render('homeDefaultPage');
});
