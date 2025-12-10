const Events = () => {
  const mockEvents = [
    { title: "Tree Plantation Drive", date: "Jan 20, 2025", volunteersNeeded: 10 },
    { title: "Food Donation Camp", date: "Jan 26, 2025", volunteersNeeded: 5 },
    { title: "Clothes Distribution", date: "Feb 2, 2025", volunteersNeeded: 8 },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Events</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <button className="mb-6 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
          + Create Event
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockEvents.map((event, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-md">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-gray-600 mt-1">📅 {event.date}</p>
              <p className="text-gray-600">👥 Needed: {event.volunteersNeeded}</p>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Assign Volunteers
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
