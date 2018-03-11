const {HTTP_STATUS_CODES} = require(`./consts`);

class NotFoundError extends Error {
  constructor(errorMessage) {
    super();
    this.code = HTTP_STATUS_CODES.NOT_FOUND_ERROR;
    this.errorType = `Not Found Error`;
    this.message = errorMessage;
  }
}

class ValidationError extends Error {
  constructor(errorMessage) {
    super();
    this.code = HTTP_STATUS_CODES.VALIDATION_ERROR;
    this.errorType = `Validation Error`;
    this.message = errorMessage;
  }
}

class WrongMethodError extends Error {
  constructor() {
    super();
    this.code = HTTP_STATUS_CODES.WRONG_METHOD;
    this.errorType = `Wrong Method Error`;
    this.message = `Wrong Method Error`;
  }
}

module.exports = {
  name: `errors`,
  description: `ошибки приложения`,
  NotFoundError,
  ValidationError,
  WrongMethodError
};
