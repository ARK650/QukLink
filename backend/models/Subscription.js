const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    plan: {
      type: String,
      enum: ['free', 'monthly', 'yearly'],
      default: 'monthly',
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired', 'pending'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'razorpay', 'free'],
      default: 'stripe',
    },
    transactionId: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    nextBillingDate: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
subscriptionSchema.index({ subscriber: 1, creator: 1 }, { unique: true });
subscriptionSchema.index({ creator: 1, status: 1 });
subscriptionSchema.index({ subscriber: 1, status: 1 });

// Calculate next billing date based on plan
subscriptionSchema.pre('save', function (next) {
  if (this.isNew && !this.nextBillingDate && this.status === 'active') {
    const startDate = this.startDate || new Date();
    if (this.plan === 'monthly') {
      this.nextBillingDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
    } else if (this.plan === 'yearly') {
      this.nextBillingDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
    }
  }
  next();
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
