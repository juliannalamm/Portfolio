import React, { useState } from "react";
import trackingResults from "/videos/12custom_botsort_compressed.mp4";
import useSpermChartData from "../hooks/useSpermChartData";
import ClusteringChart from "./Charts/ClusteringChart";
import TrajectoryViewer from "./Charts/TrajectoryViewer";
import SankeyHighlights from "/videos/SankeyHighlights.mp4";

const KeyHighlights = () => {
  const { chartData, coordinateData } = useSpermChartData();
  const [hoveredFid, setHoveredFid] = useState(null);

  if (!chartData || !coordinateData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <section id="key-highlights" className="w-full px-0 mt-8">
      <div className="w-full bg-skyblue p-4 sm:p-5 md:p-6">

        {/* Section Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-burgundy text-center">
          Key Highlights
        </h2>

        <div className="border-b border-burgundy my-3 sm:my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

          {/* Card 1: CASA Metrics */}
          <div className="bg-lightblue p-3 sm:p-4 rounded-md flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-center mb-2">
                <h3 className="text-base font-semibold text-burgundy">
                  Feature Engineering & CASA Metrics
                </h3>
                <p className="text-xs text-burgundy mt-1">
                Extracts precise sperm positions from tracking models and computes key kinematic metrics used in CASA.
              </p>
              </div>
            </div>
              
            <video
                className="w-full max-h-[40vh] object-contain rounded mt-2"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={trackingResults} type="video/mp4" />
              </video>
          </div>

          {/* Card 2: Fertility Automation */}
          <div className="bg-lightblue p-3 sm:p-4 rounded-md flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-center mb-2">
                <h3 className="text-base font-semibold text-burgundy">
                  Automated Sperm Motility Analysis
                </h3>
                <p className="text-xs text-burgundy mt-1">
                  Sperm are automatically classified into hyperactivated, progressive, and weakly motile categories using unsupervised learning techniques.
                </p>
              </div>

            </div>
            <div className="text-burgundy text-xs sm:text-sm max-w-prose">
              <video
                className="w-full max-h-[45vh] object-contain rounded mb-2"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={SankeyHighlights} type="video/mp4" />
              </video>

            </div>
          </div>

          {/* Card 3: Clustering + Trajectory Side-by-Side */}
          <div className="bg-lightblue p-3 sm:p-4 rounded-md col-span-full flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-center mb-2">
                <h3 className="text-base font-semibold text-burgundy">
                  Classification through Unsupervised Learning
                </h3>
                <p className="text-xs text-burgundy mt-1">
                  <b>KMeans and hierarchical clustering</b> categorize sperm into three distinct groups based on kinematic features.
                </p>
              </div>
            </div>
            <div className="text-burgundy text-xs sm:text-sm w-full max-w-6xl">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mt-3">

                {/* Left: ClusteringChart */}
                <div className="w-full sm:w-2/3 max-w-[600px] mx-auto">
                  <ClusteringChart
                    chartData={chartData}
                    onHoverFid={setHoveredFid}
                    selectedCluster={null}
                    className="w-full h-[400px]"
                    chartStyle={{
                      textColor: '#481231',
                      showLegend: true,
                      title: '',
                      clusterLabels: {
                        0: 'Intermediate',
                        1: 'Hyperactivated',
                        2: 'Straight-line Progressive',
                      },
                      legendPosition: {
                        x: 0.5,
                        y: -0.3,
                        xanchor: 'center',
                        yanchor: 'top',
                        orientation: 'h',
                      }
                    }}
                  />
                </div>
                {/* Right: TrajectoryViewer */}
                <div className="mt-10 sm:w-1/3 w-full">
                  <TrajectoryViewer
                    fid={hoveredFid}
                    coordinateData={coordinateData}
                    width={240}
                    height={200}
                  />                
                  </div>
              </div>



            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;
