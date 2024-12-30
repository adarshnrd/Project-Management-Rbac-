import { OTP_GENERATE_NUMBER } from '#src/constant';
import { GenerateOtpResponse } from '#src/types/brevoEmail';

export function generateOTP(otpExpireMins: number): GenerateOtpResponse {
  const otpResponse = {} as GenerateOtpResponse;
  otpResponse.otp = '';
  const digits = OTP_GENERATE_NUMBER;
  for (let i = 0; i < 6; i++) {
    otpResponse.otp += digits[Math.floor(Math.random() * 10)];
  }
  const addExpireMins = otpExpireMins * 60 * 1000;
  otpResponse.otpExpireTime = new Date().getTime() + addExpireMins;
  return otpResponse;
}
