import React from 'react';
import Plot from 'react-plotly.js';

const MetricBoxPlot = ({ chartData, selectedCluster }) => {
  if (!chartData) return <div>Loading metrics...</div>;
  
  // Determine which indices to include:
  // If no cluster is selected, use all indices; otherwise, only the ones matching the selected cluster.
  const indices = selectedCluster !== null && selectedCluster !== ""
    ? chartData.clusters
        .map((c, i) => (c === selectedCluster ? i : null))
        .filter(i => i !== null)
    : chartData.clusters.map((_, i) => i);

  // For each metric, get only the values for the indices
  // Make sure chartData includes these keys.
  const metrics = {
    VCL: indices.map(i => chartData.VCL[i]),
    VAP: indices.map(i => chartData.VAP[i]),
    VSL: indices.map(i => chartData.VSL[i]),
    LIN: indices.map(i => chartData.LIN[i]),
    WOB: indices.map(i => chartData.WOB[i]),
    STR: indices.map(i => chartData.STR[i]),
    "ALH Mean": indices.map(i => chartData["ALH Mean"][i]),
    "ALH Max": indices.map(i => chartData["ALH Max"][i]),
  };

  // Create a trace for each metric
  const traces = Object.keys(metrics).map(metricKey => ({
    y: metrics[metricKey],
    name: metricKey,
    type: 'box',
    boxpoints: 'all',  // show all points within the box
    jitter: 0.3,
    pointpos: -1.8,
  }));

  return (
    <Plot
      data={traces}
      layout={{
        title: `Metric Distributions ${selectedCluster ? `for Cluster ${selectedCluster}` : ''}`,
        xaxis: { title: 'Metrics' },
        yaxis: { title: 'Value' },
        boxmode: 'group',  // group boxes together
        height: 400,
      }}
      config={{ responsive: true }}
    />
  );
};

export default MetricBoxPlot;
