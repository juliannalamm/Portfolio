import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ClusteringChart from './ClusteringChart';
import TrajectoryViewer from './TrajectoryViewer';
import MetricBoxPlot from './MetricBoxPlot';
import AllClustersBoxPlot from './AllClustersBoxPlot';
import useSpermChartData from '../../hooks/useSpermChartData';

const DashboardClusterChart = () => {
  const { chartData, coordinateData } = useSpermChartData(); // use the shared hook
  const [hoveredFid, setHoveredFid] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);

  if (!chartData || !coordinateData) {
    return <div className="text-white">Loading chart…</div>;
  }

  const uniqueClusters = Array.from(new Set(chartData.clusters.map(String)));

  return (
   
    <div className="px-8 flex flex-col space-y-3">
      
      {/* Top row */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 justify-center items-center">
      <div className="w-full lg:w-1/2 h-[400px]">
          <ClusteringChart
            chartData={chartData}
            onHoverFid={setHoveredFid}
            selectedCluster={selectedCluster}
          />
        </div>
        <div className="w-full lg:w-1/3 h-[400px] flex justify-center items-center">
          <TrajectoryViewer
            fid={hoveredFid}
            coordinateData={coordinateData}
          />
        </div>
      </div>

      {/* Bottom row*/}
      <div>
        <label htmlFor="cluster-select" className="mr-2 font-bold text-white">
          Select Cluster:
        </label>
        <select
          id="cluster-select"
          value={selectedCluster ?? "ALL"}
          onChange={e => {
            const v = e.target.value;
            setSelectedCluster(v === "ALL" ? null : v);
          }}
          className="p-2 border border-white bg-black/50 text-white rounded"
        >
          <option value="ALL">All Clusters</option>
          {uniqueClusters.map(c => (
            <option key={c} value={c}>Cluster {c}</option>
          ))}
        </select>
      </div>
      
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl h-[400px]">
          {selectedCluster != null
            ? (
              <MetricBoxPlot
                key={`metric-box-${selectedCluster}`}
                chartData={chartData}
                selectedCluster={selectedCluster}
              />
            )
            : (
              <AllClustersBoxPlot chartData={chartData} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardClusterChart;