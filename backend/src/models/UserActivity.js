import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // 👈 allow guest
    },
    isGuest: {
      type: Boolean,
      default: false,
    },

    ipAddress: {
      type: String,
      required: true,
    },

    userAgent: String,

    deviceType: {
      type: String,
      enum: ["mobile", "desktop"],
    },

    activityType: {
      type: String,
      enum: ["login", "logout", "api_call", "failed_login"],
      required: true,
    },

    count: {
      type: Number,
      default: 1, // 👈 IMPORTANT
    },

    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserActivity", userActivitySchema);
