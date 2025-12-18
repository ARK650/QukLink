const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    provider: {
      type: String,
      enum: ['stripe', 'paypal', 'razorpay', 'bank_transfer'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    payoutMethod: {
      type: String,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    // Details for the payout
    accountDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // Failure info
    failureReason: {
      type: String,
      default: null,
    },
    // Timestamps
    completedAt: {
      type: Date,
      default: null,
    },
    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
payoutSchema.index({ user: 1, createdAt: -1 });
payoutSchema.index({ status: 1 });
payoutSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Payout', payoutSchema);
