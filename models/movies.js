const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Неправильный формат ссылки.',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Неправильный формат ссылки.',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Неправильный формат ссылки.',
    },
    required: true,
  },
  owner: { //  _id пользователя, который сохранил фильм
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);