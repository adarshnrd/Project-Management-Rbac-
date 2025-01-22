export const ERROR_CODES_MESSAGE = {
  400: 'Bad Request',
  401: 'Unauthorized: The client must authenticate itself to get the requested response.',
  403: 'Forbidden: The client does not have access rights to the content.',
  404: 'Not Found: The server can not find the requested resource.',
  405: 'Method Not Allowed: The method specified in the request is not allowed for the resource.',
  500: 'Internal Server Error',
  502: 'Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response.',
  503: 'Service Unavailable: The server is not ready to handle the request.',
  504: 'Gateway Timeout: The server, while acting as a gateway or proxy, did not get a response in time.',
  422: 'Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors.',
};

export const ERROR_MESSAGE_FOR_DUPLICATE_EMAIL_ENTRY =
  'The email address already exists. You can either create an account using a new email or reset the password for the existing email.';
export const OTP_MAX_ATTEMPTED_ERROR_MESSAGE =
  'You have exceeded the maximum number of OTP attempts. Please verify your identity again.';
export const SOMETHING_WENT_WRONG = 'Something went wrong. Please try again later.';
export const PASSWORD_NOT_SAVED_ERROR =
  'An error occurred, and the password could not be saved. Please try again later.';
export const USER_NOT_FOUND_WITH_EMAIL = `We couldn't find a user associated with this email. Please contact us or create a new account.`;
export const ENTERED_WRONG_USER_PASSWORD = (count: number) =>
  count < 3
    ? `Incorrect password. Please try again.`
    : `The password you entered is incorrect. Please check your password and try again. If you've forgotten your password, click on 'Forgot Password' to reset it.`;
export const UNABLE_TO_FIND_USER_ACCOUNT = `We couldn't find an account associated with this email. Please create a new account or contact the administrator for assistance.`;
