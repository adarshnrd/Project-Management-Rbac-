export const PROJECT_ROUTES = {
  REVERIFICATION_PAGE: 'api/verificationPage',
};

export const DOMAIN_URL = process.env.DOMAIN_URL ?? 'http://localhost';
export const OTP_GENERATE_NUMBER = '0123456789';
export const SENDER_EMAIL = process.env.BREVO_API_SENDER_EMAIL ?? 'adarshvcp@gmail.com';
export const DEFAULT_EMAIL_USER_NAME = process.env.BREVO_DEFAULT_USER_NAME ?? 'Adarsh';
export const OTP_EMAIL_SUBJECT = (otp: string) => `Your OTP Code: ${otp} – Verify Your Email`;

export const BREVO_BASE_URL = process.env.BREVO_BASE_URL ?? 'https://api.brevo.com/v3';

export const OTP_CACHE_KEY = (email: string) => `userOtp${email}`;
