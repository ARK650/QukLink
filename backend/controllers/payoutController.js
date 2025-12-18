const Payout = require('../models/Payout');
const User = require('../models/User');
const Order = require('../models/Order');
const { asyncHandler } = require('../middleware');
const { createNotification } = require('./notificationController');

/**
 * @desc    Get payout history
 * @route   GET /api/payouts
 * @access  Private
 */
const getPayouts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { user: req.user._id };
  if (status) {
    query.status = status;
  }

  const payouts = await Payout.find(query)
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Payout.countDocuments(query);

  res.json({
    success: true,
    data: {
      payouts,
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
 * @desc    Get single payout
 * @route   GET /api/payouts/:id
 * @access  Private
 */
const getPayout = asyncHandler(async (req, res) => {
  const payout = await Payout.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!payout) {
    return res.status(404).json({
      success: false,
      message: 'Payout not found',
    });
  }

  res.json({
    success: true,
    data: payout,
  });
});

/**
 * @desc    Request payout
 * @route   POST /api/payouts
 * @access  Private
 */
const requestPayout = asyncHandler(async (req, res) => {
  const { amount, provider } = req.body;

  // Get user's payment provider info
  const user = await User.findById(req.user._id);
  const paymentProvider = user.paymentProviders.find(
    (p) => p.provider === provider && p.isActive
  );

  if (!paymentProvider) {
    return res.status(400).json({
      success: false,
      message: 'Payment provider not configured or inactive',
    });
  }

  // Check available balance (from completed orders)
  const completedOrders = await Order.aggregate([
    {
      $match: {
        seller: req.user._id,
        paymentStatus: 'completed',
      },
    },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$amount' },
      },
    },
  ]);

  // Get already paid out amount
  const paidOut = await Payout.aggregate([
    {
      $match: {
        user: req.user._id,
        status: { $in: ['pending', 'processing', 'completed'] },
      },
    },
    {
      $group: {
        _id: null,
        totalPaidOut: { $sum: '$amount' },
      },
    },
  ]);

  const totalEarnings = completedOrders[0]?.totalEarnings || 0;
  const totalPaidOut = paidOut[0]?.totalPaidOut || 0;
  const availableBalance = totalEarnings - totalPaidOut;

  if (amount > availableBalance) {
    return res.status(400).json({
      success: false,
      message: `Insufficient balance. Available: $${availableBalance.toFixed(2)}`,
    });
  }

  // Minimum payout threshold
  const minimumPayout = 10;
  if (amount < minimumPayout) {
    return res.status(400).json({
      success: false,
      message: `Minimum payout amount is $${minimumPayout}`,
    });
  }

  const payout = await Payout.create({
    user: req.user._id,
    amount,
    provider,
    providerDetails: {
      email: paymentProvider.accountEmail,
      accountId: paymentProvider.accountId,
    },
    status: 'pending',
  });

  // Create notification
  await createNotification({
    user: req.user._id,
    type: 'payout',
    title: 'Payout Requested',
    message: `Your payout request for $${amount} has been submitted`,
    actionUrl: '/payments',
  });

  res.status(201).json({
    success: true,
    data: payout,
  });
});

/**
 * @desc    Cancel payout request
 * @route   PUT /api/payouts/:id/cancel
 * @access  Private
 */
const cancelPayout = asyncHandler(async (req, res) => {
  const payout = await Payout.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!payout) {
    return res.status(404).json({
      success: false,
      message: 'Payout not found',
    });
  }

  if (payout.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'Can only cancel pending payouts',
    });
  }

  payout.status = 'cancelled';
  await payout.save();

  res.json({
    success: true,
    data: payout,
  });
});

/**
 * @desc    Get payout stats/balance
 * @route   GET /api/payouts/stats
 * @access  Private
 */
const getPayoutStats = asyncHandler(async (req, res) => {
  // Total earnings from orders
  const orderEarnings = await Order.aggregate([
    {
      $match: {
        seller: req.user._id,
        paymentStatus: 'completed',
      },
    },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$amount' },
      },
    },
  ]);

  // Total paid out
  const paidOut = await Payout.aggregate([
    {
      $match: {
        user: req.user._id,
        status: 'completed',
      },
    },
    {
      $group: {
        _id: null,
        totalPaidOut: { $sum: '$amount' },
      },
    },
  ]);

  // Pending payouts
  const pendingPayouts = await Payout.aggregate([
    {
      $match: {
        user: req.user._id,
        status: { $in: ['pending', 'processing'] },
      },
    },
    {
      $group: {
        _id: null,
        pendingAmount: { $sum: '$amount' },
      },
    },
  ]);

  const totalEarnings = orderEarnings[0]?.totalEarnings || 0;
  const totalPaidOut = paidOut[0]?.totalPaidOut || 0;
  const pendingAmount = pendingPayouts[0]?.pendingAmount || 0;
  const availableBalance = totalEarnings - totalPaidOut - pendingAmount;

  res.json({
    success: true,
    data: {
      totalEarnings,
      totalPaidOut,
      pendingAmount,
      availableBalance,
    },
  });
});

/**
 * @desc    Get transaction history (all earnings/payouts)
 * @route   GET /api/payouts/transactions
 * @access  Private
 */
const getTransactions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, type } = req.query;

  // Get orders (incoming money) and payouts (outgoing money)
  let transactions = [];

  if (!type || type === 'earning') {
    const orders = await Order.find({
      seller: req.user._id,
      paymentStatus: 'completed',
    })
      .populate('product', 'name')
      .populate('buyer', 'name username')
      .select('amount createdAt product buyer')
      .lean();

    transactions = transactions.concat(
      orders.map((o) => ({
        _id: o._id,
        type: 'earning',
        amount: o.amount,
        description: `Sale: ${o.product?.name || 'Product'}`,
        from: o.buyer?.name || 'Unknown',
        date: o.createdAt,
      }))
    );
  }

  if (!type || type === 'payout') {
    const payouts = await Payout.find({ user: req.user._id })
      .select('amount provider status createdAt')
      .lean();

    transactions = transactions.concat(
      payouts.map((p) => ({
        _id: p._id,
        type: 'payout',
        amount: -p.amount,
        description: `Payout via ${p.provider}`,
        status: p.status,
        date: p.createdAt,
      }))
    );
  }

  // Sort by date descending
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Paginate
  const startIndex = (page - 1) * limit;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + parseInt(limit)
  );

  res.json({
    success: true,
    data: {
      transactions: paginatedTransactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: transactions.length,
        pages: Math.ceil(transactions.length / limit),
      },
    },
  });
});

module.exports = {
  getPayouts,
  getPayout,
  requestPayout,
  cancelPayout,
  getPayoutStats,
  getTransactions,
};
