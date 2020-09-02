'use strict'

const winston = require('winston');

const logger = winston.createLogger({
    // eslint-disable-next-line no-undef
    level: process.env.NODE_LOGGING_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    transports: [new winston.transports.Console()]
});

module.exports = logger;
