class CambridgeError extends Error {
  constructor(status, name, message, messageDefault, logdetails) {
    super(message);
    this.message = message || messageDefault;
    this.status = status;
    this.name = name;
    this.logdetails = logdetails;
  }
}

class CambridgeScrapingError extends CambridgeError {
    constructor(message) {
      super(500, 'CambridgeScrapingError', message, 'Hubo problemas al consultar la palabra');
    }
  }

module.exports = {
  CambridgeError,
  CambridgeScrapingError
};
