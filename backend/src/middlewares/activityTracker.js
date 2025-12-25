import UserActivity from "../models/UserActivity.js";

const DEBUG_ACTIVITY = true;

export const trackActivity = (activityType) => {
  return async (req, res, next) => {
    try {
      const ipAddress =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.ip ||
        "unknown";

      const userAgent = req.headers["user-agent"] || "unknown";

      const deviceType = /mobile/i.test(userAgent)
        ? "mobile"
        : "desktop";

      const userId = req.user?.id || null;
      const isGuest = !req.user;

      await UserActivity.findOneAndUpdate(
        {
          userId,
          ipAddress,
          activityType,
          isGuest
        },
        {
          $inc: { count: 1 },
          $set: {
            lastUsedAt: new Date(),
            userAgent,
            deviceType
          }
        },
        { upsert: true }
      );

    } catch (err) {
      console.error("Activity tracking failed:", err.message);
    }

    next();
  };
};
