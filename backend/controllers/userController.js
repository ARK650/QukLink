const User = require('../models/User');
const Link = require('../models/Link');
const Subscription = require('../models/Subscription');
const { asyncHandler } = require('../middleware');

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    'name',
    'displayName',
    'username',
    'bio',
    'description',
    'avatar',
    'profileImage',
    'coverImage',
    'gender',
    'age',
    'areasOfExpertise',
    'interests',
    'contactInfo',
    'achievements',
    'socialLinks',
    'profile',
  ];

  // Build update object
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  // Check if profile is now complete
  const user = await User.findById(req.user._id);
  const updatedUser = { ...user.toObject(), ...updates };
  
  if (updatedUser.displayName && updatedUser.username && updatedUser.bio) {
    updates.isProfileComplete = true;
  }

  const result = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Update user settings
 * @route   PUT /api/users/settings
 * @access  Private
 */
const updateSettings = asyncHandler(async (req, res) => {
  const { theme, emailNotifications, pushNotifications, subscriptionNotifications, earningsNotifications, adMonetization } = req.body;

  const settings = {};
  if (theme !== undefined) settings['settings.theme'] = theme;
  if (emailNotifications !== undefined) settings['settings.emailNotifications'] = emailNotifications;
  if (pushNotifications !== undefined) settings['settings.pushNotifications'] = pushNotifications;
  if (subscriptionNotifications !== undefined) settings['settings.subscriptionNotifications'] = subscriptionNotifications;
  if (earningsNotifications !== undefined) settings['settings.earningsNotifications'] = earningsNotifications;
  if (adMonetization !== undefined) settings['settings.adMonetization'] = adMonetization;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: settings },
    { new: true }
  );

  res.json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Get user stats
 * @route   GET /api/users/stats
 * @access  Private
 */
const getStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get link stats
  const linkStats = await Link.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        totalLinks: { $sum: 1 },
        totalViews: { $sum: '$views' },
        totalClicks: { $sum: '$clicks' },
        totalEarnings: { $sum: '$earnings' },
      },
    },
  ]);

  // Get subscriber count
  const subscriberCount = await Subscription.countDocuments({
    creator: userId,
    status: 'active',
  });

  const stats = linkStats[0] || {
    totalLinks: 0,
    totalViews: 0,
    totalClicks: 0,
    totalEarnings: 0,
  };
  stats.subscriberCount = subscriberCount;

  // Update user stats cache
  await User.findByIdAndUpdate(userId, {
    $set: {
      'stats.totalViews': stats.totalViews,
      'stats.totalClicks': stats.totalClicks,
      'stats.totalEarnings': stats.totalEarnings,
      'stats.subscriberCount': subscriberCount,
      'stats.linkCount': stats.totalLinks,
    },
  });

  res.json({
    success: true,
    data: stats,
  });
});

/**
 * @desc    Get public profile by username
 * @route   GET /api/users/profile/:username
 * @access  Public
 */
const getPublicProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    'displayName username bio avatar profileImage coverImage socialLinks stats areasOfExpertise interests'
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Get payment providers
 * @route   GET /api/users/payment-providers
 * @access  Private
 */
const getPaymentProviders = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('paymentProviders');

  res.json({
    success: true,
    data: user.paymentProviders || [],
  });
});

/**
 * @desc    Add payment provider
 * @route   POST /api/users/payment-providers
 * @access  Private
 */
const addPaymentProvider = asyncHandler(async (req, res) => {
  const { provider, accountDetails } = req.body;

  if (!provider || !['stripe', 'paypal', 'razorpay'].includes(provider)) {
    return res.status(400).json({
      success: false,
      message: 'Valid provider is required',
    });
  }

  const user = await User.findById(req.user._id);

  // Check if provider already exists
  const existingProvider = user.paymentProviders?.find((p) => p.provider === provider);
  if (existingProvider) {
    return res.status(400).json({
      success: false,
      message: 'Payment provider already connected',
    });
  }

  const newProvider = {
    provider,
    accountDetails,
    accountId: `${provider}_${Date.now()}`,
    isDefault: user.paymentProviders?.length === 0,
    createdAt: new Date(),
  };

  user.paymentProviders = user.paymentProviders || [];
  user.paymentProviders.push(newProvider);
  await user.save();

  res.status(201).json({
    success: true,
    data: newProvider,
  });
});

/**
 * @desc    Update payment provider
 * @route   PUT /api/users/payment-providers/:providerId
 * @access  Private
 */
const updatePaymentProvider = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const providerIndex = user.paymentProviders?.findIndex(
    (p) => p._id.toString() === req.params.providerId
  );

  if (providerIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Payment provider not found',
    });
  }

  const { accountDetails, isDefault } = req.body;

  if (accountDetails) {
    user.paymentProviders[providerIndex].accountDetails = accountDetails;
  }

  if (isDefault) {
    // Remove default from all others
    user.paymentProviders.forEach((p, i) => {
      p.isDefault = i === providerIndex;
    });
  }

  await user.save();

  res.json({
    success: true,
    data: user.paymentProviders[providerIndex],
  });
});

/**
 * @desc    Remove payment provider
 * @route   DELETE /api/users/payment-providers/:providerId
 * @access  Private
 */
const removePaymentProvider = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  user.paymentProviders = user.paymentProviders?.filter(
    (p) => p._id.toString() !== req.params.providerId
  );

  await user.save();

  res.json({
    success: true,
    message: 'Payment provider removed',
  });
});

module.exports = {
  getProfile,
  updateProfile,
  updateSettings,
  getStats,
  getPublicProfile,
  getPaymentProviders,
  addPaymentProvider,
  updatePaymentProvider,
  removePaymentProvider,
};
