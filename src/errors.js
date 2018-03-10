class NotFoundError extends Error {
  constructor(errorMessage) {
    super();
    this.code = 404;
    this.message = errorMessage;
  }
}

class ValidationError extends Error {
  constructor(errorMessage) {
    super();
    this.code = 400;
    this.message = errorMessage;
  }
}

module.exports = {
  name: `errors`,
  description: `ошибки приложения`,
  NotFoundError,
  ValidationError
};
