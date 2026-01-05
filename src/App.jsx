import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Volunteers from "./pages/Volunteers";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";

import { ToastProvider } from "./context/ToastContext";

const App = () => {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbar = location.pathname === "/login";

  return (
    <ToastProvider>
      {!hideNavbar && user && <Navbar />}

      <Routes>
        {/* ROOT LANDING */}
        <Route
          path="/"
          element={
            user
              ? <Navigate to={user.role === "admin" ? "/admin" : "/volunteer"} />
              : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user
              ? <Navigate to={user.role === "admin" ? "/admin" : "/volunteer"} />
              : <Login />
          }
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/volunteer" />
          }
        />

        {/* VOLUNTEER DASHBOARD */}
        <Route
          path="/volunteer"
          element={
            user
              ? <VolunteerDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* SHARED PAGES (ADMIN + VOLUNTEER) */}
        <Route
          path="/events"
          element={user ? <Events /> : <Navigate to="/login" />}
        />

        <Route
          path="/calendar"
          element={user ? <Calendar /> : <Navigate to="/login" />}
        />

        <Route
          path="/announcements"
          element={user ? <Announcements /> : <Navigate to="/login" />}
        />

        {/* ADMIN-ONLY PAGE */}
        <Route
          path="/volunteers"
          element={
            user?.role === "admin"
              ? <Volunteers />
              : <Navigate to="/volunteer" />
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<div style={{ padding: 30 }}>404 Not Found</div>}
        />
      </Routes>
    </ToastProvider>
  );
};

export default App;
