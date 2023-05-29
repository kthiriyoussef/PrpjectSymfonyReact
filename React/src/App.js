import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Test from "./testapi";
import { Routes, Route } from "react-router-dom";

import To from "./Todo";
import Homee from "./Home";
import { New } from "./New";
import QuestionsPage from "./Todo";

function App() {
  return (
    <div className="App">
      <Navbar />

      <QuestionsPage />
    </div>
  );
}

export default App;
