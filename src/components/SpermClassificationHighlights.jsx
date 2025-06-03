import React from "react";
import { useState } from "react";
import { CheckCircle, RadicalIcon, Shapes } from "lucide-react";
import trackingResults from "/videos/12custom_botsort_compressed.mp4"
import useSpermChartData from '../hooks/useSpermChartData';
import ClusteringChart from './Charts/ClusteringChart';
import TrajectoryViewer from './Charts/TrajectoryViewer';
import SankeyHighlights from './Charts/SankeyHighlights';


const KeyHighlights = () => {
  const { chartData, coordinateData } = useSpermChartData();
  const [hoveredFid, setHoveredFid] = useState(null);

  if (!chartData || !coordinateData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <section
      id="key-highlights"
      className="flex justify-center px-4 sm:px-6 md:px-8 lg:px-12 mt-10 md:mt-16"
    >
      <div className="max-w-8xl w-full bg-skyblue rounded-sm overflow-hidden p-6 sm:p-8 md:p-14">

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-burgundy leading-tight text-center">
          Key Highlights
        </h2>

        <div className="border-b border-burgundy my-6 md:my-8" />

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {/* Card 1: Feature Engineering */}
          <div className="bg-lightblue p-4 sm:p-5 md:p-6 rounded-lg">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <RadicalIcon className="text-orangebright w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              <h3 className="text-lg sm:text-xl font-semibold text-burgundy">
                Feature Engineering & CASA Metrics
              </h3>
            </div>
            <div className="text-burgundy text-sm sm:text-base mt-4 pl-2">
              <p className="mb-4">
                Extracts precise sperm positions from tracking models and computes key kinematic metrics used in CASA.
              </p>
              <video
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={trackingResults} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-lightblue p-4 sm:p-5 md:p-6 rounded-lg">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shapes className="text-orangebright w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              <h3 className="text-lg sm:text-xl font-semibold text-burgundy">
                Classification through Unsupervised Learning
              </h3>
            </div>
            <div className="text-burgundy text-sm sm:text-base mt-3 pl-2">
              <ClusteringChart
                chartData={chartData}
                onHoverFid={setHoveredFid}
                selectedCluster={null}
                className="w-full h-[300px] sm:h-[400px]"
                chartStyle={{
                  textColor: '#481231',
                  showLegend: true,
                  title: '',
                  clusterLabels: {
                    0: 'Hyperactivated',
                    1: 'Progressive',
                    2: 'Weakly Motile',
                  },
                  legendPosition: {
                    x: 0.5,
                    y: -0.2,
                    xanchor: 'center',
                    yanchor: 'top',
                    orientation: 'h',
                  }

                }}
              />
              <div className="mt-6 flex justify-center">
                <TrajectoryViewer
                  fid={hoveredFid}
                  coordinateData={coordinateData}
                />
              </div>
              <p><b>KMeans and hierarchical clustering</b> categorize sperm movement into four groups:</p>
              <ul className="list-disc pl-5 mt-1">
                <li><b>Hyperactivated</b> – High-energy erratic movement</li>
                <li><b>Progressive</b> – Forward, controlled motion</li>
                <li><b>Progressive Linear</b> – Consistent straight path</li>
                <li><b>Weakly Motile</b> – Minimal movement</li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-lightblue p-4 sm:p-5 md:p-6 rounded-lg col-span-full">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CheckCircle className="text-orangebright w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              <h3 className="text-lg sm:text-xl font-semibold text-burgundy">
                Automating Fertility Sample Analysis
              </h3>
            </div>
            <div className="text-burgundy text-sm sm:text-base mt-3 pl-2">
              <SankeyHighlights/>
              
              <p>This project improves fertility diagnostics by:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Using <b>bounding box tracking</b> for precise motion extraction</li>
                <li>Leveraging <b>machine learning</b> for objective sperm classification</li>
                <li>Reducing <b>human bias</b> and increasing efficiency in fertility assessment</li>
              </ul>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default KeyHighlights;
