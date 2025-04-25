import React, { useRef, useEffect, useState } from "react";

const SpermHero = () => {
  const videoRefs = useRef([]);
  const [isSafari, setIsSafari] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

  useEffect(() => {
    // Detect if the browser is Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsSafari(userAgent.includes("safari") && !userAgent.includes("chrome"));

    // Try to autoplay videos programmatically
    const playVideos = async () => {
      try {
        await Promise.all(videoRefs.current.map((video) => video?.play()));
      } catch (error) {
        if (isSafari) {
          console.error("Autoplay blocked in Safari:", error);
          setIsAutoplayBlocked(true);
        }
      }
    };

    playVideos();
  }, [isSafari]);

  const handleUserPlay = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch((error) => console.error("Playback failed on user gesture:", error));
      }
    });
    setIsAutoplayBlocked(false);
  };
  const handleScrollToHighlights = () => {
    const section = document.getElementById("key-highlights");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center px-0 overflow-hidden">
      
      {/* Video Background - Full Screen, No Gaps */}
      <div className="absolute inset-0 flex w-full h-full bg-black">
        {[
          { mp4: "/videos/tracks/straightline.mp4", objectPosition: "center" },  
          { mp4: "/videos/tracks/progressive.mp4", objectPosition: "center" },
          { mp4: "/videos/tracks/starspin.mp4", objectPosition: "40% center" },
        ].map((video, index) => (
          <div key={index} className="flex-1 h-full bg-black">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover bg-black"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              style={{ objectPosition: video.objectPosition }}
            >
              <source src={video.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content (Lowered for Visibility) */}
      <div className="absolute bottom-12 left-8 text-left text-white z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          The Hidden Male Biological Clock: A Data-Driven Story <br /> 
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Unsupervised Learning and classification transforms 
          raw motion data into insights for clinical diagnostics and assisted reproduction.
        </p>
        <div className="text-left">
        <button 
            onClick={handleScrollToHighlights} 
            className="mt-8 inline-block px-6 py-3 border-2 border-orangebright bg-orangebright rounded-full text-white font-bold text-lg transition duration-300 hover:border-white hover:bg-white hover:text-black "
        >
            <span className="tracking-wide">LEARN MORE</span>
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
            ➝
            </span>
        </button>
        </div>
      </div>

      {/* Overlay for User Interaction (Only in Safari) */}
      {isSafari && isAutoplayBlocked && (
        <div 
          onClick={handleUserPlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 cursor-pointer"
        >
          <span className="text-white text-2xl font-semibold">Tap to Play</span>
        </div>
      )}

    </section>
  );
};

export default SpermHero;