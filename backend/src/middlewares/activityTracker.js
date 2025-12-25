import UserActivity from "../models/UserActivity.js";

export const trackActivity = (activityType) => {
  return async (req, res, next) => {
    try {
      if (!req.user) return next();

      const ipAddress =
        req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

      const userAgent = req.headers["user-agent"] || "unknown";

      const deviceType = userAgent.includes("Mobile")
        ? "mobile"
        : "desktop";

      // 🔍 Check if same user + same IP already exists
      const existingActivity = await UserActivity.findOne({
        userId: req.user.id,
        ipAddress,
        activityType
      });

      if (existingActivity) {
        // ✅ Update instead of creating new doc
        existingActivity.count += 1;
        existingActivity.lastUsedAt = new Date();
        await existingActivity.save();
      } else {
        // 🆕 Create new document only once
        await UserActivity.create({
          userId: req.user.id,
          ipAddress,
          userAgent,
          deviceType,
          activityType
        });
      }
    } catch (err) {
      console.error("Activity tracking failed:", err.message);
    }

    next();
  };
};
