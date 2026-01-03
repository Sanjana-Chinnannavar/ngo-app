import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginRequest } from "../api/auth";
import { Shield, Heart, ArrowLeft, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setErrorMsg("");
      setIsLoading(true);

      const res = await loginRequest(email, password, role);

      login(res.token, res.user);

      if (res.user.role === "admin") navigate("/admin");
      else navigate("/volunteer");
    } catch (err) {
      setErrorMsg("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen flex">
        <div className="w-1/2 bg-gradient-to-br from-teal-600 to-teal-700 p-12 flex flex-col justify-between text-white">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-8 transform hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Revolution Minds</h1>
            <p className="text-teal-50 text-lg mb-12">Empowering communities through collective action and sustainable change</p>

            <div className="space-y-8">
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Admin Control</h3>
                  <p className="text-teal-50 text-sm">Manage operations and oversee all programs</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Community Focus</h3>
                  <p className="text-teal-50 text-sm">Work together with thousands of volunteers</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Transparency</h3>
                  <p className="text-teal-50 text-sm">Track impact and see real-time progress</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-teal-50 text-sm">© 2024 Revolution Minds. Making a difference together.</p>
        </div>

        <div className="w-1/2 bg-white flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-8">Select your role to continue</p>

            <div className="space-y-3">
              <button
                onClick={() => setRole("admin")}
                className="w-full group bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-between"
              >
                <span className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  Admin Portal
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => setRole("volunteer")}
                className="w-full group bg-white border-2 border-teal-600 text-teal-600 py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-teal-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-between"
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  Volunteer Portal
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Need help?{" "}
              <a href="mailto:support@revolutionminds.org" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-teal-600 to-teal-700 p-12 flex flex-col justify-between text-white">
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-8 transform hover:scale-110 transition-transform duration-300">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Revolution Minds</h1>
          <p className="text-teal-50 text-lg mb-12">Empowering communities through collective action and sustainable change</p>

          <div className="space-y-8">
            <div className="flex gap-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Admin Control</h3>
                <p className="text-teal-50 text-sm">Manage operations and oversee all programs</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Community Focus</h3>
                <p className="text-teal-50 text-sm">Work together with thousands of volunteers</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Transparency</h3>
                <p className="text-teal-50 text-sm">Track impact and see real-time progress</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-teal-50 text-sm">© 2024 Revolution Minds. Making a difference together.</p>
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => setRole(null)}
            className="mb-6 flex items-center text-gray-600 hover:text-teal-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to role selection
          </button>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg mb-4">
              {role === "admin" ? (
                <Shield className="w-7 h-7 text-white" />
              ) : (
                <Heart className="w-7 h-7 text-white" fill="white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {role === "admin" ? "Admin Login" : "Volunteer Login"}
            </h2>
            <p className="text-gray-600">
              {role === "admin"
                ? "Access your administrative dashboard"
                : "Continue your volunteering journey"}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center font-medium">
                {errorMsg}
              </p>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all duration-200 placeholder-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <p className="text-center text-gray-500 text-xs mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
