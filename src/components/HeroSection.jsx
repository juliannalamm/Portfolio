import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/compressed_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl space-y-6 px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Julianna Lamm
        </h1>
        <p className="text-xl md:text-2xl font-light">
          Machine Learning Researcher | Biochemistry & AI Enthusiast
        </p>

        {/* CTA Button */}
        <a
          href="#projects"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-lg transition"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;