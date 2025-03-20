import React from "react";
import KeyHighlights from "../components/SpermClassificationHighlights";

const SpermTrackClassification = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Unsupervised Sperm Motility Classification
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl text-center">
        This project builds upon the custom{" "}
        <a href="/sperm-track" className="text-blue-600 hover:underline font-semibold">
        sperm detection and tracking project
        </a>{" "}
        by extracting precise cell positions across frames from the BoT-SorT tracking model and applying feature engineering to compute clinically relevant kinematic metrics
         commonly used in computer-assisted sperm analysis (CASA).  
        These metrics provide critical insights into sperm health and fertility, aiding in the diagnosis of infertility.  

        Using bounding box data** from the detection algorithm, we leverage unsupervised learning techniques such as K-Means clustering and hierarchical clustering
        to classify sperm movement into four distinct groups:  
        Hyperactivated, Progressive, Progressive Linear, and Weakly Motile Sperm.  
        This approach enables an objective, automated fertility assessment, reducing human bias and improving clinical efficiency.
    </p>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl">
        {[
          { webm: "/videos/tracks/straightline.webm", mp4: "/videos/tracks/straightline.mp4", text: "Straight Line Motion" },
          { webm: "/videos/tracks/progressive.webm", mp4: "/videos/tracks/progressive.mp4", text: "Progressive Motion" },
          { webm: "/videos/tracks/starspin.webm", mp4: "/videos/tracks/star.mp4", text: "Hyperactivated Motion" }
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
              {/* WebM loads first, MP4 as fallback */}
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
      {/* Key Highlights Section */}
        <KeyHighlights />


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