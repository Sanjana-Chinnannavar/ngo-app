const VolunteerDashboard = () => {
  const assignedEvents = [
    { title: "Tree Plantation", date: "Jan 20, 2025" },
    { title: "Food Drive", date: "Jan 26, 2025" },
  ];

  const announcements = [
    "Mandatory orientation meeting on Jan 18.",
    "Please update your availability form.",
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Volunteer Dashboard</h1>

      {/* Assigned Events */}
      <section style={styles.section}>
        <h2>Assigned Events</h2>
        <ul style={styles.list}>
          {assignedEvents.map((event, i) => (
            <li key={i} style={styles.listItem}>
              <b>{event.title}</b> — {event.date}
            </li>
          ))}
        </ul>
      </section>

      {/* Announcements */}
      <section style={styles.section}>
        <h2>Announcements</h2>
        <ul style={styles.list}>
          {announcements.map((msg, i) => (
            <li key={i} style={styles.listItem}>{msg}</li>
          ))}
        </ul>
      </section>

      {/* Browse events button */}
      <button style={styles.button}>
        Browse All Events
      </button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
  },
  section: {
    marginBottom: "25px",
  },
  list: {
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "8px",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default VolunteerDashboard;
