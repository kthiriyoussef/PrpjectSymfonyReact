import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homee from "./Home";
import Question from "./Question";
import Authentication from "./Authentication";
import SignupPage from "./signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Authentication />} />

      <Route path="/home" element={<App />} />

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Home/:id" element={<Homee />} />
      <Route path="/Question/:questionId" element={<Question />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
