const winston = require('winston');
const moment = require('moment');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      json: false,
      handleExceptions: false,
      maxSize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/info-${moment().format('YYYY-MM-DD')}.log`,
      prettyPrint: object => { return JSON.stringify(object) }
    }),
    new winston.transports.File({
      level: 'error',
      json: false,
      handleExceptions: false,
      maxSize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/error-${moment().format('YYYY-MM-DD')}.log`,
      prettyPrint: object => { return JSON.stringify(object) }
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      prettyPrint: object => { return JSON.stringify(object) }
    })
  ]
})

winston.exceptions.handle(
  new winston.transports.File({ 
    filename: `${__dirname}/../logs/exceptions-${moment().format('YYYY-MM-DD')}.log`,
  })
);

module.exports = logger;