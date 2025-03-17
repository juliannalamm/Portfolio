import React, { useRef } from "react";
import ProjectGrid from "./components/ProjectGrid";
import SpermTrack from "./components/SpermTrack";
import Navbar from "./components/Navbar";  // Import Navbar

const App = () => {
  const spermTrackSectionRef = useRef(null);

  const handleScrollToSection = (link) => {
    if (link === "#sperm-track-section" && spermTrackSectionRef.current) {
      spermTrackSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ✅ Navbar now takes up space & pushes content down */}
      <Navbar />

      {/* No more pt-20 needed */}
      <div className="px-6 md:px-10 lg:px-16">
        
        {/* Bio Section */}
        <section className="section-spacing flex justify-center mt-10">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full text-center">
            <img
              src="/images/Julianna.jpg"
              alt="Julianna Lamm"
              className="w-64 h-64 rounded-full mx-auto mb-6 shadow-lg object-cover object-top aspect-square"
            />

            {/* Bio Content */}
            <div className="mt-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Julianna Lamm</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hi! Nice to meet you, and welcome to my portfolio. I’m a machine learning researcher 
                with a background in biochemistry, AI, and data science. My work spans diverse fields, 
                from computer vision-based sperm cell detection and tracking to developing a price gouging 
                detection web application aimed at mitigating rental spikes during natural disasters. 
                Despite the variety, my projects share a common thread—leveraging data-driven solutions 
                to tackle socially impactful challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Project Grid Section */}
        <div className="section-spacing mt-10">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
            My Projects
          </h2>
          <ProjectGrid onImageClick={handleScrollToSection} />
        </div>

        {/* 🌟 Sperm Tracking Section */}
        <div ref={spermTrackSectionRef} className="mt-10">
          <SpermTrack />
        </div>
      </div>
    </div>
  );
};

export default App;