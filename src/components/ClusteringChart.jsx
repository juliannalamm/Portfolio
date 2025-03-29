import React from 'react';
import Plot from 'react-plotly.js';

const ClusteringChart = ({ chartData }) => {
  return (
    <Plot
      data={[
        {
          x: chartData.x,
          y: chartData.y,
          mode: 'markers',
          type: 'scatter',
          marker: {
            size: 10,
            color: chartData.clusters, // Colors the points based on cluster IDs
            colorscale: 'Viridis',
            showscale: true,
          },
          name: 'Individual Sperm',
        },
        {
          x: chartData.centX,
          y: chartData.centY,
          mode: 'markers',
          type: 'scatter',
          marker: {
            symbol: 'x',
            size: 16,
            color: 'red',
          },
          name: 'Centroids',
        },
      ]}
      layout={{
        title: 'K-means Clustering with 2D PCA',
        xaxis: { title: 'PCA Feature 1' },
        yaxis: { title: 'PCA Feature 2' },
        width: 800,
        height: 600,
      }}
    />
  );
};

export default ClusteringChart;
