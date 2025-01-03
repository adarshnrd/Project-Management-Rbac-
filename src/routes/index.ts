import { Router } from 'express';

import { signInRouter } from './signInPage';
import signUpRouter from './signUp';
import validateTextPageRouter from './validationTextPage';
import { otpVerifyRouter } from './verifyOtp';
import createPasswordRouter from './createPassword';
import { homePageRouter } from './homePage';

const router = Router();
router.use(signInRouter);
router.use(signUpRouter);
router.use(validateTextPageRouter);
router.use(otpVerifyRouter);
router.use(createPasswordRouter);
router.use(homePageRouter);

export default router;
