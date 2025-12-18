const mongoose = require('mongoose');

const bookmarkCollectionSchema = new mongoose.Schema(
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
    color: {
      type: String,
      default: '#6366f1',
    },
    bookmarkCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
bookmarkCollectionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('BookmarkCollection', bookmarkCollectionSchema);
