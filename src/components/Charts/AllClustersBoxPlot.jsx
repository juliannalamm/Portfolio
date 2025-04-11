// src/components/Charts/AllClustersBoxPlot.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
    0: '#4fa0f7', // blue
    1: '#481231', // red-orange
    2: '#fe4939'  // green
};

const AllClustersBoxPlot = ({ chartData }) => {
  const metrics = ['VCL', 'VAP', 'VSL', 'LIN', 'WOB', 'STR', 'ALH Max'];
  const clusters = [...new Set(chartData.clusters.map((c) => String(c).trim()))];
  const traces = [];

  metrics.forEach((metric, metricIndex) => {
    clusters.forEach((cluster) => {
      const indices = chartData.clusters
        .map((c, i) => (String(c).trim() === cluster ? i : null))
        .filter((i) => i !== null);

      traces.push({
        y: indices.map((i) => chartData[metric][i]),
        x: Array(indices.length).fill(metric),
        name: `Cluster ${cluster}`,
        type: 'box',
        boxpoints: 'outliers',
        jitter: 0.3,
        pointpos:0,
        marker: { color: clusterColors[cluster] },
        fillcolor: clusterColors[cluster],
        legendgroup: `cluster-${cluster}`,
        showlegend: false, // Show legend only once per cluster
        offsetgroup: cluster,
      });
    });
  });

  return (
    <Plot
      data={traces}
      layout={{
        title: {
          font: { size: 16 },
        },
        margin: { t: 10, b: 10, l: 10, r: 5 },
        xaxis: {
          title: 'Metric',
          type: 'category',
          automargin: true,
        },
        yaxis: {
          title: 'Value',
          automargin: true,
        },
        boxmode: 'group',
        showlegend: true,
        legend: { orientation: 'h', y: -0.3 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      }}
      config={{ responsive: true }}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default AllClustersBoxPlot;