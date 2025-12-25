function SecurityAlerts({ alerts }) {
  if (!alerts?.length) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6">
      <h3 className="font-semibold text-red-700 mb-2">
        ⚠ Suspicious Activity Detected
      </h3>

      <ul className="space-y-2 text-sm">
        {alerts?.map((a) => (
          <li key={a._id} className="flex justify-between">
            <span>
              {a?.user?.email} — {a?.ipAddress}
            </span>
            <span className="text-red-600 font-medium">
              {a?.count} attempts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SecurityAlerts;