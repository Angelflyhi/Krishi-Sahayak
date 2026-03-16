const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/krishi-sahayak',
  jwtSecret: process.env.JWT_SECRET || 'krishi-sahayak-dev-secret',
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
};
