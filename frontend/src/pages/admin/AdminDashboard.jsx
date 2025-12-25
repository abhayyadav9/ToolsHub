import { useEffect, useState } from "react";
import axios from "axios";

import StatsCards from "./StatsCards";
import SecurityAlerts from "./SecurityAlerts";
import RecentActivityTable from "./RecentActivityTable";
import { NODE_BASE_URL } from "../../utils/nodeApi.js";

export default function AdminDashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${NODE_BASE_URL}/admin/user-data`);
        setActivities(res.data.activities || []);
      } catch (err) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-gray-600 animate-pulse">
        Loading dashboard…
      </div>
    );

  if (error)
    return <div className="p-6 text-red-600 font-medium">{error}</div>;

  // -------------------------
  // 🔢 DERIVED DASHBOARD DATA
  // -------------------------

  const totalVisits = activities.length;

  const mobileUsers = activities.filter(
    (a) => a.device === "mobile"
  ).length;

  const desktopUsers = activities.filter(
    (a) => a.device === "desktop"
  ).length;

  const suspicious = activities.filter((a) => a.count >= 20);

  const stats = [
    {
      label: "Total Activities",
      value: totalVisits,
    },
    {
      label: "Mobile Users",
      value: mobileUsers,
    },
    {
      label: "Desktop Users",
      value: desktopUsers,
    },
    {
      label: "Suspicious Hits",
      value: suspicious.length,
      danger: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Real-time system & user activity monitoring
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Alerts */}
      {/* <SecurityAlerts alerts={suspicious} /> */}

      {/* Activity Table */}
      <RecentActivityTable activities={activities} />
    </div>
  );
}
