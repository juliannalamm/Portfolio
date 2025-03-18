import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SpermTrackPage from "./pages/SpermTrackPage";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sperm-track" element={<SpermTrackPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;