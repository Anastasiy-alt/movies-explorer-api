const express = require('express');
require('dotenv').config();
// const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const limiter = require('./utils/rateLimit');

const app = express();
const {
  PORT, DATABASE_URL, MONGO_URL, NODE_ENV,
} = require('./utils/constants');

app.listen(PORT);
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);
app.use(router); // подключаем роуты
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(error);

// app.use(helmet());
// app.use('/', require('./routes/users'));
// app.use('/', require('./routes/movies'));
