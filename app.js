require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError404 = require('./errors/NotFoundError404');
const cors = require('./middlewares/cors');
const {
  login,
  createUser,
  checkCookie,
  logout,
} = require('./controllers/users');
const { loginValid, createUserValid } = require('./middlewares/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);
app.get('/checkCookie', checkCookie);
app.get('/signout', logout);

app.use(auth);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use('*', (req, res, next) => {
  next(new NotFoundError404('Страница не найдена.'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(error);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});