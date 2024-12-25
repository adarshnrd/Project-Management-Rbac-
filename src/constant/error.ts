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

// You can add more error codes as needed
module.exports = ERROR_CODES_MESSAGE;
