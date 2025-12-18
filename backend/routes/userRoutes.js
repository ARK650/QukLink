const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getStats,
  getPublicProfile,
  getPaymentProviders,
  addPaymentProvider,
  updatePaymentProvider,
  removePaymentProvider,
} = require('../controllers/userController');
const { protect, requireProfileComplete } = require('../middleware/authMiddleware');

// Public routes
router.get('/profile/:username', getPublicProfile);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/stats', protect, requireProfileComplete, getStats);

// Payment providers
router.get('/payment-providers', protect, getPaymentProviders);
router.post('/payment-providers', protect, addPaymentProvider);
router.put('/payment-providers/:providerId', protect, updatePaymentProvider);
router.delete('/payment-providers/:providerId', protect, removePaymentProvider);

module.exports = router;
