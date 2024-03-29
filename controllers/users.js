const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ConflictError409 = require('../errors/ConflictError409');
const BadRequestError400 = require('../errors/BadRequestError400');
const NotFoundError404 = require('../errors/NotFoundError404');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports.getUser = (req, res, next) => {
//   User.find({})
//     .then((user) => res.status(200).send(user))
//     .catch(next);
// };

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then(() => res.send({
      name, email, password,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError409('Пользователь с данным email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError400('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError404('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError409('Пользователь с данным email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError400('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token, user });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt', 'token', { httpOnly: true, sameSite: 'none', secure: true })
    .send({ message: 'Токен успешно удален из cookies' });
};

module.exports.getUserMe = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError404('Нет пользователя с таким id.');
      }
      res.send(user);
    })
    .catch(next);
};

// module.exports.checkCookie = (req, res) => {
//   if (!req.cookies.token) {
//     return res.send('false');
//   }
//   return res.send('true');
// };
