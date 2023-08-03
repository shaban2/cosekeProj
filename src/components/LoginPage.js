import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://192.168.18.5:9091/mwe/auth/login?password=${encodeURIComponent(
          password
        )}&user_name=${encodeURIComponent(userName)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log("Login Successful! Token:", token);
        // You can handle storing the token and redirecting the user here
        navigate(`/table/${token}`);
        setLoginError("");
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
