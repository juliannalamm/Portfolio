import { useState } from "react";
import { RadicalIcon } from "lucide-react";

const HighlightFE = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-lightblue p-6 rounded-lg">
      <div className="flex items-center space-x-3">
        <RadicalIcon className="text-orangebright w-8 h-8" />
        <h3 className="text-lg font-semibold text-burgundy">Feature Engineering & CASA Metrics</h3>
      </div>

      <div className="text-burgundy text-sm mt-3 pl-2">
        <p>
          Extracts precise sperm positions and computes kinematic metrics to describe sperm movement.
        </p>
        <p className="mt-2 font-semibold">Metrics include:</p>
        <ul className="list-disc pl-5 mt-1">
          <li><b>VCL</b> (Curvilinear Velocity)</li>
          <li><b>VSL</b> (Straight-Line Velocity)</li>
          <li><b>ALH</b> (Amplitude of Lateral Head Displacement)</li>
        </ul>

        {!showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="mt-4 text-orangebright underline underline-offset-4 font-semibold"
          >
            ▶️ See example plotted trajectories
          </button>
        )}

        {showVideo && (
          <div className="mt-4 rounded overflow-hidden shadow-md">
            <video
              src="/videos/SpermTrajectories.mp4"
              controls
              className="w-full rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightFE;
