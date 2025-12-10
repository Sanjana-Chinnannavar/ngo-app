const AdminDashboard = () => {
  const stats = [
    { label: "Total Volunteers", value: 24 },
    { label: "Total Events", value: 6 },
    { label: "Announcements", value: 3 },
  ];

  const upcomingEvents = [
    { title: "Tree Plantation", date: "Jan 20, 2025" },
    { title: "Food Donation Camp", date: "Jan 26, 2025" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-blue-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="opacity-90 mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
        <div className="space-y-4">
          {upcomingEvents.map((event, i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-gray-700 mt-1">📅 {event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
