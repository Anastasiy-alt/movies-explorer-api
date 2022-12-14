const router = require('express').Router();
const NotFoundError404 = require('../errors/NotFoundError404');
const { loginValid, createUserValid } = require('../middlewares/validator');
const {
  login,
  createUser,
  checkCookie,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', loginValid, login);
router.post('/signup', createUserValid, createUser);
router.get('/checkCookie', checkCookie);

router.use(auth);

router.use('/', require('./users'));
router.use('/', require('./movies'));

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('*', (req, res, next) => {
  next(new NotFoundError404('Страница не найдена.'));
});

module.exports = router;
