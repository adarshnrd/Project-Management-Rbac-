import { UserSignUpRequest } from '#src/types/userSignUp';

export class UserSignUpDto {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  countryCode: string;
  constructor(userSignUpRequest: UserSignUpRequest) {
    this.firstName = userSignUpRequest.firstName?.trim();
    this.lastName = userSignUpRequest.lastName?.trim() ?? '';
    this.email = userSignUpRequest.email?.trim().toLocaleLowerCase();
    this.companyName = userSignUpRequest.companyName?.trim() ?? '';
    if (userSignUpRequest.phone) {
      this.phone = userSignUpRequest.phone?.trim() ?? '';
      this.countryCode = userSignUpRequest.countryCode ?? '';
    }
  }
}
