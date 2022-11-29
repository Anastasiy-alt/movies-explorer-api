/* eslint-disable consistent-return */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

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
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((url) => {
      if (!validator.isURL(url)) { throw new BadRequestError('Неправильный формат URL адреса'); }
      return url;
    }),
  }),
});

const updateAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((url) => {
      if (!validator.isURL(url)) { throw new BadRequestError('Неправильный формат URL адреса'); }
      return url;
    }),
  }),
});

const updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) { throw new BadRequestError('Неправильный формат URL адреса'); }
      return url;
    }),
  }),
});

const getUserIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const cardIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  loginValid,
  createUserValid,
  updateProfileValid,
  updateAvatarValid,
  createCardValid,
  getUserIdValid,
  cardIdValid,
};
