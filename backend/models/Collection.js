const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: '#6366f1', // Default indigo color
    },
    icon: {
      type: String,
      default: null,
    },
    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    linkCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
collectionSchema.index({ user: 1, createdAt: -1 });

// Update linkCount when links array changes
collectionSchema.pre('save', function (next) {
  this.linkCount = this.links.length;
  next();
});

module.exports = mongoose.model('Collection', collectionSchema);
