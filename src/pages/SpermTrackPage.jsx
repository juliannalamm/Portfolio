import React from "react";
import SpermTrack from "../components/SpermTrack";
import { Link } from "react-router-dom";

const SpermTrackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SpermTrack />
      <Link to="/" className="mt-6 text-blue-500 hover:underline">← Back to Home</Link>
    </div>
  );
};

export default SpermTrackPage;