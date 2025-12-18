const Link = require('../models/Link');
const Click = require('../models/Click');
const User = require('../models/User');
const { asyncHandler } = require('../middleware');
const { paginationResponse } = require('../utils/helpers');
const { nanoid } = require('nanoid');

/**
 * @desc    Get all links for current user
 * @route   GET /api/links
 * @access  Private
 */
const getLinks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, collection, status, search, sort = '-createdAt' } = req.query;

  const query = { user: req.user._id };

  if (collection) query.collection = collection;
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { url: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Link.countDocuments(query);
  const links = await Link.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('collection', 'name color');

  res.json({
    success: true,
    data: links,
    pagination: paginationResponse(total, page, limit),
  });
});

/**
 * @desc    Get recent links
 * @route   GET /api/links/recent
 * @access  Private
 */
const getRecentLinks = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const links = await Link.find({ user: req.user._id })
    .sort('-createdAt')
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: links,
  });
});

/**
 * @desc    Get single link
 * @route   GET /api/links/:id
 * @access  Private
 */
const getLink = asyncHandler(async (req, res) => {
  const link = await Link.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate('collection', 'name color');

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  res.json({
    success: true,
    data: link,
  });
});

/**
 * @desc    Create new link
 * @route   POST /api/links
 * @access  Private
 */
const createLink = asyncHandler(async (req, res) => {
  const {
    title,
    url,
    originalUrl,
    description,
    thumbnail,
    collection,
    tags,
    status,
    scheduling,
    scheduledDate,
    limitedAccess,
    isSubscriberOnly,
    adsEnabled,
  } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      success: false,
      message: 'Title and URL are required',
    });
  }

  // Generate unique short code
  let shortCode = nanoid(8);
  let attempts = 0;
  while (await Link.findOne({ shortCode }) && attempts < 5) {
    shortCode = nanoid(8);
    attempts++;
  }

  const link = await Link.create({
    user: req.user._id,
    title,
    url,
    originalUrl: originalUrl || url,
    shortCode,
    description,
    thumbnail,
    collection,
    tags,
    status: status || 'active',
    scheduling,
    scheduledDate,
    limitedAccess,
    isSubscriberOnly: isSubscriberOnly || false,
    adsEnabled: adsEnabled || false,
  });

  // Update user's link count
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { 'stats.linkCount': 1 },
  });

  res.status(201).json({
    success: true,
    data: link,
  });
});

/**
 * @desc    Update link
 * @route   PUT /api/links/:id
 * @access  Private
 */
const updateLink = asyncHandler(async (req, res) => {
  let link = await Link.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  const allowedUpdates = [
    'title',
    'url',
    'originalUrl',
    'description',
    'thumbnail',
    'collection',
    'tags',
    'status',
    'isActive',
    'scheduling',
    'scheduledDate',
    'limitedAccess',
    'isSubscriberOnly',
    'adsEnabled',
  ];

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      link[field] = req.body[field];
    }
  });

  await link.save();

  res.json({
    success: true,
    data: link,
  });
});

/**
 * @desc    Delete link
 * @route   DELETE /api/links/:id
 * @access  Private
 */
const deleteLink = asyncHandler(async (req, res) => {
  const link = await Link.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  // Update user's link count
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { 'stats.linkCount': -1 },
  });

  // Delete associated clicks
  await Click.deleteMany({ link: req.params.id });

  res.json({
    success: true,
    message: 'Link deleted',
  });
});

/**
 * @desc    Toggle link status
 * @route   PATCH /api/links/:id/toggle
 * @access  Private
 */
const toggleLink = asyncHandler(async (req, res) => {
  const link = await Link.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  link.isActive = !link.isActive;
  link.status = link.isActive ? 'active' : 'inactive';
  await link.save();

  res.json({
    success: true,
    data: link,
  });
});

/**
 * @desc    Access public link and track click
 * @route   GET /api/links/public/:shortCode
 * @access  Public
 */
const accessPublicLink = asyncHandler(async (req, res) => {
  const link = await Link.findOne({ shortCode: req.params.shortCode });

  if (!link) {
    return res.status(404).json({
      success: false,
      message: 'Link not found',
    });
  }

  if (!link.isActive || link.status !== 'active') {
    return res.status(404).json({
      success: false,
      message: 'Link is not available',
    });
  }

  // Check limited access
  if (link.limitedAccess?.enabled && link.limitedAccess?.maxClicks) {
    if (link.clicks >= link.limitedAccess.maxClicks) {
      return res.status(410).json({
        success: false,
        message: 'Link has reached maximum clicks',
      });
    }
  }

  // Track click
  const userAgent = req.headers['user-agent'];
  const device = Click.detectDevice(userAgent);

  await Click.create({
    link: link._id,
    user: req.user?._id || null,
    ip: req.ip || req.connection?.remoteAddress,
    userAgent,
    device,
    referrer: req.headers.referer || req.headers.referrer,
    timestamp: new Date(),
  });

  // Increment counters
  link.clicks += 1;
  link.views += 1;
  await link.save();

  // Update user stats
  await User.findByIdAndUpdate(link.user, {
    $inc: {
      'stats.totalClicks': 1,
      'stats.totalViews': 1,
    },
  });

  res.json({
    success: true,
    data: {
      url: link.url,
      title: link.title,
    },
  });
});

module.exports = {
  getLinks,
  getRecentLinks,
  getLink,
  createLink,
  updateLink,
  deleteLink,
  toggleLink,
  accessPublicLink,
};
