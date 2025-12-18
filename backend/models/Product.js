const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 5000,
    },
    images: [{ type: String }],
    thumbnail: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
      default: null,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    category: {
      type: String,
      trim: true,
    },
    productType: {
      type: String,
      enum: ['digital', 'physical', 'service'],
      default: 'digital',
    },
    // For digital products
    downloadUrl: {
      type: String,
      default: null,
    },
    downloadLimit: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      default: -1, // -1 = unlimited
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'draft',
    },
    // Stats
    sales: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    stats: {
      views: { type: Number, default: 0 },
      sales: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ user: 1, status: 1 });
productSchema.index({ user: 1, createdAt: -1 });

// Sync stats
productSchema.pre('save', function (next) {
  this.stats.sales = this.sales;
  this.stats.revenue = this.revenue;
  next();
});

module.exports = mongoose.model('Product', productSchema);
