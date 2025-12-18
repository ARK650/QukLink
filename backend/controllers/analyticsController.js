const Link = require('../models/Link');
const Click = require('../models/Click');
const Subscription = require('../models/Subscription');
const Order = require('../models/Order');
const { asyncHandler } = require('../middleware');
const { getDateRange, getPreviousPeriodRange, percentageChange } = require('../utils/helpers');

/**
 * @desc    Get dashboard insights/overview
 * @route   GET /api/analytics/insights
 * @access  Private
 */
const getInsights = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { period = '30d' } = req.query;

  const { startDate, endDate } = getDateRange(period);
  const previousPeriod = getPreviousPeriodRange(period);

  // Current period stats
  const currentStats = await Link.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        totalViews: { $sum: '$views' },
        totalClicks: { $sum: '$clicks' },
        totalEarnings: { $sum: '$earnings' },
      },
    },
  ]);

  // Current period clicks
  const currentClicks = await Click.countDocuments({
    link: { $in: await Link.find({ user: userId }).distinct('_id') },
    timestamp: { $gte: startDate, $lte: endDate },
  });

  // Previous period clicks for comparison
  const previousClicks = await Click.countDocuments({
    link: { $in: await Link.find({ user: userId }).distinct('_id') },
    timestamp: { $gte: previousPeriod.startDate, $lte: previousPeriod.endDate },
  });

  // Subscriber counts
  const currentSubscribers = await Subscription.countDocuments({
    creator: userId,
    status: 'active',
  });

  const newSubscribers = await Subscription.countDocuments({
    creator: userId,
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const previousNewSubscribers = await Subscription.countDocuments({
    creator: userId,
    createdAt: { $gte: previousPeriod.startDate, $lte: previousPeriod.endDate },
  });

  const stats = currentStats[0] || { totalViews: 0, totalClicks: 0, totalEarnings: 0 };

  res.json({
    success: true,
    data: {
      totalViews: stats.totalViews,
      totalClicks: stats.totalClicks,
      totalEarnings: stats.totalEarnings,
      subscriberCount: currentSubscribers,
      viewsChange: percentageChange(currentClicks, previousClicks),
      clicksChange: percentageChange(currentClicks, previousClicks),
      earningsChange: 0, // Would need historical earnings tracking
      subscribersChange: percentageChange(newSubscribers, previousNewSubscribers),
    },
  });
});

/**
 * @desc    Get top performing links
 * @route   GET /api/analytics/top-links
 * @access  Private
 */
const getTopLinks = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const links = await Link.find({ user: req.user._id })
    .sort('-clicks')
    .limit(parseInt(limit))
    .select('title shortCode clicks views earnings thumbnail');

  res.json({
    success: true,
    data: links,
  });
});

/**
 * @desc    Get chart data (views/clicks over time)
 * @route   GET /api/analytics/chart
 * @access  Private
 */
const getChartData = asyncHandler(async (req, res) => {
  const { period = '30d' } = req.query;
  const { startDate, endDate } = getDateRange(period);

  const userLinks = await Link.find({ user: req.user._id }).distinct('_id');

  // Aggregate clicks by day
  const clickData = await Click.aggregate([
    {
      $match: {
        link: { $in: userLinks },
        timestamp: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
        },
        clicks: { $sum: 1 },
        views: { $sum: 1 }, // Each click is also a view
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill in missing dates with zeros
  const result = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    const existing = clickData.find((d) => d._id === dateStr);
    result.push({
      date: dateStr,
      clicks: existing?.clicks || 0,
      views: existing?.views || 0,
      earnings: 0, // Would need to track earnings per click
    });
    current.setDate(current.getDate() + 1);
  }

  res.json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get device analytics
 * @route   GET /api/analytics/devices
 * @access  Private
 */
const getDeviceAnalytics = asyncHandler(async (req, res) => {
  const userLinks = await Link.find({ user: req.user._id }).distinct('_id');

  const deviceStats = await Click.aggregate([
    { $match: { link: { $in: userLinks } } },
    {
      $group: {
        _id: '$device',
        count: { $sum: 1 },
      },
    },
  ]);

  const total = deviceStats.reduce((sum, d) => sum + d.count, 0);

  const result = deviceStats.map((d) => ({
    device: d._id || 'unknown',
    count: d.count,
    percentage: total > 0 ? Math.round((d.count / total) * 100) : 0,
  }));

  res.json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get analytics for single link
 * @route   GET /api/analytics/links/:id
 * @access  Private
 */
const getLinkAnalytics = asyncHandler(async (req, res) => {
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

  const { period = '30d' } = req.query;
  const { startDate, endDate } = getDateRange(period);

  // Get click stats for this link
  const clickStats = await Click.aggregate([
    {
      $match: {
        link: link._id,
        timestamp: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        totalClicks: { $sum: 1 },
      },
    },
  ]);

  // Get device breakdown
  const deviceBreakdown = await Click.aggregate([
    {
      $match: {
        link: link._id,
        timestamp: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: '$device',
        count: { $sum: 1 },
      },
    },
  ]);

  // Get daily clicks
  const dailyClicks = await Click.aggregate([
    {
      $match: {
        link: link._id,
        timestamp: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
        clicks: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    data: {
      link: {
        _id: link._id,
        title: link.title,
        shortCode: link.shortCode,
        totalClicks: link.clicks,
        totalViews: link.views,
        earnings: link.earnings,
      },
      periodStats: clickStats[0] || { totalClicks: 0 },
      deviceBreakdown,
      dailyClicks,
    },
  });
});

module.exports = {
  getInsights,
  getTopLinks,
  getChartData,
  getDeviceAnalytics,
  getLinkAnalytics,
};
