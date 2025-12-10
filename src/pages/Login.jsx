const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

        <input
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-200"
          placeholder="Email"
        />

        <input
          className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-200"
          type="password"
          placeholder="Password"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
