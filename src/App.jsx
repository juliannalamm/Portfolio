import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; // <--- add this
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SpermTrackPage from "./pages/SpermTrackPage";
import SpermTrackClassification from "./pages/SpermClassificationPage";
import Resume from "./pages/Resume";
import ContactMe from "./pages/ContactMe";
import { useLocation } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <div className="bg-lightblue min-h-screen overflow-visible relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sperm-track" element={<SpermTrackPage />} />
          <Route path="/projects/sperm-classification" element={<SpermTrackClassification />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<ContactMe />} />


        </Routes>
      </div>
      <Analytics />
    </Router>
  );
};

export default App;