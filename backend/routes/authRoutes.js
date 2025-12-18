const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  googleAuth,
  googleCallback,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Local auth
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

module.exports = router;
