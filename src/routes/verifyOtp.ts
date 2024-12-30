import { Request, Response } from 'express';

import { VerifyOtpController } from '#src/controller/verifyOtpController';
import { Router } from 'express';
import { VerifyOtpRequestParams } from '#src/types/verifyOtp';

export const otpVerifyRouter = Router();

otpVerifyRouter.post('/verify-otp', (req: Request<VerifyOtpRequestParams>, res: Response) => {
  new VerifyOtpController().verifyOtp(req, res);
});
