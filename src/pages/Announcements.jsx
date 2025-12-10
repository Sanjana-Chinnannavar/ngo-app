import { useState } from "react";

const Announcements = () => {
  const [input, setInput] = useState("");

  const mockAnnouncements = [
    "Meeting at 5 PM today.",
    "Submit your availability form.",
    "New event added: Clothing Drive.",
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Announcements</h1>

      {/* Create announcement */}
      <div style={styles.createBox}>
        <input
          style={styles.input}
          placeholder="Write a new announcement..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={styles.postButton}>Post</button>
      </div>

      {/* Announcement list */}
      <ul style={styles.list}>
        {mockAnnouncements.map((msg, i) => (
          <li key={i} style={styles.item}>
            {msg}
          </li>
        ))}
      </ul>
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
  createBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  postButton: {
    padding: "10px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: {
    paddingLeft: "20px",
  },
  item: {
    marginBottom: "10px",
    padding: "10px",
    background: "white",
    borderRadius: "6px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
};

export default Announcements;
