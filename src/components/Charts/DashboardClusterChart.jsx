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

  // parsing 
  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const pointsData = data.filter(row => row.Centroid === "False"); // filter out centroid points


        setChartData({
          x:    pointsData.map(row => parseFloat(row['PCA Feature 1'])),
          y:    pointsData.map(row => parseFloat(row['PCA Feature 2'])),
          clusters: pointsData.map(row => row.Subcluster || ""),
          participant: pointsData.map(row => row.participant),
          fid:         pointsData.map(row => row.fid),
          VCL:  pointsData.map(row => parseFloat(row.VCL)),
          VSL:  pointsData.map(row => parseFloat(row.VSL)),
          VAP:  pointsData.map(row => parseFloat(row.VAP)),
          LIN:  pointsData.map(row => parseFloat(row.LIN)),
          WOB:  pointsData.map(row => parseFloat(row.WOB)),
          STR:  pointsData.map(row => parseFloat(row.STR)),
          "ALH Max": pointsData.map(row => parseFloat(row["ALH Max"]))
        });
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  // only get coordinate data 
  useEffect(() => {
    Papa.parse('/data/subclustered_bb.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        setCoordinateData({
          fid: data.map(row => row.fid),
          bb0: data.map(row => parseFloat(row.bb0)),
          bb1: data.map(row => parseFloat(row.bb1))
        });
      },
      error: (err) => console.error("Error parsing coordinated data:", err)
    });
  }, []);

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