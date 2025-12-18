// Export all models from a single file
const User = require('./User');
const Link = require('./Link');
const Collection = require('./Collection');
const Click = require('./Click');
const Notification = require('./Notification');
const Product = require('./Product');
const Order = require('./Order');
const Subscription = require('./Subscription');
const Bookmark = require('./Bookmark');
const BookmarkCollection = require('./BookmarkCollection');
const Payout = require('./Payout');

module.exports = {
  User,
  Link,
  Collection,
  Click,
  Notification,
  Product,
  Order,
  Subscription,
  Bookmark,
  BookmarkCollection,
  Payout,
};
