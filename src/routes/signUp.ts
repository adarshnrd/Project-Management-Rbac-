import { Router, Request, Response } from 'express';
import SignUp from '../controller/signUp';
import PmContext from '../helper/pmContext';

export const signUpRouter = Router();

signUpRouter.get('/signUp', (req, res) => {
  return res.render('signUp');
});

signUpRouter.post('/signUp', (req: Request, res: Response) => {
  const pmContext = new PmContext();
  new SignUp(pmContext).processSignUpData(req, res);
  return;
});
export default signUpRouter;
