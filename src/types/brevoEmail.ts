export type BrevoEmailSendType = {
  sender: SenderType;
  to: SenderType[];
  subject: string;
  htmlContent: string;
};

export type SenderType = {
  name: string;
  email: string;
};

export type GenerateOtpResponse = {
  otp: string;
  otpExpireTime: number;
};
