import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Left Section */}
      <div style={styles.left}>
        <h2 style={styles.logo}>NGO Portal</h2>
      </div>

      {/* Right Section (Links) */}
      <div style={styles.right}>
        <Link to="/admin" style={styles.link}>Admin Dashboard</Link>
        <Link to="/volunteer" style={styles.link}>Volunteer Dashboard</Link>
        <Link to="/volunteers" style={styles.link}>Volunteers</Link>
        <Link to="/events" style={styles.link}>Events</Link>
        <Link to="/announcements" style={styles.link}>Announcements</Link>
        <Link to="/calendar" style={styles.link}>Calendar</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#1a1a1a",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    marginBottom: "20px",
  },
  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    opacity: 0.85,
    transition: "0.2s",
  },
  linkHover: {
    opacity: 1,
  },
};

export default Navbar;
