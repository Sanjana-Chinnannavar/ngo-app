import { Link } from "react-router-dom";

const Navbar = () => {
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
      <h2 className="text-2xl font-semibold tracking-tight">
        NGO Portal
      </h2>

      <div className="flex gap-6 text-sm font-medium tracking-wide">
        {[
          ["Admin", "/admin"],
          ["Volunteer", "/volunteer"],
          ["Volunteers", "/volunteers"],
          ["Events", "/events"],
          ["Announcements", "/announcements"],
          ["Calendar", "/calendar"],
        ].map(([label, url]) => (
          <Link
            key={url}
            to={url}
            className="
              hover:text-[#C9A86A] 
              transition-colors 
            "
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
