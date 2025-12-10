import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <Link to="/admin" style={{ marginRight: "15px", color: "white" }}>
        Admin
      </Link>
      <Link to="/volunteer" style={{ marginRight: "15px", color: "white" }}>
        Volunteer
      </Link>
      <Link to="/volunteers" style={{ marginRight: "15px", color: "white" }}>
        Volunteers
      </Link>
      <Link to="/events" style={{ marginRight: "15px", color: "white" }}>
        Events
      </Link>
      <Link to="/announcements" style={{ marginRight: "15px", color: "white" }}>
        Announcements
      </Link>
      <Link to="/calendar" style={{ color: "white" }}>
        Calendar
      </Link>
    </nav>
  );
};

export default Navbar;
