import { useState } from "react";
import { Shapes } from "lucide-react";
import ClusterMobile from "./ClusterMobile"; // your interactive component

const HighlightClustering = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="bg-lightblue p-6 rounded-lg">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
        <Shapes className="text-orangebright w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        <h3 className="text-lg sm:text-xl font-semibold text-burgundy">
          Classification through Unsupervised Learning
        </h3>
      </div>

      <div className="text-burgundy text-sm sm:text-base pl-1 mb-4">
        <p><b>KMeans and hierarchical clustering</b> categorize sperm movement into four groups:</p>
        <ul className="list-disc pl-5 mt-1">
          <li><b>Hyperactivated</b> – High-energy erratic movement</li>
          <li><b>Intermediate Progressive</b> – Forward, moderate, controlled motion</li>
          <li><b> Straight-line</b> – Consistent straight path</li>
        </ul>
      </div>

      {!showChart && (
        <button
          onClick={() => setShowChart(true)}
          className="mt-4 text-orangebright underline underline-offset-4 font-semibold"
        >
          ▶️ See example clustering visualization
        </button>
      )}

      {showChart && (
        <div className="mt-6">
          <ClusterMobile />
        </div>
      )}
    </div>
  );
};

export default HighlightClustering;
