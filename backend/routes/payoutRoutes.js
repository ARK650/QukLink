const express = require('express');
const router = express.Router();
const {
  getPayouts,
  getPayout,
  requestPayout,
  cancelPayout,
  getPayoutStats,
  getTransactions,
} = require('../controllers/payoutController');
const { protect, requireProfileComplete } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);
router.use(requireProfileComplete);

router.get('/', getPayouts);
router.post('/', requestPayout);
router.get('/stats', getPayoutStats);
router.get('/transactions', getTransactions);
router.get('/:id', getPayout);
router.put('/:id/cancel', cancelPayout);

module.exports = router;
