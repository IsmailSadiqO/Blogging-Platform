const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getUserProfile);

module.exports = router;