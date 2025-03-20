import React from "react";

const SpermTrackClassification = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Unsupervised Sperm Motility Classification
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl text-center">
        This project utilizes uses a variety of techniques including: feature engineering, unsupervised learning techniques such as K-Means clustering 
        and hierarchical clustering, 
        to classify sperm motility based on extracted trajectory features. The system enables 
        objective sperm classification, reducing human bias and increasing efficiency.
      </p>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl">
        {[
          { webm: "/videos/tracks/straightline.webm", mp4: "/videos/tracks/straightline.mp4", text: "Straight Line Motion" },
          { webm: "/videos/tracks/progressive.webm", mp4: "/videos/tracks/progressive.mp4", text: "Progressive Motion" },
          { webm: "/videos/tracks/starspin.webm", MP4: "/videos/tracks/starspin.mp4", text: "Hyperactivated Motion" }
        ].map((video, index) => (
          <div key={index} className="relative group w-full h-[300px] bg-black overflow-hidden rounded-lg shadow-lg">
            {/* Video */}
            <video
              className="w-full h-full object-cover bg-black"
              style={{ backgroundColor: "black", display: "block" }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Hover Overlay with Text */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <p className="text-white text-lg font-bold">{video.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Images/Figures */}
      <div className="mt-10">
        <img 
          src="/images/kmeans.png" 
          alt="K-Means Clustering" 
          className="rounded-lg shadow-lg w-full max-w-xl"
        />
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <a 
          href="/" 
          className="text-blue-500 hover:underline text-lg"
        >
          ← Back to Home
        </a>
      </div>
    </section>
  );
};

export default SpermTrackClassification;