const Bookmark = require('../models/Bookmark');
const BookmarkCollection = require('../models/BookmarkCollection');
const Link = require('../models/Link');
const { asyncHandler } = require('../middleware');

/**
 * @desc    Get all bookmarks
 * @route   GET /api/bookmarks
 * @access  Private
 */
const getBookmarks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, collectionId } = req.query;

  const query = { user: req.user._id };
  if (collectionId) {
    query.collection = collectionId;
  }

  const bookmarks = await Bookmark.find(query)
    .populate({
      path: 'link',
      select: 'title url shortCode thumbnail views clicks',
      populate: {
        path: 'user',
        select: 'name username avatar',
      },
    })
    .populate('collection', 'name color')
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Bookmark.countDocuments(query);

  res.json({
    success: true,
    data: {
      bookmarks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

/**
 * @desc    Add bookmark
 * @route   POST /api/bookmarks
 * @access  Private
 */
const addBookmark = asyncHandler(async (req, res) => {
  const { linkId, collectionId, notes } = req.body;

  // Check if link exists
  const link = await Link.findById(linkId);
  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  // Check if already bookmarked
  const existingBookmark = await Bookmark.findOne({
    user: req.user._id,
    link: linkId,
  });

  if (existingBookmark) {
    return res.status(400).json({
      success: false,
      message: 'Link already bookmarked',
    });
  }

  // Validate collection if provided
  if (collectionId) {
    const collection = await BookmarkCollection.findOne({
      _id: collectionId,
      user: req.user._id,
    });
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }
  }

  const bookmark = await Bookmark.create({
    user: req.user._id,
    link: linkId,
    collection: collectionId,
    notes,
  });

  await bookmark.populate({
    path: 'link',
    select: 'title url shortCode thumbnail',
    populate: {
      path: 'user',
      select: 'name username avatar',
    },
  });

  res.status(201).json({
    success: true,
    data: bookmark,
  });
});

/**
 * @desc    Remove bookmark
 * @route   DELETE /api/bookmarks/:id
 * @access  Private
 */
const removeBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found',
    });
  }

  res.json({
    success: true,
    message: 'Bookmark removed',
  });
});

/**
 * @desc    Remove bookmark by link ID
 * @route   DELETE /api/bookmarks/link/:linkId
 * @access  Private
 */
const removeBookmarkByLink = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOneAndDelete({
    link: req.params.linkId,
    user: req.user._id,
  });

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found',
    });
  }

  res.json({
    success: true,
    message: 'Bookmark removed',
  });
});

/**
 * @desc    Update bookmark (move to collection, add notes)
 * @route   PUT /api/bookmarks/:id
 * @access  Private
 */
const updateBookmark = asyncHandler(async (req, res) => {
  const { collectionId, notes } = req.body;

  const bookmark = await Bookmark.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found',
    });
  }

  // Validate collection if changing
  if (collectionId !== undefined) {
    if (collectionId) {
      const collection = await BookmarkCollection.findOne({
        _id: collectionId,
        user: req.user._id,
      });
      if (!collection) {
        return res.status(404).json({
          success: false,
          message: 'Collection not found',
        });
      }
    }
    bookmark.collection = collectionId || null;
  }

  if (notes !== undefined) {
    bookmark.notes = notes;
  }

  await bookmark.save();
  await bookmark.populate('link collection');

  res.json({
    success: true,
    data: bookmark,
  });
});

/**
 * @desc    Check if link is bookmarked
 * @route   GET /api/bookmarks/check/:linkId
 * @access  Private
 */
const checkBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOne({
    user: req.user._id,
    link: req.params.linkId,
  });

  res.json({
    success: true,
    data: {
      isBookmarked: !!bookmark,
      bookmark,
    },
  });
});

// ==================== BOOKMARK COLLECTIONS ====================

/**
 * @desc    Get all bookmark collections
 * @route   GET /api/bookmarks/collections
 * @access  Private
 */
const getBookmarkCollections = asyncHandler(async (req, res) => {
  const collections = await BookmarkCollection.find({ user: req.user._id }).sort(
    '-createdAt'
  );

  // Get bookmark counts for each collection
  const collectionsWithCounts = await Promise.all(
    collections.map(async (collection) => {
      const count = await Bookmark.countDocuments({
        user: req.user._id,
        collection: collection._id,
      });
      return {
        ...collection.toObject(),
        bookmarkCount: count,
      };
    })
  );

  res.json({
    success: true,
    data: collectionsWithCounts,
  });
});

/**
 * @desc    Create bookmark collection
 * @route   POST /api/bookmarks/collections
 * @access  Private
 */
const createBookmarkCollection = asyncHandler(async (req, res) => {
  const { name, description, color, icon } = req.body;

  const collection = await BookmarkCollection.create({
    user: req.user._id,
    name,
    description,
    color: color || '#7c3aed',
    icon,
  });

  res.status(201).json({
    success: true,
    data: collection,
  });
});

/**
 * @desc    Update bookmark collection
 * @route   PUT /api/bookmarks/collections/:id
 * @access  Private
 */
const updateBookmarkCollection = asyncHandler(async (req, res) => {
  const collection = await BookmarkCollection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  const { name, description, color, icon } = req.body;

  if (name) collection.name = name;
  if (description !== undefined) collection.description = description;
  if (color) collection.color = color;
  if (icon !== undefined) collection.icon = icon;

  await collection.save();

  res.json({
    success: true,
    data: collection,
  });
});

/**
 * @desc    Delete bookmark collection
 * @route   DELETE /api/bookmarks/collections/:id
 * @access  Private
 */
const deleteBookmarkCollection = asyncHandler(async (req, res) => {
  const collection = await BookmarkCollection.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  // Remove collection reference from bookmarks (don't delete bookmarks)
  await Bookmark.updateMany(
    { collection: req.params.id },
    { $unset: { collection: 1 } }
  );

  res.json({
    success: true,
    message: 'Collection deleted',
  });
});

module.exports = {
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
};
