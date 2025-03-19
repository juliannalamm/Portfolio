import React, { useRef, useEffect } from "react";

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; //  Adjust playback speed (e.g., 0.5x for slow motion)
    }
  }, []);
  const handleScrollToSpermTrack = () => {
    const section = document.getElementById("sperm-track-card");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center text-center text-white">
      {/* Video Background */}
      <video 
        ref={videoRef} // attach ref to the video
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/videos/12_compressed.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-xl space-y-6 px-">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Sperm Tracking & Detection Using YOLO
        </h1>
        <p className="text-xl md:text-2xl font-light">
          
        </p>

        {/* CTA Button */}
        
        <div className="flex justify-center">
          <button 
            onClick={handleScrollToSpermTrack} 
            className="flex items-center justify-between px-8 py-3 border-2 border-white rounded-full text-white font-bold text-lg transition duration-300 hover:bg-white hover:text-gray-900"
          >
            <span className="tracking-wide">LEARN MORE</span>
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
              ➝
            </span>
          </button>
        </div>
      </div>
    </section>
     
  );
};

export default HeroSection;