const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const linkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    originalUrl: {
      type: String,
      trim: true,
    },
    shortCode: {
      type: String,
      unique: true,
      default: () => nanoid(8),
      index: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    thumbnail: {
      type: String,
      default: null,
    },

    // Organization
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      default: null,
    },
    tags: [{ type: String, trim: true }],

    // Status
    status: {
      type: String,
      enum: ['active', 'inactive', 'scheduled'],
      default: 'active',
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Scheduling
    scheduling: {
      startDate: Date,
      endDate: Date,
    },
    scheduledDate: {
      type: Date,
      default: null,
    },

    // Access Control
    limitedAccess: {
      enabled: { type: Boolean, default: false },
      maxClicks: Number,
      password: String,
    },
    isSubscriberOnly: {
      type: Boolean,
      default: false,
    },

    // Monetization
    adsEnabled: {
      type: Boolean,
      default: false,
    },

    // Stats
    clicks: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    stats: {
      views: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
linkSchema.index({ user: 1, createdAt: -1 });
linkSchema.index({ shortCode: 1 });
linkSchema.index({ status: 1 });

// Sync stats fields
linkSchema.pre('save', function (next) {
  // Keep both stat structures in sync
  this.stats.views = this.views;
  this.stats.clicks = this.clicks;
  this.stats.earnings = this.earnings;
  
  // Set originalUrl if not set
  if (!this.originalUrl && this.url) {
    this.originalUrl = this.url;
  }
  
  next();
});

// Virtual for full short URL
linkSchema.virtual('fullShortUrl').get(function () {
  return `${process.env.FRONTEND_URL || 'http://localhost:5173'}/l/${this.shortCode}`;
});

module.exports = mongoose.model('Link', linkSchema);
