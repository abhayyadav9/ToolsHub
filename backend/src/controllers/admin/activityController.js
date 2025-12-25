import UserActivity from "../models/UserActivity.js";

export const getUserActivities = async (req, res) => {
  const activities = await UserActivity.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });

  res.json(activities);
};

export const getSuspiciousActivities = async (req, res) => {
  const suspicious = await UserActivity.find({ isSuspicious: true });
  res.json(suspicious);
};
