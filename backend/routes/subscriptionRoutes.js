const express = require('express');
const router = express.Router();
const {
  getSubscriptions,
  getSubscribers,
  subscribe,
  cancelSubscription,
  checkSubscription,
  getSubscriptionStats,
  getSubscription,
} = require('../controllers/subscriptionController');
const { protect, requireProfileComplete } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);
router.use(requireProfileComplete);

// User's subscriptions (as subscriber)
router.get('/', getSubscriptions);
router.post('/', subscribe);

// User's subscribers (as creator)
router.get('/subscribers', getSubscribers);
router.get('/stats', getSubscriptionStats);

// Subscription management
router.get('/check/:creatorId', checkSubscription);
router.get('/:id', getSubscription);
router.put('/:id/cancel', cancelSubscription);

module.exports = router;
