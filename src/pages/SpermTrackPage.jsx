import React, { useState, useEffect } from "react";
import SpermTrack from "../components/SpermTrack";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SpermTrackIntro from "../components/SpermTrackIntro";
import SpermTrackMethods from "../components/SpermTrackMethods";
import SpermTrackResults from "../components/SpermTrackResults";
import SpermTrackAnalysis from "../components/SpermTrackAnalysis";

const sections = [
  { id: "sperm-track-intro", label: "Introduction" },
  { id: "sperm-track-methods", label: "Methods" },
  { id: "sperm-track-results", label: "Results" },
  { id: "sperm-track-analysis", label: "Analysis" },
];

const SpermTrackPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [showTOC, setShowTOC] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero-section")?.offsetHeight || 0;
      setShowTOC(window.scrollY > heroHeight);

      let currentSection = "";
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative">
      {/* Hero Section - Full Width */}
      <div id="hero-section" className="w-full">
        <HeroSection />
      </div>

      {/* Sidebar TOC (Only Appears After Hero Section) */}
      {showTOC && (
        <div className="hidden md:flex flex-col fixed left-6 top-24 text-burgundy">
          <h2 className="text-lg font-semibold text-burgundy mb-2">Table of Contents</h2>
          <ul className="space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`text-gray-700 hover:text-blue-500 transition ${
                    activeSection === id ? "underline font-semibold text-blue-600" : ""
                  }`}
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div id="sperm-track-intro" className="max-w-7xl w-full"><SpermTrackIntro /></div>
        <div id="sperm-track-methods" className="max-w-7xl w-full"><SpermTrackMethods /></div>
        <div id="sperm-track-results" className="max-w-7xl w-full"><SpermTrackResults /></div>
        <div id="sperm-track-analysis" className="max-w-7xl w-full"><SpermTrackAnalysis /></div>
        <Link to="/" className="mt-6 text-blue-500 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
};

export default SpermTrackPage;