import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#481231',
  2: '#fe4939',
  3: '#ffb347',
  4: '#6a0dad'
};

const AllClustersFertilityBoxPlot = ({ chartData }) => {
  const metrics = [
    'Sperm concentration (x10⁶/mL)',
    'Total sperm count (x10⁶)',
    'Ejaculate volume (mL)',
    'Sperm vitality (%)',
    'Normal spermatozoa (%)',
    'Head defects (%)',
    'Midpiece and neck defects (%)',
    'Tail defects (%)',
    'Cytoplasmic droplet (%)',
    'Teratozoospermia index',
    'Progressive motility (%)',
    'Non progressive sperm motility (%)',
    'Immotile sperm (%)',
    'High DNA stainability, HDS (%)',
    'DNA fragmentation index, DFI (%)'
  ];

  const clusters = [...new Set(chartData.clusters.map((c) => String(c).trim()))];
  const traces = [];

  metrics.forEach(metric => {
    clusters.forEach(cluster => {
      const indices = chartData.clusters
        .map((c, i) => (String(c).trim() === cluster ? i : null))
        .filter(i => i !== null);

      traces.push({
        y: indices.map(i => chartData[metric]?.[i]),
        x: Array(indices.length).fill(metric),
        name: `Cluster ${cluster}`,
        type: 'box',
        boxpoints: 'outliers',
        jitter: 0.3,
        pointpos: 0,
        marker: { color: clusterColors[cluster] || '#ccc' },
        fillcolor: clusterColors[cluster] || '#ccc',
        legendgroup: `cluster-${cluster}`,
        showlegend: false,
        offsetgroup: cluster,
      });
    });
  });

  return (
    <Plot
      data={traces}
      layout={{
        title: {
          text: 'Fertility Metrics by Cluster',
          font: { size: 16 },
        },
        margin: { t: 30, b: 60, l: 40, r: 10 },
        xaxis: {
          title: 'Metric',
          type: 'category',
          tickangle: -45,
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

export default AllClustersFertilityBoxPlot;
