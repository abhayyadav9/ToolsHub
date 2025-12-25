function RecentActivityTable({ activities = [] }) {
  return (
    <div className="bg-white rounded-xl border mt-6 overflow-x-auto">
      <div className="p-4 font-semibold">
        Recent User Activity
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2">Device</th>
            <th className="px-4 py-2">Activity</th>
            <th className="px-4 py-2">Count</th>
            <th className="px-4 py-2">Last Seen</th>
          </tr>
        </thead>

        <tbody>
          {activities.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 text-gray-400"
              >
                No activity found
              </td>
            </tr>
          )}

          {activities.map((a, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition"
            >
              {/* User */}
              <td className="px-4 py-2">
                <span className="text-gray-700">
                  Guest
                </span>
              </td>

              {/* IP */}
              <td className="px-4 py-2 font-mono text-xs">
                {a.ip === "::1" ? "Localhost" : a.ip}
              </td>

              {/* Device */}
              <td className="px-4 py-2 capitalize">
                <span
                  className={`px-2 py-1 rounded-full text-xs
                    ${
                      a.device === "mobile"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }
                  `}
                >
                  {a.device}
                </span>
              </td>

              {/* Activity */}
              <td className="px-4 py-2">
                {a.activityType}
              </td>

              {/* Count */}
              <td
                className={`px-4 py-2 text-center font-semibold
                  ${a.count >= 20 ? "text-red-600" : ""}
                `}
              >
                {a.count}
              </td>

              {/* Last Seen */}
              <td className="px-4 py-2 text-gray-500 text-xs">
                {new Date(a.lastUsedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentActivityTable;
