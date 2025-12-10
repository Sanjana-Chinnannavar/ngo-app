import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold tracking-wide">NGO Portal</h2>

      <div className="flex gap-6 text-sm font-medium">
        <Link className="hover:text-gray-300" to="/admin">Admin</Link>
        <Link className="hover:text-gray-300" to="/volunteer">Volunteer</Link>
        <Link className="hover:text-gray-300" to="/volunteers">Volunteers</Link>
        <Link className="hover:text-gray-300" to="/events">Events</Link>
        <Link className="hover:text-gray-300" to="/announcements">Announcements</Link>
        <Link className="hover:text-gray-300" to="/calendar">Calendar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
