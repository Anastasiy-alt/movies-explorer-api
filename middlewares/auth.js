const jwt = require('jsonwebtoken');
const UnauthorizedError401 = require('../errors/UnauthorizedError401');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError401('Необходима авторизация.'));
};

const auth = (req, res, next) => {
  const { token } = req.cookies.jwt;
  if (!token) {
    return handleAuthError(next);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return (next()); // пропускаем запрос дальше
};

module.exports = auth;
