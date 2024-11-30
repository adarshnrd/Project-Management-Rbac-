import { Router } from 'express';

import { signInRouter } from './signInPage';
import signUpRouter from './signUp';

const router = Router();
router.use(signInRouter);
router.use(signUpRouter);

export default router;
