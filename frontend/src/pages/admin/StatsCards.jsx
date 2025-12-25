function StatsCards({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl p-5 border shadow-sm bg-white
            ${stat.danger ? "border-red-300 bg-red-50" : ""}
          `}
        >
          <p className="text-gray-500 text-sm">{stat.label}</p>

          <h2
            className={`text-2xl font-bold mt-1
              ${stat.danger ? "text-red-600" : "text-gray-900"}
            `}
          >
            {stat.value}
          </h2>

          {stat.danger && (
            <p className="text-xs text-red-500 mt-1">
              Needs attention
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
