require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const connectDB = require('./config/db');
require('./config/passport');

const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const {
  authRoutes,
  userRoutes,
  linkRoutes,
  collectionRoutes,
  analyticsRoutes,
  notificationRoutes,
  shopRoutes,
  subscriptionRoutes,
  bookmarkRoutes,
  payoutRoutes,
} = require('./routes');

// Link redirect handler for root level short codes
const { handleRedirect } = require('./controllers/linkController');
const { optionalAuth } = require('./middleware/authMiddleware');

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Passport initialization
app.use(passport.initialize());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/payouts', payoutRoutes);

// Root-level short link redirect (e.g., /abc123 -> original URL)
// This should be placed after API routes to avoid conflicts
app.get('/:shortCode', optionalAuth, handleRedirect);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 QukLink Backend Server
━━━━━━━━━━━━━━━━━━━━━━━━━
  Port:        ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  MongoDB:     ${process.env.MONGO_URI ? 'Connected' : 'Not configured'}
━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  // Close server & exit process
  process.exit(1);
});

module.exports = app;
