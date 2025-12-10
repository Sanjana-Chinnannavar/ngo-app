const AdminDashboard = () => {
  const mockStats = {
    volunteers: 24,
    events: 6,
    announcements: 3,
  };

  const upcomingEvents = [
    { title: "Tree Plantation", date: "Jan 20, 2025" },
    { title: "Food Drive", date: "Jan 26, 2025" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>

      {/* Stats section */}
      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <h3>{mockStats.volunteers}</h3>
          <p>Total Volunteers</p>
        </div>

        <div style={styles.card}>
          <h3>{mockStats.events}</h3>
          <p>Total Events</p>
        </div>

        <div style={styles.card}>
          <h3>{mockStats.announcements}</h3>
          <p>Announcements</p>
        </div>
      </div>

      {/* Upcoming events */}
      <h2 style={{ marginTop: "30px" }}>Upcoming Events</h2>
      <ul style={styles.list}>
        {upcomingEvents.map((event, i) => (
          <li key={i} style={styles.listItem}>
            <b>{event.title}</b> — {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic styling
const styles = {
  container: {
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
  },
  statsGrid: {
    display: "flex",
    gap: "20px",
  },
  card: {
    flex: 1,
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  list: {
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "10px",
  },
};

export default AdminDashboard;
