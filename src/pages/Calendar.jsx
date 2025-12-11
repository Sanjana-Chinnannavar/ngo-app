import { useState } from "react";
import { mockEvents } from "../data/mockEvents";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* -----------------------------------------------------
     Dynamic Pastel Color Palette (Stable Assignment)
  ----------------------------------------------------- */
  const colorClasses = [
    "bg-red-200 text-red-900",
    "bg-orange-200 text-orange-900",
    "bg-emerald-200 text-emerald-900",
    "bg-sky-200 text-sky-900",
    "bg-purple-200 text-purple-900",
    "bg-yellow-200 text-yellow-900",
  ];

  // Assign each event a stable color based on its ID
  const events = mockEvents.map((ev) => ({
    ...ev,
    color: colorClasses[ev.id % colorClasses.length],
  }));

  /* ----------------------------------------------------- */

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];

  for (let i = 0; i < firstDayOfMonth; i++) calendarCells.push("");
  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);
  while (calendarCells.length < 42) calendarCells.push("");

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const isToday = (d) =>
    d &&
    today.getDate() === d &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  const formatDate = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <>
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#2A4D69] tracking-tight mb-6">
          Calendar
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#4B86B4]/20">

          {/* Month Controls */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevMonth}
              className="px-4 py-2 rounded-lg bg-[#2A4D69] text-white hover:bg-[#1E3A51] transition font-grotesk text-base tracking-wide"
            >
              ← Prev
            </button>

            <h2 className="text-2xl font-semibold text-[#2A4D69] tracking-tight">
              {monthNames[month]} {year}
            </h2>

            <button
              onClick={nextMonth}
              className="px-4 py-2 rounded-lg bg-[#2A4D69] text-white hover:bg-[#1E3A51] transition font-grotesk text-base tracking-wide"
            >
              Next →
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center font-medium">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="py-2 bg-[#4B86B4]/20 text-[#2A4D69] rounded-lg"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((date, i) => {
              const dateStr = formatDate(date);
              const eventsForDay = events.filter((ev) => ev.date === dateStr);

              return (
                <div
                  key={i}
                  className={`
                    h-28 p-2 rounded-lg border shadow-sm font-grotesk 
                    flex flex-col items-start relative
                    ${
                      date
                        ? "bg-[#F7F9FB] border-[#4B86B4]/20"
                        : "bg-gray-100 border-gray-200"
                    }
                    ${isToday(date) ? "ring-2 ring-[#2A4D69]" : ""}
                  `}
                >
                  <div className="absolute top-1 right-2 text-sm text-[#2A4D69] font-medium">
                    {date}
                  </div>

                  <div className="mt-6 w-full space-y-1">
                    {eventsForDay.map((ev, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedEvent(ev)}
                        className={`
                          px-2 py-1 rounded-md text-xs font-medium truncate w-full text-left 
                          ${ev.color} hover:opacity-80 transition
                        `}
                      >
                        {ev.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* === EVENT MODAL === */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl border border-[#4B86B4]/20 font-grotesk relative">

            <h2 className="text-2xl font-semibold text-[#2A4D69] mb-3">
              {selectedEvent.title}
            </h2>

            <p className="text-[#3E4C59] mb-2">
              📅 <strong>Date:</strong> {selectedEvent.date}
            </p>

            <p className="text-[#3E4C59] mb-4">
              👥 <strong>Volunteers Needed:</strong> {selectedEvent.volunteersNeeded}
            </p>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-3 px-4 py-2 rounded-lg bg-[#2A4D69] text-white hover:bg-[#1E3A51] transition text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
