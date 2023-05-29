import React, { useState } from "react";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    // Perform signup logic here (e.g., API call, validation)

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Store the new user information (For simplicity, we are using localStorage here)
    const newUser = {
      username,
      password,
    };

    localStorage.setItem("users", JSON.stringify(newUser));
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    alert("Signup successful!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="border border-gray-300 rounded-md py-2 px-4 mb-2"
      />
      <button
        onClick={handleSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Signup
      </button>
    </div>
  );
};

export default SignupPage;
