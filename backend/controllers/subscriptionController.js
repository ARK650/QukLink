const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { asyncHandler } = require('../middleware');
const { createNotification } = require('./notificationController');

/**
 * @desc    Get user's subscriptions (as subscriber)
 * @route   GET /api/subscriptions
 * @access  Private
 */
const getSubscriptions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { subscriber: req.user._id };
  if (status) {
    query.status = status;
  }

  const subscriptions = await Subscription.find(query)
    .populate('creator', 'name username avatar bio')
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Subscription.countDocuments(query);

  res.json({
    success: true,
    data: {
      subscriptions,
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
 * @desc    Get user's subscribers (as creator)
 * @route   GET /api/subscriptions/subscribers
 * @access  Private
 */
const getSubscribers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { creator: req.user._id };
  if (status) {
    query.status = status;
  }

  const subscriptions = await Subscription.find(query)
    .populate('subscriber', 'name username email avatar')
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Subscription.countDocuments(query);

  res.json({
    success: true,
    data: {
      subscribers: subscriptions,
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
 * @desc    Subscribe to a creator
 * @route   POST /api/subscriptions
 * @access  Private
 */
const subscribe = asyncHandler(async (req, res) => {
  const { creatorId, plan = 'monthly' } = req.body;

  // Check if creator exists
  const creator = await User.findById(creatorId);
  if (!creator) {
    return res.status(404).json({
      success: false,
      message: 'Creator not found',
    });
  }

  // Check if already subscribed
  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    creator: creatorId,
    status: 'active',
  });

  if (existingSubscription) {
    return res.status(400).json({
      success: false,
      message: 'Already subscribed to this creator',
    });
  }

  // Calculate billing dates based on plan
  const startDate = new Date();
  const endDate = new Date();
  if (plan === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (plan === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const subscription = await Subscription.create({
    subscriber: req.user._id,
    creator: creatorId,
    plan,
    status: 'active',
    startDate,
    currentPeriodEnd: endDate,
    nextBillingDate: endDate,
  });

  // Notify creator
  await createNotification({
    user: creatorId,
    type: 'subscriber',
    title: 'New Subscriber',
    message: `${req.user.name} subscribed to your content`,
    actionUrl: '/subscriptions/subscribers',
  });

  await subscription.populate('creator', 'name username avatar');

  res.status(201).json({
    success: true,
    data: subscription,
  });
});

/**
 * @desc    Cancel subscription
 * @route   PUT /api/subscriptions/:id/cancel
 * @access  Private
 */
const cancelSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({
    _id: req.params.id,
    subscriber: req.user._id,
  });

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found',
    });
  }

  subscription.status = 'cancelled';
  subscription.cancelledAt = new Date();
  await subscription.save();

  // Notify creator
  await createNotification({
    user: subscription.creator,
    type: 'subscriber',
    title: 'Subscription Cancelled',
    message: `${req.user.name} cancelled their subscription`,
    actionUrl: '/subscriptions/subscribers',
  });

  res.json({
    success: true,
    data: subscription,
  });
});

/**
 * @desc    Check subscription status with a creator
 * @route   GET /api/subscriptions/check/:creatorId
 * @access  Private
 */
const checkSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({
    subscriber: req.user._id,
    creator: req.params.creatorId,
    status: 'active',
  });

  res.json({
    success: true,
    data: {
      isSubscribed: !!subscription,
      subscription,
    },
  });
});

/**
 * @desc    Get subscription stats (for creator)
 * @route   GET /api/subscriptions/stats
 * @access  Private
 */
const getSubscriptionStats = asyncHandler(async (req, res) => {
  const totalSubscribers = await Subscription.countDocuments({
    creator: req.user._id,
    status: 'active',
  });

  const monthlySubscribers = await Subscription.countDocuments({
    creator: req.user._id,
    status: 'active',
    plan: 'monthly',
  });

  const yearlySubscribers = await Subscription.countDocuments({
    creator: req.user._id,
    status: 'active',
    plan: 'yearly',
  });

  // New subscribers this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const newThisMonth = await Subscription.countDocuments({
    creator: req.user._id,
    createdAt: { $gte: startOfMonth },
  });

  // Churn this month
  const cancelledThisMonth = await Subscription.countDocuments({
    creator: req.user._id,
    status: 'cancelled',
    cancelledAt: { $gte: startOfMonth },
  });

  res.json({
    success: true,
    data: {
      totalSubscribers,
      monthlySubscribers,
      yearlySubscribers,
      newThisMonth,
      cancelledThisMonth,
    },
  });
});

/**
 * @desc    Get single subscription
 * @route   GET /api/subscriptions/:id
 * @access  Private
 */
const getSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({
    _id: req.params.id,
    $or: [{ subscriber: req.user._id }, { creator: req.user._id }],
  })
    .populate('subscriber', 'name username email avatar')
    .populate('creator', 'name username avatar bio');

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found',
    });
  }

  res.json({
    success: true,
    data: subscription,
  });
});

module.exports = {
  getSubscriptions,
  getSubscribers,
  subscribe,
  cancelSubscription,
  checkSubscription,
  getSubscriptionStats,
  getSubscription,
};
