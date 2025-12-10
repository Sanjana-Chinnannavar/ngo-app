import { Link } from "react-router-dom";
//import "./Navbar.css"; // optional if you want to style later

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>NGO Volunteer System</h2>
      </div>

      <div className="nav-right">
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/volunteer">Volunteer Dashboard</Link>
        <Link to="/volunteers">Volunteers</Link>
        <Link to="/events">Events</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/calendar">Calendar</Link>
      </div>
    </nav>
  );
}
