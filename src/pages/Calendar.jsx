const Calendar = () => {
  // Example static month: January 2025 (starts on Wednesday)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Hardcoded grid for January 2025
  const calendarGrid = [
    ["", "", "", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9", "10", "11"],
    ["12", "13", "14", "15", "16", "17", "18"],
    ["19", "20", "21", "22", "23", "24", "25"],
    ["26", "27", "28", "29", "30", "31", ""],
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Calendar</h1>

      {/* Month Header */}
      <h2 style={styles.month}>January 2025</h2>

      {/* Weekday Labels */}
      <div style={styles.weekRow}>
        {daysOfWeek.map((day) => (
          <div key={day} style={styles.weekCell}>
            <b>{day}</b>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      {calendarGrid.map((week, i) => (
        <div key={i} style={styles.weekRow}>
          {week.map((date, j) => (
            <div key={j} style={styles.dayCell}>
              {date && <span>{date}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Styling
const styles = {
  container: {
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
  },
  month: {
    textAlign: "center",
    marginBottom: "20px",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
  },
  weekCell: {
    padding: "10px",
    textAlign: "center",
    background: "#f3f3f3",
    borderRadius: "6px",
  },
  dayCell: {
    height: "80px",
    background: "white",
    borderRadius: "6px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    padding: "8px",
  },
};

export default Calendar;
