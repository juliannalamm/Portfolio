import React, { useRef, useEffect } from "react";

const MethodsHero = () => {
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
    <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
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
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-xl space-y-6 px-">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            The Dataset 
        </h1>
        <p className="text-xl md:text-2xl font-light">
          
        </p>
   
      </div>
    </section>
     
  );
};

export default MethodsHero;