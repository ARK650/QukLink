const express = require('express');
const router = express.Router();
const {
  getInsights,
  getTopLinks,
  getChartData,
  getDeviceAnalytics,
  getLinkAnalytics,
} = require('../controllers/analyticsController');
const { protect, requireProfileComplete } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);
router.use(requireProfileComplete);

router.get('/insights', getInsights);
router.get('/top-links', getTopLinks);
router.get('/chart', getChartData);
router.get('/devices', getDeviceAnalytics);
router.get('/links/:id', getLinkAnalytics);

module.exports = router;
