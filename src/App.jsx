import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Volunteers from "./pages/Volunteers";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import Calendar from "./pages/Calendar";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="*" element={<div style={{ padding: 30 }}>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
