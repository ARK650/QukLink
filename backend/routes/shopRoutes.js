const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/shopController');
const { protect, requireProfileComplete } = require('../middleware/authMiddleware');

// Public routes
router.get('/public/:id', getPublicProduct);

// Protected routes
router.use(protect);
router.use(requireProfileComplete);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders
router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.put('/orders/:id/status', updateOrderStatus);

// Stats
router.get('/stats', getShopStats);

module.exports = router;
