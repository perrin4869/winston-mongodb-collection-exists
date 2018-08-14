const mongoose = require('mongoose');
const { createLogger, transports } = require('winston');

require('winston-mongodb');

const getConnectedDb = () => new Promise(resolve =>
  mongoose.connection.once('open', () => resolve(mongoose.connection.client))
);

const logger1 = createLogger({
  transports: [
    new transports.MongoDB({
      db: getConnectedDb(),
      collection: 'logs',
    }),
  ],
});

const logger2 = createLogger({
  transports: [
    new transports.MongoDB({
      db: getConnectedDb(),
      collection: 'logs',
    }),
  ],
});

process.on('unhandledRejection', (reason, e) => console.log(e));

mongoose.connect('mongodb://localhost/testdb');
