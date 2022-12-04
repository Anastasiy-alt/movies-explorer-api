const router = require('express').Router();
const NotFoundError404 = require('../errors/NotFoundError404');
const { loginValid, createUserValid } = require('../middlewares/validator');
const {
  login,
  createUser,
  checkCookie,
  logout,
} = require('../controllers/users');

router.post('/signin', loginValid, login);
router.post('/signup', createUserValid, createUser);
router.get('/checkCookie', checkCookie);
router.get('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError404('Страница не найдена.'));
});

module.exports = router;
