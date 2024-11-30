import { Router } from 'express';
import SignUp from '../controller/signUp';

export const signUpRouter = Router();

signUpRouter.get('/signUp', (req, res) => {
  return res.render('signUp');
});

signUpRouter.post('/signUp', (req, res) => {
  console.log(req.body);
  new SignUp().processSignUpData();
  return;
});
export default signUpRouter;
