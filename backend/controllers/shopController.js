const Product = require('../models/Product');
const Order = require('../models/Order');
const { asyncHandler } = require('../middleware');
const { createNotification } = require('./notificationController');

/**
 * @desc    Get all products for user's shop
 * @route   GET /api/shop/products
 * @access  Private
 */
const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { seller: req.user._id };
  if (status) {
    query.status = status;
  }

  const products = await Product.find(query)
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    data: {
      products,
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
 * @desc    Get single product
 * @route   GET /api/shop/products/:id
 * @access  Private
 */
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Create product
 * @route   POST /api/shop/products
 * @access  Private
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    compareAtPrice,
    images,
    productType,
    digitalFile,
    stock,
    isLimitedEdition,
    maxQuantity,
  } = req.body;

  const product = await Product.create({
    seller: req.user._id,
    name,
    description,
    price,
    compareAtPrice,
    images: images || [],
    productType: productType || 'digital',
    digitalFile,
    stock,
    isLimitedEdition,
    maxQuantity,
    status: 'active',
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/shop/products/:id
 * @access  Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  const allowedFields = [
    'name',
    'description',
    'price',
    'compareAtPrice',
    'images',
    'productType',
    'digitalFile',
    'stock',
    'isLimitedEdition',
    'maxQuantity',
    'status',
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  await product.save();

  res.json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/shop/products/:id
 * @access  Private
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.json({
    success: true,
    message: 'Product deleted',
  });
});

/**
 * @desc    Get orders for seller
 * @route   GET /api/shop/orders
 * @access  Private
 */
const getOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { seller: req.user._id };
  if (status) {
    query.status = status;
  }

  const orders = await Order.find(query)
    .populate('buyer', 'name email avatar')
    .populate('product', 'name price images')
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(query);

  res.json({
    success: true,
    data: {
      orders,
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
 * @desc    Get single order
 * @route   GET /api/shop/orders/:id
 * @access  Private
 */
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    $or: [{ seller: req.user._id }, { buyer: req.user._id }],
  })
    .populate('buyer', 'name email avatar')
    .populate('seller', 'name email avatar')
    .populate('product', 'name price images productType');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  res.json({
    success: true,
    data: order,
  });
});

/**
 * @desc    Update order status
 * @route   PUT /api/shop/orders/:id/status
 * @access  Private
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findOne({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  order.status = status;
  if (status === 'completed') {
    order.completedAt = new Date();
  }
  await order.save();

  // Notify buyer
  await createNotification({
    user: order.buyer,
    type: 'order',
    title: 'Order Status Updated',
    message: `Your order status has been updated to: ${status}`,
    actionUrl: `/orders/${order._id}`,
  });

  res.json({
    success: true,
    data: order,
  });
});

/**
 * @desc    Get public product (for buyers)
 * @route   GET /api/shop/public/:id
 * @access  Public
 */
const getPublicProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    status: 'active',
  }).populate('seller', 'name username avatar');

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Create order (purchase product)
 * @route   POST /api/shop/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findOne({
    _id: productId,
    status: 'active',
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or not available',
    });
  }

  // Check stock
  if (product.stock !== null && product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient stock',
    });
  }

  const order = await Order.create({
    buyer: req.user._id,
    seller: product.seller,
    product: product._id,
    quantity,
    amount: product.price * quantity,
    status: 'pending',
    paymentStatus: 'pending',
  });

  // Update stock
  if (product.stock !== null) {
    product.stock -= quantity;
    product.totalSold += quantity;
    await product.save();
  }

  // Notify seller
  await createNotification({
    user: product.seller,
    type: 'sale',
    title: 'New Order',
    message: `You have a new order for ${product.name}`,
    actionUrl: `/shop/orders/${order._id}`,
  });

  res.status(201).json({
    success: true,
    data: order,
  });
});

/**
 * @desc    Get shop stats
 * @route   GET /api/shop/stats
 * @access  Private
 */
const getShopStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments({ seller: req.user._id });
  const activeProducts = await Product.countDocuments({
    seller: req.user._id,
    status: 'active',
  });

  const orderStats = await Order.aggregate([
    { $match: { seller: req.user._id } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0],
          },
        },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
        },
      },
    },
  ]);

  const stats = orderStats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
  };

  res.json({
    success: true,
    data: {
      totalProducts,
      activeProducts,
      ...stats,
    },
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrder,
  updateOrderStatus,
  getPublicProduct,
  createOrder,
  getShopStats,
};
