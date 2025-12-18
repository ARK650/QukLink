const express = require('express');
const router = express.Router();
const {
  getLinks,
  getLink,
  createLink,
  updateLink,
  deleteLink,
  toggleLinkStatus,
  getRecentLinks,
  handleRedirect,
} = require('../controllers/linkController');
const { protect, optionalAuth, requireProfileComplete } = require('../middleware/authMiddleware');

// Public redirect route (this is typically at root level: /:shortCode)
// But we also expose it here for reference
router.get('/r/:shortCode', optionalAuth, handleRedirect);

// Protected routes
router.get('/', protect, requireProfileComplete, getLinks);
router.get('/recent', protect, requireProfileComplete, getRecentLinks);
router.get('/:id', protect, requireProfileComplete, getLink);
router.post('/', protect, requireProfileComplete, createLink);
router.put('/:id', protect, requireProfileComplete, updateLink);
router.delete('/:id', protect, requireProfileComplete, deleteLink);
router.patch('/:id/toggle', protect, requireProfileComplete, toggleLinkStatus);

module.exports = router;
