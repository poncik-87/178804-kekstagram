const {HTTP_STATUS_CODES} = require(`./consts`);

class NotFoundError extends Error {
  constructor(errorMessage) {
    super();
    this.code = HTTP_STATUS_CODES.NOT_FOUND_ERROR;
    this.message = errorMessage;
  }
}

class ValidationError extends Error {
  constructor(errorMessage) {
    super();
    this.code = HTTP_STATUS_CODES.VALIDATION_ERROR;
    this.message = errorMessage;
  }
}

module.exports = {
  name: `errors`,
  description: `ошибки приложения`,
  NotFoundError,
  ValidationError
};
