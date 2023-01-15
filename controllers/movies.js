const Movie = require('../models/movies');
const ForbiddenError403 = require('../errors/ForbiddenError403');
const BadRequestError400 = require('../errors/BadRequestError400');
const NotFoundError404 = require('../errors/NotFoundError404');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError400(`Некорректные данные при создании фильма. ${err.message}`));
      }
      return next(err);
    });
};

module.exports.getMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError404('Нет фильма по заданному id.'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError403('Нельзя удалить фильм.'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удалён.' }));
    })
    .catch(next);
};

// module.exports.likeMovie = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.movieId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   )
//     .then((movie) => {
//       if (!movie) {
//         throw new NotFoundError404('Фильмы не найдены.');
//       }
//       res.send(movie);
//     })
//     .catch(next);
// };

// module.exports.dislikeMovie = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.movieId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true },
//   )
//     .then((movie) => {
//       if (!movie) {
//         throw new NotFoundError404('Фильмы не найдены.');
//       }
//       res.send(movie);
//     })
//     .catch(next);
// };
