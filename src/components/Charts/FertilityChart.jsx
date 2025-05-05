import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#E9A752',
  2: '#fe4939'
};

const clusterLabels = {
  0: 'Cluster 0 - Intermediate',
  1: 'Cluster 1 - Hyperactivated',
  2: 'Cluster 2 - Straight-Line Progressive'
};

const fertilityMetrics = [
  'Sperm vitality (%)',
  'Normal spermatozoa (%)',
  'Head defects (%)',
  'Midpiece and neck defects (%)',
  'Tail defects (%)',
  'Progressive motility (%)',
  'Non progressive sperm motility (%)',
  'Immotile sperm (%)',
  'DNA fragmentation index, DFI (%)'
];

const FertilityChart = ({ chartData, normalization = 'zscore' }) => {
  const uniqueClusterLabels = Array.from(new Set(chartData.clusters.map(c => String(c).trim()))); // create new array from our clusters but convert to set to remove duploicates
  const data = [];

  // Precompute global stats for normalization
  const stats = {};
  fertilityMetrics.forEach(metric => {
    const spermMetricValues = chartData[metric];

    let sum = 0;
    let squareDiff = 0;
    let min = Infinity;
    let max = -Infinity;
    // calc mean
    for (let i = 0; i < spermMetricValues.length; i++) {
      const val = spermMetricValues[i];

      sum += val;

      if (val < min) min = val;
      if (val > max) max = val;
    }
    const mean = sum / spermMetricValues.length;
    // calc sum of square difference 
    for (let i = 0; i < spermMetricValues.length; i++) {
      const val = spermMetricValues[i];
      squareDiff += Math.pow(val - mean, 2)
    }

    const std = Math.sqrt(squareDiff / spermMetricValues.length);

    stats[metric] = { mean, std, min, max };
  });

  // Build data for each cluster
  uniqueClusterLabels.forEach(clusterId => {
    const spermIndicesInCluster = chartData.clusters
      .map((c, i) => (String(c).trim() === clusterId ? i : null))
      .filter(i => i !== null);

    const normalizedClusterMeans = [];

    for (let m = 0; m < fertilityMetrics.length; m++) {
      const metric = fertilityMetrics[m];
      const { mean, std, min, max } = stats[metric];

      let clusterMetricTotal = 0;

      for (let j = 0; j < spermIndicesInCluster.length; j++) {
        const value = chartData[metric][spermIndicesInCluster[j]];
        let normalized;

        if (normalization === 'zscore') {
          normalized = std !== 0 ? (value - mean) / std : 0;
        } else if (normalization === 'minmax') {
          normalized = (max - min !== 0) ? (value - min) / (max - min) : 0.5;
        } else {
          normalized = value;
        }

        clusterMetricTotal += normalized;
      }

      const clusterMetricAverage = clusterMetricTotal / spermIndicesInCluster.length;
      normalizedClusterMeans.push(clusterMetricAverage);
    }

    data.push({
      x: fertilityMetrics,
      y: normalizedClusterMeans,
      type: 'bar',
      name: clusterLabels[clusterId] || `Cluster ${clusterId}`,
      marker: { color: clusterColors[clusterId] || '#ccc' }
    });
  });

  return (
    <div className="w-full h-full">
      <Plot
        data={data}
        layout={{
          barmode: 'group',
          font: {
            family: 'AtlasBold, sans-serif',
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
            title: 'Fertility Metric',
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
