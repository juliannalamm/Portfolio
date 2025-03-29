// In DashboardChart.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ClusteringChart from './ClusteringChart';


//data loading and rendering
const DashboardClusterChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [averageMetrics, setAverageMetrics] = useState(null);

  useEffect(() => {
    Papa.parse('/data/dashboard_data.csv', {
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
        
        // Extract numeric data and additional fields
        const x = pointsData.map(row => parseFloat(row['PCA Feature 1']));
        const y = pointsData.map(row => parseFloat(row['PCA Feature 2']));
        const clusters = pointsData.map(row => row.Cluster);
        const participant = pointsData.map(row => row.participant);
        const fid = pointsData.map(row => row.fid);
        //Extract metric values 
        const VCL = pointsData.map(row => parseFloat(row.VCL));
        //extract centroid data
        const centX = centroidsData.map(row => parseFloat(row['PCA Feature 1']));
        const centY = centroidsData.map(row => parseFloat(row['PCA Feature 2']));

        setChartData({ x, y, clusters, participant, fid, VCL,centX, centY });
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  // When a cluster is selected, calculate average metrics for that cluster
  useEffect(() => {
    if (chartData && selectedCluster !== null) {
      // Get indices for the selected cluster
      const indices = chartData.clusters
        .map((c, i) => (c === selectedCluster ? i : null))
        .filter(i => i !== null);

      // Helper function to calculate average for an array using the indices
      const calculateAvg = (arr) => {
        const sum = indices.reduce((acc, i) => acc + arr[i], 0);
        return (sum / indices.length).toFixed(2);
      };
      const averages = {
        VCL: calculateAvg(chartData.VCL),
      }
      setAverageMetrics(averages);
    }
  }, [chartData, selectedCluster]);



  if (!chartData) {
    return <div>Loading chart...</div>;
  }
  const uniqueClusters = [...new Set(chartData.clusters)];


  return (
    <section id="chart" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
      <div className='max-w-7xl w-full bg-skyblue rounded-sm overflow-hidden p-10 md:p-14'>
        <h1>Interactive Clustering Dashboard</h1>
        {/* Dropdown for selecting a cluster */}
        <div className="mb-4">
          <label htmlFor="cluster-select" className="mr-2 font-bold">Select Cluster:</label>
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
        <ClusteringChart chartData={chartData} />
      </div>
      {/* Display average metrics if a cluster is selected */}
      {selectedCluster !== null && averageMetrics && (
        <div className="max-w-7xl w-full mt-4 p-4 bg-white border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Average Metrics for Cluster {selectedCluster}</h2>
          <ul className="list-disc pl-6">
            <li>VCL: {averageMetrics.VCL}</li>
            <li>VAP: {averageMetrics.VAP}</li>
            <li>VSL: {averageMetrics.VSL}</li>
            <li>LIN: {averageMetrics.LIN}</li>
            <li>STR: {averageMetrics.STR}</li>
            <li>WOB: {averageMetrics.WOB}</li>
            <li>ALH: {averageMetrics.ALH}</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default DashboardClusterChart;
