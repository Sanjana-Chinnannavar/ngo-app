import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
