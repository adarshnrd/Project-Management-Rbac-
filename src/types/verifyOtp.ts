export type VerifyOtpRequestParams = {
  otp: string;
  email: string;
};

export type OtpValidateOptions = {
  otp: number;
  expiryTimeInMins: number;
  userAttemptedOtpCount: number;
};

export type ResendRequestParams = {
  path: string;
  email: string;
};
