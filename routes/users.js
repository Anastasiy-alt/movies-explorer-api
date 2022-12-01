const router = require('express').Router();
const {
  updateProfile, getUserMe,
} = require('../controllers/users');
const {
  updateProfileValid,
} = require('../middlewares/validator');

router.get('/users/me', getUserMe);
router.patch('/users/me', updateProfileValid, updateProfile);
// router.post('/signup', ); //// app
// router.post('/signin', ); ///// app
module.exports = router;
