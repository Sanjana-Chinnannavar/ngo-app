import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null | {name, role}

  const login = (email, password) => {
    // TEMP DEMO LOGIN — Replace later
    if (email === "admin@ngo.org" && password === "admin123") {
      setUser({ name: "Admin User", role: "admin" });
      return true;
    }
    if (email === "volunteer@ngo.org" && password === "vol123") {
      setUser({ name: "Volunteer User", role: "volunteer" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
