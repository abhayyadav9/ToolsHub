import UserActivity from "../../models/UserActivity.js";

export const getUserActivities = async (req, res) => {
  try {
    const activities = await UserActivity.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const formattedActivities = activities.map((act) => ({
     

      activityType: act.activityType,
      device: act.deviceType || "unknown",
      ip: act.ipAddress,
      count: act.count,

      lastUsedAt: act.lastUsedAt,
      createdAt: act.createdAt,
    }));

    res.status(200).json({
      total: formattedActivities.length,
      activities: formattedActivities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user activities",
      error: error.message,
    });
  }
};
