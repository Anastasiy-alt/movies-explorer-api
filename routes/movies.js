const router = require('express').Router();

const {
  getMovie, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValid, movieIdValid,
} = require('../middlewares/validator');

router.get('/movies', getMovie);
router.post('/movies', createMovieValid, createMovie);
router.delete('/movies/:movieId', movieIdValid, deleteMovie);

module.exports = router;
