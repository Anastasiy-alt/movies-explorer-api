const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError400');

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) { throw new BadRequestError('Неправильный формат URL адреса'); }
      return url;
    }),
    trailerLink: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) { throw new BadRequestError('Неправильный формат URL адреса'); }
      return url;
    }),
    thumbnail: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) { throw new BadRequestError('Неправильный формат URL адреса'); }
      return url;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const getUserIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const movieIdValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  loginValid,
  createUserValid,
  updateProfileValid,
  createMovieValid,
  getUserIdValid,
  movieIdValid,
};
