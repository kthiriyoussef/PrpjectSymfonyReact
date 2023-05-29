import React, { useState, useEffect } from "react";
import QuestionsPage from "./Todo";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in from previous session
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = () => {
    // Perform authentication logic here (e.g., API call, validation)

    // For simplicity, let's assume the correct credentials are "admin" for both username and password
    if (username === "admin" && password === "admin") {
      setLoggedIn(true);
      setErrorMessage("");
      localStorage.setItem("username", username);
    } else {
      setLoggedIn(false);
      setErrorMessage("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("username");
  };

  const aa = async () => {
    navigate("/signup");
  };

  if (isLoggedIn) {
    return (
      <div>
        <Navbar />

        <h1 className="text-center mt-8 text-2xl">Welcome, {username}!</h1>

        <QuestionsPage />
        <button
          onClick={handleLogout}
          className="fixed bottom-0 left-0 mb-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border border-gray-300 rounded-md py-2 px-4 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border border-gray-300 rounded-md py-2 px-4 mb-2"
      />
      {errorMessage ? (
        <button
          onClick={aa}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Authentication;
