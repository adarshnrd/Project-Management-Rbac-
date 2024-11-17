import {Router} from 'express';

import { signInRouter } from './signInPage';

const router = Router();
router.use(signInRouter);

export default router;