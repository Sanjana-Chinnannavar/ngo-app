import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginRequest } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMsg("");

      const res = await loginRequest(email, password, role);
      // backend returns: { token, user }

      login(res.token, res.user);

      if (res.user.role === "admin") navigate("/admin");
      else navigate("/volunteer");
    } catch (err) {
      setErrorMsg("Invalid credentials");
    }
  };

  // 🔹 ROLE SELECTION SCREEN
  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-6">Select Role</h2>

          <button
            onClick={() => setRole("admin")}
            className="w-full mb-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Admin Login
          </button>

          <button
            onClick={() => setRole("volunteer")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Volunteer Login
          </button>
        </div>
      </div>
    );
  }

  // 🔹 LOGIN FORM
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          {role.toUpperCase()} Login
        </h2>

        {errorMsg && (
          <p className="text-red-500 mb-3 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <input
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-lg mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
