import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ClusteringChart from './ClusteringChart';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

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
        
        const x = pointsData.map(row => parseFloat(row['PCA Feature 1']));
        const y = pointsData.map(row => parseFloat(row['PCA Feature 2']));
        const clusters = pointsData.map(row => row.Cluster);
        const centX = centroidsData.map(row => parseFloat(row['PCA Feature 1']));
        const centY = centroidsData.map(row => parseFloat(row['PCA Feature 2']));

        setChartData({ x, y, clusters, centX, centY });
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <section id="chart" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
    <div className='max-w-7xl w-full bg-skyblue rounded-sm overflow-hidden p-10 md:p-14'>
      <h1>Interactive Clustering Dashboard</h1>
      <ClusteringChart chartData={chartData} />
    </div>
    </section>
  );
};

export default Dashboard;
