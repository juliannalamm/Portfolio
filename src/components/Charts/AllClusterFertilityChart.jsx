import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#481231',
  2: '#fe4939',
  3: '#ffb347',

};

const AllClustersFertilityBarChartNormalized = ({ chartData }) => {
  const metrics = [
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

  // Step 1: Compute global min-max for each metric
  const metricMinMax = {};
  metrics.forEach(metric => {
    const values = chartData[metric]?.filter(v => typeof v === 'number' && !isNaN(v));
    const min = Math.min(...values);
    const max = Math.max(...values);
    metricMinMax[metric] = { min, max };
  });

  const clusters = [...new Set(chartData.clusters.map((c) => String(c).trim()))];
  const traces = [];

  clusters.forEach(cluster => {
    const indices = chartData.clusters
      .map((c, i) => (String(c).trim() === cluster ? i : null))
      .filter(i => i !== null);

    const normalizedMeans = metrics.map(metric => {
      const { min, max } = metricMinMax[metric];
      const values = indices.map(i => {
        const raw = chartData[metric][i];
        return typeof raw === 'number' && !isNaN(raw)
          ? (raw - min) / (max - min)
          : null;
      });

      const valid = values.filter(v => typeof v === 'number' && !isNaN(v));
      const mean = valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : null;
      return mean;
    });

    traces.push({
      x: metrics,
      y: normalizedMeans,
      type: 'bar',
      name: `Cluster ${cluster}`,
      marker: { color: clusterColors[cluster] || '#ccc' }
    });
  });

  return (
    <Plot
      data={traces}
      layout={{
        barmode: 'group',
        title: {
          text: 'Normalized Fertility Metrics by Cluster',
          font: { size: 16 },
        },
        margin: { t: 30, b: 100, l: 40, r: 10 },
        xaxis: {
          title: 'Metric',
          type: 'category',
          tickangle: -45,
          automargin: true,
        },
        yaxis: {
          title: 'Normalized Mean (0–1)',
          range: [0, 1],
          automargin: true,
        },
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

export default AllClustersFertilityBarChartNormalized;
