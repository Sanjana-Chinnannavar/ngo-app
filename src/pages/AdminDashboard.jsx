import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
      <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#2A4D69] p-6 rounded-xl shadow-md flex flex-col items-center text-white"
            >
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="text-sm mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <h2 className="text-xl font-semibold text-[#2A4D69] tracking-tight mb-3">
          Upcoming Events
        </h2>

        <div className="space-y-4">
          {upcomingEvents.map((event, i) => (
            <div
              key={i}
              className="bg-[#F7F9FB] p-4 rounded-xl border border-[#4B86B4]/20 shadow-sm"
            >
              <h3 className="font-medium text-[#2A4D69] text-lg">{event.title}</h3>
              <p className="text-[#3E4C59] mt-1">📅 {event.date}</p>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <button
          onClick={() => navigate("/events")}
          className="
            mt-6 px-5 py-2 rounded-lg 
            bg-[#2A4D69] text-white 
            hover:bg-[#1E3A51] transition 
            font-grotesk text-sm tracking-wide
          "
        >
          View All Events
        </button>

      </div>
    </div>
  );
};

export default AdminDashboard;
