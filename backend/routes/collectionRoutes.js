const express = require('express');
const router = express.Router();
const {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  addLinkToCollection,
  removeLinkFromCollection,
} = require('../controllers/collectionController');
const { protect, requireProfileComplete } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);
router.use(requireProfileComplete);

router.get('/', getCollections);
router.get('/:id', getCollection);
router.post('/', createCollection);
router.put('/:id', updateCollection);
router.delete('/:id', deleteCollection);

// Collection link management
router.post('/:id/links', addLinkToCollection);
router.delete('/:id/links/:linkId', removeLinkFromCollection);

module.exports = router;
