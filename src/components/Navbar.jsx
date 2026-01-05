import { Link, useNavigate } from "react-router-dom";
import { Globe, LogOut, Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { clearToasts } = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    clearToasts();
    logout();
    navigate("/login");
  };

  const navLinks = [
    {
      label: "Dashboard",
      href: user.role === "admin" ? "/admin" : "/volunteer",
    },
    { label: "Events", href: "/events" },
    { label: "Announcements", href: "/announcements" },
    { label: "Calendar", href: "/calendar" },
    ...(user.role === "admin" ? [{ label: "Volunteers", href: "/volunteers" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 flex-shrink-0">

            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NGO Portal</h1>
              <p className="text-xs text-teal-600 font-medium">
                {user.role === "admin" ? "Administrator" : "Volunteer"}
              </p>
            </div>
          </div >

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user.role !== "admin" && (
              <Link
                to="/profile"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-teal-50 transition-all duration-300 group"
                title="Profile"
              >
                <User className="w-5 h-5 text-gray-700 group-hover:text-teal-600 transition-colors" />
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-teal-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div >

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top-2">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
              {user.role !== "admin" && (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 mt-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div >
    </nav >
  );
};

export default Navbar;
