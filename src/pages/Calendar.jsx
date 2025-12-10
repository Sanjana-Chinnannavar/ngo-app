import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build calendar grid
  const calendarCells = [];

  // Empty cells before month start
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push("");
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Pad to full weeks (42 cells = 6 weeks)
  while (calendarCells.length < 42) {
    calendarCells.push("");
  }

  // Month switching
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Calendar</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        
        {/* Month Controls */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Prev
          </button>

          <h2 className="text-xl font-semibold">
            {monthNames[month]} {year}
          </h2>

          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center font-medium text-gray-700">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((date, i) => (
            <div
              key={i}
              className={`h-20 border rounded-lg shadow-sm flex justify-end items-start p-2 ${
                date ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              {date || ""}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Calendar;
