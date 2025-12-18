# QukLink Backend Developer Guide

## Overview

QukLink is a link monetization platform that allows creators to share links, sell digital products, and manage subscriptions. This backend is built with Node.js, Express, and MongoDB.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express | 4.21.x | Web framework |
| MongoDB | 6+ | Database |
| Mongoose | 8.9.x | ODM for MongoDB |
| JWT | - | Authentication tokens |
| Passport.js | - | OAuth strategies |
| bcryptjs | - | Password hashing |
| nanoid | 3.3.x | Short code generation |

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── passport.js        # Google OAuth strategy
├── controllers/
│   ├── analyticsController.js
│   ├── authController.js
│   ├── bookmarkController.js
│   ├── collectionController.js
│   ├── linkController.js
│   ├── notificationController.js
│   ├── payoutController.js
│   ├── shopController.js
│   ├── subscriptionController.js
│   ├── userController.js
│   └── index.js
├── middleware/
│   ├── authMiddleware.js  # JWT protection, role checks
│   ├── errorMiddleware.js # Error handling, async wrapper
│   └── index.js
├── models/
│   ├── Bookmark.js
│   ├── BookmarkCollection.js
│   ├── Click.js
│   ├── Collection.js
│   ├── Link.js
│   ├── Notification.js
│   ├── Order.js
│   ├── Payout.js
│   ├── Product.js
│   ├── Subscription.js
│   ├── User.js
│   └── index.js
├── routes/
│   ├── analyticsRoutes.js
│   ├── authRoutes.js
│   ├── bookmarkRoutes.js
│   ├── collectionRoutes.js
│   ├── linkRoutes.js
│   ├── notificationRoutes.js
│   ├── payoutRoutes.js
│   ├── shopRoutes.js
│   ├── subscriptionRoutes.js
│   ├── userRoutes.js
│   └── index.js
├── utils/
│   └── helpers.js         # Token generation, date utilities
├── .env.example
├── package.json
└── server.js              # Application entry point
```

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Required variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Strong secret for JWT signing (min 32 chars)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `FRONTEND_URL` - Frontend origin for CORS (default: http://localhost:5173)

### 3. Start Development Server

```bash
npm run dev    # With nodemon (hot reload)
npm start      # Production mode
```

Server runs on `http://localhost:5000` by default.

## API Reference

### Response Format

All responses follow this structure:

```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "message": "Error description"
}

// Paginated
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register with email/password |
| `/api/auth/login` | POST | Login with email/password |
| `/api/auth/logout` | POST | Clear auth cookies |
| `/api/auth/me` | GET | Get current user |
| `/api/auth/google` | GET | Initiate Google OAuth |
| `/api/auth/google/callback` | GET | Google OAuth callback |

### Users

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/profile` | GET | Get own profile |
| `/api/users/profile` | PUT | Update profile |
| `/api/users/profile/:username` | GET | Get public profile |
| `/api/users/stats` | GET | Get user statistics |
| `/api/users/payment-providers` | GET | Get payment providers |
| `/api/users/payment-providers` | POST | Add payment provider |
| `/api/users/payment-providers/:id` | PUT | Update payment provider |
| `/api/users/payment-providers/:id` | DELETE | Remove payment provider |

### Links

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/links` | GET | Get user's links (paginated) |
| `/api/links` | POST | Create new link |
| `/api/links/recent` | GET | Get 5 most recent links |
| `/api/links/:id` | GET | Get single link |
| `/api/links/:id` | PUT | Update link |
| `/api/links/:id` | DELETE | Delete link |
| `/api/links/:id/toggle` | PATCH | Toggle link active status |
| `/:shortCode` | GET | Redirect to original URL |

### Collections

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/collections` | GET | Get all collections |
| `/api/collections` | POST | Create collection |
| `/api/collections/:id` | GET | Get collection with links |
| `/api/collections/:id` | PUT | Update collection |
| `/api/collections/:id` | DELETE | Delete collection |
| `/api/collections/:id/links` | POST | Add link to collection |
| `/api/collections/:id/links/:linkId` | DELETE | Remove link from collection |

### Analytics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analytics/insights` | GET | Dashboard metrics |
| `/api/analytics/top-links` | GET | Top performing links |
| `/api/analytics/chart` | GET | Time-series click data |
| `/api/analytics/devices` | GET | Device breakdown |
| `/api/analytics/links/:id` | GET | Single link analytics |

Query parameters:
- `period` - Time period: `7d`, `30d`, `90d`, `1y`, `all`

### Notifications

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/notifications` | GET | Get all notifications |
| `/api/notifications/unread-count` | GET | Get unread count |
| `/api/notifications/read-all` | PUT | Mark all as read |
| `/api/notifications/all` | DELETE | Delete all notifications |
| `/api/notifications/:id` | GET | Get single notification |
| `/api/notifications/:id/read` | PUT | Mark as read |
| `/api/notifications/:id` | DELETE | Delete notification |

### Shop

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/shop/products` | GET | Get seller's products |
| `/api/shop/products` | POST | Create product |
| `/api/shop/products/:id` | GET | Get product |
| `/api/shop/products/:id` | PUT | Update product |
| `/api/shop/products/:id` | DELETE | Delete product |
| `/api/shop/public/:id` | GET | Get public product |
| `/api/shop/orders` | GET | Get seller's orders |
| `/api/shop/orders` | POST | Create order (buy) |
| `/api/shop/orders/:id` | GET | Get order details |
| `/api/shop/orders/:id/status` | PUT | Update order status |
| `/api/shop/stats` | GET | Get shop statistics |

### Subscriptions

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/subscriptions` | GET | Get user's subscriptions |
| `/api/subscriptions` | POST | Subscribe to creator |
| `/api/subscriptions/subscribers` | GET | Get creator's subscribers |
| `/api/subscriptions/stats` | GET | Subscription statistics |
| `/api/subscriptions/check/:creatorId` | GET | Check subscription status |
| `/api/subscriptions/:id` | GET | Get subscription details |
| `/api/subscriptions/:id/cancel` | PUT | Cancel subscription |

### Bookmarks

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bookmarks` | GET | Get all bookmarks |
| `/api/bookmarks` | POST | Add bookmark |
| `/api/bookmarks/check/:linkId` | GET | Check if bookmarked |
| `/api/bookmarks/:id` | PUT | Update bookmark |
| `/api/bookmarks/:id` | DELETE | Remove bookmark |
| `/api/bookmarks/link/:linkId` | DELETE | Remove by link ID |
| `/api/bookmarks/collections` | GET | Get bookmark folders |
| `/api/bookmarks/collections` | POST | Create folder |
| `/api/bookmarks/collections/:id` | PUT | Update folder |
| `/api/bookmarks/collections/:id` | DELETE | Delete folder |

### Payouts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/payouts` | GET | Get payout history |
| `/api/payouts` | POST | Request payout |
| `/api/payouts/stats` | GET | Get balance/earnings |
| `/api/payouts/transactions` | GET | Get transaction history |
| `/api/payouts/:id` | GET | Get payout details |
| `/api/payouts/:id/cancel` | PUT | Cancel pending payout |

## Database Models

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  username: String (unique),
  avatar: String,
  coverImage: String,
  bio: String,
  location: String,
  website: String,
  socialLinks: {
    twitter, instagram, youtube, tiktok, linkedin, github
  },
  interests: [String],
  achievements: [{
    title, description, icon, earnedAt
  }],
  paymentProviders: [{
    provider: 'paypal' | 'stripe' | 'wise',
    accountEmail, accountId, isActive, isPrimary
  }],
  settings: {
    emailNotifications, pushNotifications,
    weeklyDigest, newFollowerAlert,
    profileVisibility: 'public' | 'private' | 'subscribers',
    showEarnings
  },
  isProfileComplete: Boolean,
  role: 'user' | 'admin',
  googleId: String
}
```

### Link Schema

```javascript
{
  user: ObjectId,
  title: String,
  url: String (original URL),
  shortCode: String (nanoid, unique),
  description: String,
  thumbnail: String,
  tags: [String],
  isActive: Boolean,
  views: Number,
  clicks: Number,
  earnings: Number,
  scheduledAt: Date,
  expiresAt: Date,
  limitedAccess: {
    enabled: Boolean,
    userLimit: Number,
    currentUsers: Number
  },
  isSubscriberOnly: Boolean,
  adsEnabled: Boolean
}
```

### Click Schema (Analytics)

```javascript
{
  link: ObjectId,
  ip: String,
  userAgent: String,
  country: String,
  city: String,
  device: 'desktop' | 'mobile' | 'tablet',
  browser: String,
  os: String,
  referrer: String,
  timestamp: Date
}
// TTL: Auto-deleted after 90 days
```

## Middleware

### Authentication Middleware

```javascript
// Require valid JWT token
router.use(protect);

// Allow guests, attach user if logged in
router.get('/public', optionalAuth, handler);

// Require completed profile
router.use(requireProfileComplete);

// Admin only
router.use(adminOnly);
```

### Error Handling

All async route handlers should use `asyncHandler`:

```javascript
const { asyncHandler } = require('../middleware');

const getItems = asyncHandler(async (req, res) => {
  // Errors automatically caught and passed to errorHandler
  const items = await Item.find();
  res.json({ success: true, data: items });
});
```

## Authentication Flow

### JWT Token Flow

1. User registers/logs in
2. Server generates JWT (7-day expiry)
3. Token sent in HTTP-only cookie AND response body
4. Client can use Authorization header OR cookies
5. `protect` middleware validates token on protected routes

### Google OAuth Flow

1. Frontend redirects to `/api/auth/google`
2. User authenticates with Google
3. Google redirects to `/api/auth/google/callback`
4. Server creates/finds user, generates JWT
5. Redirects to `FRONTEND_URL/auth/callback?token=...`
6. Frontend stores token

## Development Tips

### Adding a New Feature

1. Create model in `models/`
2. Add to `models/index.js`
3. Create controller in `controllers/`
4. Add to `controllers/index.js`
5. Create routes in `routes/`
6. Add to `routes/index.js`
7. Mount in `server.js`

### Testing API Endpoints

Use the health check to verify server is running:

```bash
curl http://localhost:5000/health
```

Example auth flow:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Common Issues

**MongoDB Connection Failed**
- Check `MONGO_URI` in `.env`
- Ensure MongoDB is running
- Check network/firewall settings

**JWT Errors**
- Verify `JWT_SECRET` is set
- Check token expiration
- Clear cookies and re-login

**CORS Errors**
- Verify `FRONTEND_URL` matches your frontend origin
- Include credentials in frontend requests

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (32+ chars)
- [ ] Configure MongoDB Atlas or production database
- [ ] Set up HTTPS
- [ ] Configure rate limiting
- [ ] Enable compression
- [ ] Set up logging service
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up CI/CD pipeline
- [ ] Configure backup strategy

## Frontend Integration

The frontend expects these base API calls (from `frontend/src/api.ts`):

```typescript
const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});
```

Response interceptors handle token refresh and error normalization. See `frontend/src/api.ts` for complete type definitions.

---

Built with ❤️ for QukLink
