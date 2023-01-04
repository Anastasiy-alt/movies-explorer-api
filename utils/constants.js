const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;
const DATABASE_URL = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  PORT, MONGO_URL, DATABASE_URL, NODE_ENV,
};
