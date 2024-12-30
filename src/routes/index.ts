import { Router } from 'express';

import { signInRouter } from './signInPage';
import signUpRouter from './signUp';
import validateTextPageRouter from './validationTextPage';
import { otpVerifyRouter } from './verifyOtp';

const router = Router();
router.use(signInRouter);
router.use(signUpRouter);
router.use(validateTextPageRouter);
router.use(otpVerifyRouter);

export default router;
