import React from "react";
import SpermTrack from "../components/SpermTrack";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import SpermTrackIntro from "../components/SpermTrackIntro";

const SpermTrackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <HeroSection />
      <SpermTrackIntro/>
      <SpermTrack />
      <Link to="/" className="mt-6 text-blue-500 hover:underline">← Back to Home</Link>
    </div>
  );
};

export default SpermTrackPage;