const Volunteers = () => {
  const mockVolunteers = [
    { name: "Alex Johnson", skills: "First Aid", availability: "Weekends" },
    { name: "Sanjana Chinnanavar", skills: "Teaching", availability: "Weekdays" },
    { name: "Riya Sharma", skills: "Event Management", availability: "Flexible" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Volunteers</h1>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Skills</th>
            <th style={styles.th}>Availability</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {mockVolunteers.map((v, index) => (
            <tr key={index} style={styles.row}>
              <td style={styles.td}>{v.name}</td>
              <td style={styles.td}>{v.skills}</td>
              <td style={styles.td}>{v.availability}</td>
              <td style={styles.td}>
                <button style={styles.editBtn}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// basic inline styles
const styles = {
  container: {
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "#f0f0f0",
  },
  th: {
    padding: "12px",
    borderBottom: "1px solid #ccc",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  row: {
    background: "white",
  },
  editBtn: {
    padding: "6px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Volunteers;
