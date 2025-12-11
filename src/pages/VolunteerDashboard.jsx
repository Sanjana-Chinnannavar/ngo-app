import { useNavigate } from "react-router-dom";

const VolunteerDashboard = () => {
  const navigate = useNavigate();

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
      <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
        Volunteer Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-8 border border-[#4B86B4]/20">

        {/* Assigned Events */}
        <section>
          <h2 className="text-xl font-semibold text-[#2A4D69] tracking-tight mb-3">
            <b>Assigned Events</b>
          </h2>

          <div className="space-y-3">
            {assignedEvents.map((event, i) => (
              <div
                key={i}
                className="bg-[#F7F9FB] p-4 rounded-lg border border-[#4B86B4]/20 shadow-sm"
              >
                <h3 className="font-medium text-[#2A4D69] text-lg">
                  {event.title}
                </h3>
                <p className="text-[#3E4C59] mt-1">📅 {event.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h2 className="text-xl font-semibold text-[#2A4D69] tracking-tight mb-3">
            <b>Announcements</b>
          </h2>

          <ul className="space-y-3">
            {announcements.map((msg, i) => (
              <li
                key={i}
                className="bg-[#F7F9FB] p-4 rounded-lg border border-[#4B86B4]/20 shadow-sm text-[#3E4C59]"
              >
                {msg}
              </li>
            ))}
          </ul>
        </section>

        {/* Browse Events Button */}
        <button
          onClick={() => navigate("/events")}
          className="
            bg-[#2A4D69] text-white px-5 py-2 rounded-lg 
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

export default VolunteerDashboard;
