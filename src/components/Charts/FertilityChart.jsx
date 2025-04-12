import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#481231',
  2: '#fe4939',
  3: '#ffb347',
  4: '#6a0dad'
};

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

const FertilityChart = ({ chartData, normalization = 'zscore' }) => {
  const clusters = [...new Set(chartData.clusters.map((c) => String(c).trim()))];
  const traces = [];

  // Global stats
  const metricStats = {};
  metrics.forEach(metric => {
    const values = chartData[metric]?.filter(v => typeof v === 'number' && !isNaN(v));
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length);
    const min = Math.min(...values);
    const max = Math.max(...values);
    metricStats[metric] = { mean, std, min, max };
  });

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
      name: `Cluster ${cluster}`,
      marker: { color: clusterColors[cluster] || '#ccc' }
    });
  });

  return (

      <div className="w-full h-full">
        <Plot
          data={traces}
          layout={{
            barmode: 'group',
            title: {
              text: `${normalization === 'zscore' ? 'Z-Score' : 'Min-Max'} Normalized Fertility Metrics by Cluster`,
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
              title: normalization === 'zscore' ? 'Average Z-Score' : 'Normalized Mean (0–1)',
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
      </div>
  );
};

export default FertilityChart;
