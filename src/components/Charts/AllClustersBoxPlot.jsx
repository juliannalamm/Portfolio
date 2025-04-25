// src/components/Charts/AllClustersBoxPlot.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7', // blue
  1: '#E9a752', // red-orange
  2: '#fe4939'  // green
};

const AllClustersBoxPlot = ({ chartData }) => {
  const metrics = ['VCL', 'VAP', 'VSL', 'LIN', 'WOB', 'STR', 'ALH Max'];
  const clusters = Array.from(new Set(
    chartData.clusters.map(c => String(c).trim())
  ));
  const traces = [];

  clusters.forEach(cluster => {
    // indices of this cluster
    const idxs = chartData.clusters
      .map((c,i) => String(c).trim() === cluster ? i : null)
      .filter(i => i !== null);

    metrics.forEach(metric => {
      // extract & sort values
      const values = idxs
        .map(i => chartData[metric][i])
        .filter(v => v != null)
        .sort((a,b) => a - b);

      // compute min, median, max
      const min    = values[0];
      const max    = values[values.length-1];
      const median = values[Math.floor((values.length-1)/2)];

      traces.push({
        y: values,
        x: Array(values.length).fill(metric),
        name: `Cluster ${cluster}`,
        type: 'box',
        boxpoints: 'outliers',
        jitter: 0.3,
        pointpos: 0,
        marker: { color: clusterColors[cluster] },
        fillcolor: clusterColors[cluster],
        legendgroup: `cluster-${cluster}`,
        showlegend: metric === metrics[0],
        offsetgroup: cluster,
        hoveron: 'boxes+points',

        // —— CUSTOM HOVER ——
        customdata: Array(values.length).fill([min, median, max]),
        hovertemplate:
          'Metric: %{x}<br>' +
          'Min: %{customdata[0]}<br>' +
          'Median: %{customdata[1]}<br>' +
          'Max: %{customdata[2]}<extra></extra>',
      });
    });
  });

  return (
    <Plot
      data={traces}
      layout={{
        font: {
          family: 'TiemposTextBold, sans-serif',
          color: 'white',
        },
        title: {
          text: 'All Clusters: Metric Distributions',
          font: { size: 18, color: 'white' },
        },
        margin: { t: 40, b: 80, l: 50, r: 20 },
        xaxis: {
          title: {
            text: 'Kinematic Metric',
            font: {
              family: 'TiemposTextBold, sans-serif',
              color: 'white',
            },
          },
          type: 'category',
          tickangle: -45,
          tickfont: { color: 'white' },
          automargin: true,
          showgrid: false,
          showline: true,
          linecolor: 'white',
        },
        yaxis: {
          title: {
            text: 'Value',
            font: {
              family: 'TiemposTextBold, sans-serif',
              color: 'white',
            },
          },
          automargin: true,
          tickfont: { color: 'white' },
          showgrid: false,
          showline: true,
          linecolor: 'white',
        },
        boxmode: 'group',
        showlegend: true,
        legend: {
          orientation: 'h',
          x: 0.4, y: 0.9,
          font: { color: 'white' },
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      }}
      config={{ responsive: true, displayModeBar: false }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default AllClustersBoxPlot;
