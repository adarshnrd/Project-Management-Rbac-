import { Request, Response } from 'express';

import { VerifyOtpController } from '#src/controller/verifyOtpController';
import { Router } from 'express';
import { ResendRequestParams, VerifyOtpRequestParams } from '#src/types/verifyOtp';

export const otpVerifyRouter = Router();

otpVerifyRouter.post('/verify-otp', (req: Request<VerifyOtpRequestParams>, res: Response) => {
  new VerifyOtpController().verifyOtp(req, res);
});

otpVerifyRouter.get('/verify-otp', (req: Request, res: Response) => {
  const reqQuery = req.query;
  return res.render('otpValidationTextPage', { userEmail: reqQuery.email });
});

otpVerifyRouter.post('/resend-otp', (req: Request<object, object, ResendRequestParams>, res: Response) => {
  new VerifyOtpController().resendOtp(req, res);
});
