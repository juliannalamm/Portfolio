import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SpermTrackPage from "./pages/SpermTrackPage";
import SpermTrackClassification from "./pages/SpermClassificationPage";

const App = () => {
  return (
    <Router>
      <div className="bg-lightblue min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sperm-track" element={<SpermTrackPage/>} />
          <Route path="/projects/sperm-classification" element={<SpermTrackClassification />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;