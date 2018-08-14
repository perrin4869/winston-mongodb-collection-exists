const mongoose = require('mongoose');
const { createLogger, transports } = require('winston');

require('winston-mongodb');

const connectedDb = new Promise(resolve =>
  mongoose.connection.once('open', () => resolve(mongoose.connection.client))
);
const getConnectedDb = () => connectedDb;

for (let i = 0; i < 10; i++) {
  createLogger({
    transports: [
      new transports.MongoDB({
        db: getConnectedDb(),
        collection: 'logs',
      }),
    ],
  });
}

process.on('unhandledRejection', (reason, e) => console.log(e));

mongoose.connect('mongodb://localhost/testdb');
