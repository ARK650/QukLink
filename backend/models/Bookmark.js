const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
      required: true,
    },
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookmarkCollection',
      default: null,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
bookmarkSchema.index({ user: 1, link: 1 }, { unique: true });
bookmarkSchema.index({ user: 1, collection: 1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
