import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav 
      className="
        bg-[#2A4D69] 
        text-[#F7F9FB] 
        px-8 py-4 
        shadow-md 
        flex justify-between items-center
        border-b border-[#4B86B4]
        font-grotesk
      "
    >
      {/* LEFT: TITLE + ROLE */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          NGO Portal
        </h2>
        <p className="text-sm text-[#C9A86A] tracking-wide">
          Logged in as: <span className="uppercase">{user.role}</span>
        </p>
      </div>

      {/* CENTER: LINKS */}
      <div className="flex gap-6 text-base font-medium tracking-wide">
        {/* DASHBOARD */}
        <Link
          to={user.role === "admin" ? "/admin" : "/volunteer"}
          className="hover:text-[#C9A86A] transition-colors"
        >
          Dashboard
        </Link>

        {/* SHARED LINKS */}
        <Link to="/events" className="hover:text-[#C9A86A] transition-colors">
          Events
        </Link>

        <Link to="/announcements" className="hover:text-[#C9A86A] transition-colors">
          Announcements
        </Link>

        <Link to="/calendar" className="hover:text-[#C9A86A] transition-colors">
          Calendar
        </Link>

        {/* ADMIN-ONLY */}
        {user.role === "admin" && (
          <Link
            to="/volunteers"
            className="hover:text-[#C9A86A] transition-colors"
          >
            Volunteers
          </Link>
        )}
      </div>

      {/* RIGHT: LOGOUT */}
      <button
        onClick={handleLogout}
        className="
          bg-[#C94C4C] 
          px-4 py-2 
          rounded 
          hover:bg-[#B13E3E]
          transition-colors
          font-medium
        "
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
