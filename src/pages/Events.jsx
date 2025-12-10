const Events = () => {
  const mockEvents = [
    {
      title: "Tree Plantation Drive",
      date: "Jan 20, 2025",
      volunteersNeeded: 10,
    },
    {
      title: "Food Donation Camp",
      date: "Jan 26, 2025",
      volunteersNeeded: 5,
    },
    {
      title: "Clothes Distribution",
      date: "Feb 2, 2025",
      volunteersNeeded: 8,
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Events</h1>

      <button style={styles.createButton}>+ Create Event</button>

      <div style={styles.list}>
        {mockEvents.map((event, i) => (
          <div key={i} style={styles.card}>
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Volunteers needed: {event.volunteersNeeded}</p>

            <button style={styles.assignButton}>Assign Volunteers</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// styles
const styles = {
  container: {
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
  },
  createButton: {
    padding: "10px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  assignButton: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Events;
