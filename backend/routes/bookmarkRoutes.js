const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
  removeBookmarkByLink,
  updateBookmark,
  checkBookmark,
  getBookmarkCollections,
  createBookmarkCollection,
  updateBookmarkCollection,
  deleteBookmarkCollection,
} = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Bookmarks
router.get('/', getBookmarks);
router.post('/', addBookmark);
router.get('/check/:linkId', checkBookmark);
router.put('/:id', updateBookmark);
router.delete('/:id', removeBookmark);
router.delete('/link/:linkId', removeBookmarkByLink);

// Bookmark Collections
router.get('/collections', getBookmarkCollections);
router.post('/collections', createBookmarkCollection);
router.put('/collections/:id', updateBookmarkCollection);
router.delete('/collections/:id', deleteBookmarkCollection);

module.exports = router;
