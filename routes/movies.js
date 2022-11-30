const router = require('express').Router();

const {
  getMovie, deleteMovie, createMovie, likeMovie, dislikeMovie,
} = require('../controllers/movies');

const {
  movieIdValid, createMovieValid,
} = require('../middlewares/validator');

router.get('/movies', getMovie);
router.post('/movies', createMovieValid, createMovie);
// router.delete('/movies/:movieId', movieIdValid, deleteMovie);


module.exports = router;