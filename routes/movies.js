const router = require('express').Router();

const {
  getMovie, createMovie,
} = require('../controllers/movies');

const {
  createMovieValid,
} = require('../middlewares/validator');

router.get('/movies', getMovie);
router.post('/movies', createMovieValid, createMovie);
// router.delete('/movies/:movieId', movieIdValid, deleteMovie);

module.exports = router;
