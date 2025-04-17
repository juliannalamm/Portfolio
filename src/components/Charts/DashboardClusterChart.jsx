import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ClusteringChart from './ClusteringChart';
import TrajectoryViewer from './TrajectoryViewer';
import MetricBoxPlot from './MetricBoxPlot';
import AllClustersBoxPlot from './AllClustersBoxPlot';

const DashboardClusterChart = () => {
  const [chartData, setChartData] = useState(null);
  const [hoveredFid, setHoveredFid] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [coordinateData, setCoordinateData] = useState(null);

  // Parse clustering CSV data
  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const pointsData = data.filter(row => {
          const val = row.Centroid ? row.Centroid.toString().trim().toLowerCase() : "";
          return val === "false" || val === "";
        });

        const x = pointsData.map(row => parseFloat(row['PCA Feature 1']));
        const y = pointsData.map(row => parseFloat(row['PCA Feature 2']));
        const clusters = pointsData.map(row => row.Subcluster ? row.Subcluster.trim() : "");
        const participant = pointsData.map(row => row.participant);
        const fid = pointsData.map(row => row.fid);
        const VCL = pointsData.map(row => parseFloat(row.VCL));
        const VSL = pointsData.map(row => parseFloat(row.VSL));
        const VAP = pointsData.map(row => parseFloat(row.VAP));
        const LIN = pointsData.map(row => parseFloat(row.LIN));
        const WOB = pointsData.map(row => parseFloat(row.WOB));
        const STR = pointsData.map(row => parseFloat(row.STR));
        const ALH_Max = pointsData.map(row => parseFloat(row["ALH Max"]));

        setChartData({
          x, y, clusters, participant, fid,
          VCL, VSL, VAP, LIN, WOB, STR,
          "ALH Max": ALH_Max
        });
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  // Parse the trajectory (coordinate) data
  useEffect(() => {
    Papa.parse('/data/subclustered_bb.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const fid = data.map(row => row.fid);
        const bb0 = data.map(row => parseFloat(row.bb0));
        const bb1 = data.map(row => parseFloat(row.bb1));
        setCoordinateData({ fid, bb0, bb1 });
      },
      error: (err) => console.error("Error parsing coordinated data:", err)
    });
  }, []);

  if (!chartData || !coordinateData) {
    return <div>Loading chart...</div>;
  }

  const uniqueClusters = [...new Set(chartData.clusters.map(c => String(c).trim()))];

  return (
    <div>
      {/* Dropdown for selecting a cluster */}
      <div className=" mb-4">
        <label htmlFor="cluster-select" className="mr-2 font-bold text-white">
          Select Cluster:
        </label>
        <select
          id="cluster-select"
          value={selectedCluster || ""}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCluster(value === "ALL" ? null : value.trim());
          }}
          className=" p-2 border border-white bg-black bg-opacity-50 text-white rounded"
        >
          <option value="ALL">All Clusters</option>
          {uniqueClusters.map(cluster => (
            <option key={cluster} value={cluster}>
              Cluster {cluster}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-6">
        {/* Cluster chart and trajectory viewer */}
        <div className="flex flex-col lg:flex-row bg-transparent gap-6">
          
          <div className=" mt-40 lg:w-1/2 w-full">
            <ClusteringChart
              chartData={chartData}
              onHoverFid={setHoveredFid}
              selectedCluster={selectedCluster}
              coordinateData={coordinateData}
            />
          </div>

          <div className="lg:w-1/2 w-full max-w-[600px] ml-4 flex flex-col items-center space-y-20">
            <TrajectoryViewer
              fid={hoveredFid}
              coordinateData={coordinateData}
            />
            {selectedCluster !== null ? (
              <MetricBoxPlot
                key={`metric-box-${selectedCluster}`}
                chartData={chartData}
                selectedCluster={selectedCluster}
              />
            ) : (
              <AllClustersBoxPlot chartData={chartData} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardClusterChart;
