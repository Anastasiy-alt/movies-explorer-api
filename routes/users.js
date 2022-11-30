const router = require('express').Router();
const {
  getUserId, getUser, updateProfile, login, getUserMe, createUser,
} = require('../controllers/users');
const {
  updateProfileValid,
  loginValid,
  createUserValid,
} = require('../middlewares/validator');

router.get('/users/me', getUserMe);
router.patch('/users/me', updateProfileValid, updateProfile);
router.post('/signup', ); //// app
router.post('/signin', ); ///// app
