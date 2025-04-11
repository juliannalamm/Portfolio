import React, { useState, useEffect, use } from 'react';
import Papa from 'papaparse';
import ClusteringChart from './ClusteringChart';
import TrajectoryViewer from './TrajectoryViewer';
import MetricBoxPlot from './MetricBoxPlot';


const DashboardClusterChart = () => {
  const [chartData, setChartData] = useState(null);
  const [hoveredFid, setHoveredFid] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [averageMetrics, setAverageMetrics] = useState(null);
  const [coordinateData, setCoordinateData] = useState(null);


  useEffect(() => {
    Papa.parse('/data/subkmeans_w_metadata.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const pointsData = data.filter(row => {
          const val = row.Centroid ? row.Centroid.toString().trim().toLowerCase() : "";
          return val === "false" || val === "";
        });
        const centroidsData = data.filter(row => {
          const val = row.Centroid ? row.Centroid.toString().trim().toLowerCase() : "";
          return val === "true";
        });

        const x = pointsData.map(row => parseFloat(row['PCA Feature 1']));
        const y = pointsData.map(row => parseFloat(row['PCA Feature 2']));
        const clusters = pointsData.map(row => row.Subcluster);
        const participant = pointsData.map(row => row.participant);
        const fid = pointsData.map(row => row.fid);
        const VCL = pointsData.map(row => parseFloat(row.VCL));
        const VSL = pointsData.map(row => parseFloat(row.VSL));
        const VAP = pointsData.map(row => parseFloat(row.VAP));
        const LIN = pointsData.map(row => parseFloat(row.LIN));
        const WOB = pointsData.map(row => parseFloat(row.WOB));
        const STR = pointsData.map(row => parseFloat(row.STR));
        const ALH_Mean = pointsData.map(row => parseFloat(row["ALH Mean"]));
        const ALH_Max = pointsData.map(row => parseFloat(row["ALH Max"]));
        const centX = centroidsData.map(row => parseFloat(row['PCA Feature 1']));
        const centY = centroidsData.map(row => parseFloat(row['PCA Feature 2']));

        setChartData({ x, y, clusters, participant, fid, centX, centY, VCL, VSL, VAP, LIN, WOB, STR,   "ALH Mean": ALH_Mean,
        "ALH Max": ALH_Max });
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  //load coordintate data (trajectories)
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
    })
  }, []);

  useEffect(() => {
    if (chartData && selectedCluster !== null) {
      const indices = chartData.clusters
        .map((c, i) => (c === selectedCluster ? i : null))
        .filter(i => i !== null);

      const calculateAvg = (arr) => {
        const sum = indices.reduce((acc, i) => acc + arr[i], 0);
        return (sum / indices.length).toFixed(2);
      };

      const averages = {
        VCL: calculateAvg(chartData.VCL),
      };
      setAverageMetrics(averages);
    }
  }, [chartData, selectedCluster]);

  if (!chartData || !coordinateData) {
    return <div>Loading chart...</div>;
  }
  const uniqueClusters = [...new Set(chartData.clusters)];

  return (
    <div>
      {/* Dropdown for selecting a cluster */}
      <div className="mb-4">
        <label htmlFor="cluster-select" className="mr-2 font-bold">
          Select Cluster:
        </label>
        <select
          id="cluster-select"
          value={selectedCluster || ""}
          onChange={(e) => setSelectedCluster(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="" disabled>Select a cluster</option>
          {uniqueClusters.map(cluster => (
            <option key={cluster} value={cluster}>
              Cluster {cluster}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-6">
        {/* Cluster chart + trajectory viewer side by side on large screens */}
        <div className="flex flex-col lg:flex-row bg-transparent gap-6">
          <div className="lg:w-2/3 w-full">
            <ClusteringChart
              chartData={chartData}
              onHoverFid={setHoveredFid}
              selectedCluster={selectedCluster}
              coordinateData={coordinateData}
            />
          </div>

          <div className="lg:w-1/3 w-full max-w-[300px] ml-4 flex flex-col space-y-4">
            <TrajectoryViewer
              fid={hoveredFid}
              coordinateData={coordinateData}
            />
            {/* Average bar chart below both */}
            {selectedCluster !== null && averageMetrics && (
              <MetricBoxPlot
                chartData={chartData}
                selectedCluster={selectedCluster} />

            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardClusterChart;
