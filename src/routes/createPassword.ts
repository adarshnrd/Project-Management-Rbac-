import { Request, Response, Router } from 'express';

import { CreatePasswordController } from '#src/controller/createPasswordController';
import { userSignReqParams } from '#src/types/userSignIn';

export const createPasswordRouter = Router();

createPasswordRouter.post('/createPassword', (req: Request<object, object, userSignReqParams>, res: Response) => {
  new CreatePasswordController().saveUserPassword(req, res);
});

// createPasswordRouter.get('/createPassword', (req, res) => {
//   //TODO:- update code here.
//   return res.render('homeDefaultPage');
// });

export default createPasswordRouter;
