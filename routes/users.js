const router = require('express').Router();
const {
  getUserId, getUser, updateProfile, login, getUserMe, createUser,
} = require('../controllers/users');
// const {
//   updateProfileValid,
//   updateAvatarValid,
//   getUserIdValid,
// } = require('../middlewares/validator');

// router.get('/users', getUser);
router.get('/users/me', getUserMe);
// router.get('/users/:userId', getUserIdValid, getUserId);
router.patch('/users/me', updateProfileValid, updateProfile);
router.post('/signup', getUser); ////
router.post('/signin', createUser); /////
