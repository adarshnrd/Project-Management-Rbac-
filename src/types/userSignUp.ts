export type UserSignUpRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  companyName?: string;
  phone?: string;
  countryCode?: string;
};
