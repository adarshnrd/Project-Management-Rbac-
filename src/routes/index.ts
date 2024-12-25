import { Router } from 'express';

import { signInRouter } from './signInPage';
import signUpRouter from './signUp';
import validateTextPageRouter from './validationTextPage';

const router = Router();
router.use(signInRouter);
router.use(signUpRouter);
router.use(validateTextPageRouter);

export default router;
