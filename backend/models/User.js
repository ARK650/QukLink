const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      minlength: 6,
      select: false, // Don't include password in queries by default
    },
    username: {
      type: String,
      unique: true,
      sparse: true, // Allow null but unique when set
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores'],
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // Profile Images
    avatar: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },

    // Profile Details
    bio: {
      type: String,
      maxlength: 500,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say', null],
      default: null,
    },
    age: {
      type: Number,
      min: 13,
      max: 120,
    },

    // Arrays for profile
    areasOfExpertise: [{ type: String, trim: true }],
    interests: [{ type: String, trim: true }],
    contactInfo: [{ type: String, trim: true }],
    achievements: [{ type: String, trim: true }],

    // Social Links
    socialLinks: {
      telegram: String,
      instagram: String,
      linkedin: String,
      facebook: String,
      twitter: String,
      youtube: String,
      behance: String,
      tiktok: String,
      website: String,
    },

    // Profile settings
    profile: {
      phone: String,
      location: String,
      website: String,
    },

    // User Settings
    settings: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      subscriptionNotifications: {
        type: Boolean,
        default: true,
      },
      earningsNotifications: {
        type: Boolean,
        default: true,
      },
      adMonetization: {
        type: Boolean,
        default: false,
      },
    },

    // Payment Providers
    paymentProviders: [
      {
        provider: {
          type: String,
          enum: ['stripe', 'paypal', 'razorpay'],
        },
        accountId: String,
        accountDetails: mongoose.Schema.Types.Mixed,
        isDefault: Boolean,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Payout Settings
    payoutSettings: {
      preferredProvider: {
        type: String,
        enum: ['stripe', 'paypal', 'razorpay', null],
        default: null,
      },
      scheduleFrequency: {
        type: String,
        enum: ['weekly', 'bi-weekly', 'monthly'],
        default: 'monthly',
      },
      minPayoutAmount: {
        type: Number,
        default: 50,
      },
      autoPayoutEnabled: {
        type: Boolean,
        default: false,
      },
    },

    // Subscription Settings (as a creator)
    subscriptionSettings: {
      monthlyPrice: {
        type: Number,
        default: 0,
      },
      yearlyPrice: {
        type: Number,
        default: 0,
      },
      benefits: [String],
    },

    // OAuth
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Role & Status
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Stats (cached/computed)
    stats: {
      totalViews: { type: Number, default: 0 },
      totalClicks: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      subscriberCount: { type: Number, default: 0 },
      linkCount: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ googleId: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate username from email if not set
userSchema.pre('save', function (next) {
  if (!this.username && this.email) {
    this.username = this.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '_');
  }
  if (!this.displayName && this.name) {
    this.displayName = this.name;
  }
  next();
});

// Remove sensitive fields when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
