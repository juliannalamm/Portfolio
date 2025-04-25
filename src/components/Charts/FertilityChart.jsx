import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7', // blue
  1: '#E9A752', // red‑orange
  2: '#fe4939'  // green
};

const clusterLabels = {
  0: 'Cluster 0 - Intermediate',
  1: 'Cluster 1 - Hyperactivated',
  2: 'Cluster 2 - Straight-Line Progressive'
};

const metrics = [
  'Sperm vitality (%)',
  'Normal spermatozoa (%)',
  'Head defects (%)',
  'Midpiece and neck defects (%)',
  'Tail defects (%)',
  'Progressive motility (%)',
  'Non progressive sperm motility (%)',
  'Immotile sperm (%)',
  'High DNA stainability, HDS (%)',
  'DNA fragmentation index, DFI (%)'
];

const FertilityChart = ({ chartData, normalization = 'zscore' }) => {
  const clusters = [...new Set(chartData.clusters.map((c) => String(c).trim()))];
  const traces = [];

  // Compute global statistics for normalization
  const metricStats = {};
  metrics.forEach(metric => {
    const values = chartData[metric]?.filter(v => typeof v === 'number' && !isNaN(v));
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length);
    const min = Math.min(...values);
    const max = Math.max(...values);
    metricStats[metric] = { mean, std, min, max };
  });

  // Create bar traces per cluster
  clusters.forEach(cluster => {
    const indices = chartData.clusters
      .map((c, i) => (String(c).trim() === cluster ? i : null))
      .filter(i => i !== null);

    const processedValues = metrics.map(metric => {
      const { mean, std, min, max } = metricStats[metric];
      const values = indices.map(i => {
        const raw = chartData[metric][i];
        if (typeof raw !== 'number' || isNaN(raw)) return null;

        if (normalization === 'zscore') {
          return std !== 0 ? (raw - mean) / std : 0;
        } else if (normalization === 'minmax') {
          return (max - min) !== 0 ? (raw - min) / (max - min) : 0.5;
        }
        return raw;
      });

      const valid = values.filter(v => typeof v === 'number');
      return valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
    });

    traces.push({
      x: metrics,
      y: processedValues,
      type: 'bar',
      name: clusterLabels[cluster] || `Cluster ${cluster}`,
      marker: { color: clusterColors[cluster] || '#ccc' }
    });
  });

  return (
    <div className="w-full h-full">
      <Plot
        data={traces}
        layout={{
          barmode: 'group',
          font: {
            family: 'TiemposTextBold, sans-serif',
            color: '#481231',
          },
          title: {
            text: 'Fertility Metrics by Cluster',
            font: { size: 18, color: '#481231' },
            x: 0.5,
            xanchor: 'center'
          },
          margin: { t: 140, b: 100, l: 70, r: 10 },
          xaxis: {
            title: 'Metric',
            type: 'category',
            tickangle: -45,
            automargin: true,
          },
          yaxis: {
            title: {
              text: normalization === 'zscore' ? 'Average Z-Score' : 'Normalized Mean (0–1)',
              standoff: 10,
            },
            automargin: true,
          },
          showlegend: true,
          legend: { orientation: 'h', y: 1.15 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        }}
        config={{ responsive: true }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default FertilityChart;
