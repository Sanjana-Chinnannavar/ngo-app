const VolunteerDashboard = () => {
  const assignedEvents = [
    { title: "Tree Plantation", date: "Jan 20, 2025" },
    { title: "Food Donation Camp", date: "Jan 26, 2025" },
  ];

  const announcements = [
    "Mandatory orientation meeting on Jan 18.",
    "Please update your availability form.",
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Volunteer Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-8">
        {/* Assigned Events */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Assigned Events</h2>
          <div className="space-y-3">
            {assignedEvents.map((event, i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-lg border shadow-sm"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-gray-600 mt-1">📅 {event.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Announcements</h2>
          <ul className="space-y-3">
            {announcements.map((msg, i) => (
              <li
                key={i}
                className="bg-gray-50 p-4 rounded-lg border shadow-sm"
              >
                {msg}
              </li>
            ))}
          </ul>
        </section>

        {/* Browse Events Button */}
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Browse All Events
        </button>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
