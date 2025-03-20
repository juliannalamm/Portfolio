import React, { useRef, useState, useEffect } from "react";

const SpermHero = () => {
  const videoRefs = useRef([]);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

  useEffect(() => {
    // Try to autoplay videos programmatically.
    const playVideos = async () => {
      try {
        await Promise.all(
          videoRefs.current.map((video) => video && video.play())
        );
      } catch (error) {
        console.error("Autoplay was blocked", error);
        setIsAutoplayBlocked(true);
      }
    };

    playVideos();
  }, []);

  const handleUserPlay = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch((error) => {
          console.error("Playback failed on user gesture:", error);
        });
      }
    });
    setIsAutoplayBlocked(false);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center px-0 overflow-hidden">
      
      {/* Video Background - Full Screen */}
      <div className="absolute inset-0 flex">
        {[
          { mp4: "/videos/tracks/straightline.mp4" },
          { mp4: "/videos/tracks/progressive.mp4" },
          { mp4: "/videos/tracks/starspin.mp4" }
        ].map((video, index) => (
          <div key={index} className="w-1/3 h-full bg-black overflow-hidden">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover bg-black"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
            >
              <source src={video.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content (Over Videos) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-6">
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-md">
            Delivering sperm motility analysis <br /> 
            from research to clinical impact
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl">
            Unlock the power of AI-driven sperm tracking and classification. Our research transforms raw motion data into 
            insights for clinical diagnostics and assisted reproduction.
          </p>
          <a
            href="/sperm-classification"
            className="mt-8 inline-block bg-white text-gray-900 font-semibold text-lg py-3 px-6 rounded-full hover:bg-gray-200 transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Overlay for User Interaction if Autoplay is Blocked */}
      {isAutoplayBlocked && (
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