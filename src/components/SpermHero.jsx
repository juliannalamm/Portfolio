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
          Automated Sperm Motility Classification <br /> 
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Unsupervised Learning and classification transforms 
          raw motion data into insights for clinical diagnostics and assisted reproduction.
        </p>
        <a
          href="/sperm-classification"
          className="mt-6 inline-block bg-white text-gray-900 font-semibold text-lg py-3 px-6 rounded-full hover:bg-gray-200 transition"
        >
          Learn More
        </a>
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