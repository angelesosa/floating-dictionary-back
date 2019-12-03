const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect(`mongodb://${process.env.DB_MONGO_HOST}/${process.env.DB_MONGO_DATABASE}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', error => {
  console.log('error - mongoose', error);
  logger.error(error);
  logger.error('Fallo la conexion a mongodb');
  process.exit(1);
});

module.exports = mongoose;
