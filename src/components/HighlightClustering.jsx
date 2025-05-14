// components/HighlightFeatureEngineering.jsx
import { Shapes } from "lucide-react";

import { RadicalIcon } from "lucide-react";

const HighlightClustering = () => (
  <div className="bg-lightblue p-6 rounded-lg">
   <div className="bg-lightblue p-4 sm:p-5 md:p-6 rounded-lg">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shapes className="text-orangebright w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              <h3 className="text-lg sm:text-xl font-semibold text-burgundy">
                Classification through Unsupervised Learning
              </h3>
            </div>
            <div className="text-burgundy text-sm sm:text-base mt-3 pl-2">
              <p><b>KMeans and hierarchical clustering</b> categorize sperm movement into four groups:</p>
              <ul className="list-disc pl-5 mt-1">
                <li><b>Hyperactivated</b> – High-energy erratic movement</li>
                <li><b>Progressive</b> – Forward, controlled motion</li>
                <li><b>Progressive Linear</b> – Consistent straight path</li>
                <li><b>Weakly Motile</b> – Minimal movement</li>
              </ul>
            </div>
          </div>
  </div>
);

export default HighlightClustering;
