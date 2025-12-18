const Collection = require('../models/Collection');
const Link = require('../models/Link');
const { asyncHandler } = require('../middleware');

/**
 * @desc    Get all collections for current user
 * @route   GET /api/collections
 * @access  Private
 */
const getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ user: req.user._id })
    .sort('-createdAt')
    .populate('links', 'title shortCode thumbnail');

  res.json({
    success: true,
    data: collections,
  });
});

/**
 * @desc    Get single collection
 * @route   GET /api/collections/:id
 * @access  Private
 */
const getCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate('links');

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  res.json({
    success: true,
    data: collection,
  });
});

/**
 * @desc    Create collection
 * @route   POST /api/collections
 * @access  Private
 */
const createCollection = asyncHandler(async (req, res) => {
  const { name, description, thumbnail, color, icon, isPublic } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name is required',
    });
  }

  const collection = await Collection.create({
    user: req.user._id,
    name,
    description,
    thumbnail,
    color: color || '#6366f1',
    icon,
    isPublic: isPublic || false,
  });

  res.status(201).json({
    success: true,
    data: collection,
  });
});

/**
 * @desc    Update collection
 * @route   PUT /api/collections/:id
 * @access  Private
 */
const updateCollection = asyncHandler(async (req, res) => {
  let collection = await Collection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  const { name, description, thumbnail, color, icon, isPublic } = req.body;

  if (name !== undefined) collection.name = name;
  if (description !== undefined) collection.description = description;
  if (thumbnail !== undefined) collection.thumbnail = thumbnail;
  if (color !== undefined) collection.color = color;
  if (icon !== undefined) collection.icon = icon;
  if (isPublic !== undefined) collection.isPublic = isPublic;

  await collection.save();

  res.json({
    success: true,
    data: collection,
  });
});

/**
 * @desc    Delete collection
 * @route   DELETE /api/collections/:id
 * @access  Private
 */
const deleteCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  // Remove collection reference from links
  await Link.updateMany(
    { collection: req.params.id },
    { $unset: { collection: 1 } }
  );

  res.json({
    success: true,
    message: 'Collection deleted',
  });
});

/**
 * @desc    Add link to collection
 * @route   POST /api/collections/:id/links
 * @access  Private
 */
const addLinkToCollection = asyncHandler(async (req, res) => {
  const { linkId } = req.body;

  const collection = await Collection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  const link = await Link.findOne({
    _id: linkId,
    user: req.user._id,
  });

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  // Add link to collection if not already there
  if (!collection.links.includes(linkId)) {
    collection.links.push(linkId);
    await collection.save();
  }

  // Update link's collection reference
  link.collection = collection._id;
  await link.save();

  res.json({
    success: true,
    data: collection,
  });
});

/**
 * @desc    Remove link from collection
 * @route   DELETE /api/collections/:id/links/:linkId
 * @access  Private
 */
const removeLinkFromCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found',
    });
  }

  collection.links = collection.links.filter(
    (l) => l.toString() !== req.params.linkId
  );
  await collection.save();

  // Remove collection reference from link
  await Link.findByIdAndUpdate(req.params.linkId, {
    $unset: { collection: 1 },
  });

  res.json({
    success: true,
    data: collection,
  });
});

module.exports = {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  addLinkToCollection,
  removeLinkFromCollection,
};
