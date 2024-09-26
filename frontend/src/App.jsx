// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, Route
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar /> {/* Render Sidebar */}
        <Main /> {/* Render Main content */}
      </div>
    </Router>
  );
};

export default App;
