const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/authController');
const User = require('../models/User');
const resultCustomizationMiddleware = require('../middleware/resultCutomizationMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logout);

router.get('/me', protect, getUserProfile);

router.put('/updatedetails', protect, updateUserProfile);

router.use(protect);
router.use(admin);

router
  .route('/users')
  .get(resultCustomizationMiddleware(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
