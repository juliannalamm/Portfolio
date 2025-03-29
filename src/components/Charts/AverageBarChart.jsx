import React from 'react';
import Plot from 'react-plotly.js';

const AverageBarChart = ({ averageMetrics, selectedCluster }) => {
  return (
    <Plot
      data={[
        {
          x: ['VCL'], // X axis: metric name(s)
          y: [parseFloat(averageMetrics.VCL)], // Y axis: average value
          type: 'bar',
          marker: { color: '#481231' },
        },
      ]}
      layout={{
        title: `Average VCL for Cluster ${selectedCluster}`,
        xaxis: { title: 'Metric' },
        yaxis: { title: 'Average Value' },
        width: 400,
        height: 300,
      }}
    />
  );
};

export default AverageBarChart;
