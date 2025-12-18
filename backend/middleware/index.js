const { protect, optionalAuth, requireProfileComplete, adminOnly } = require('./authMiddleware');
const { errorHandler, notFound, asyncHandler } = require('./errorMiddleware');

module.exports = {
  protect,
  optionalAuth,
  requireProfileComplete,
  adminOnly,
  errorHandler,
  notFound,
  asyncHandler,
};
