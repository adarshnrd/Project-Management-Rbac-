require('dotenv').config();
let appDataSource;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  appDataSource = require('./lib/src/config').AppDataSource;
} else {
  appDataSource = require('./src/config.ts').AppDataSource;
}
module.exports = appDataSource;
