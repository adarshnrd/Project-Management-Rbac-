import { Router } from 'express';

export const validateTextPageRouter = Router();

validateTextPageRouter.get('/verify-email', (req, res) => {
  return res.render('validationTextPage');
});

export default validateTextPageRouter;
