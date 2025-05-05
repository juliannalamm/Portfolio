import { memo } from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#E9a752',
  2: '#fe4939'
};

const metricKeys = ['VCL', 'VAP', 'VSL', 'LIN', 'WOB', 'STR', 'ALH Max'];

const MetricBoxPlot = memo(({ chartData, selectedCluster }) => {
  if (!chartData) return <div>Loading metrics...</div>;

  const clusters = Array.from(new Set(chartData.clusters.map(c => String(c).trim())));
  const data = [];

  const addBox = (clusterId) => {
    const indices = chartData.clusters
      .map((c, i) => String(c).trim() === String(clusterId) ? i : null)
      .filter(i => i !== null);

    metricKeys.forEach(metric => {
      data.push({
        x: Array(indices.length).fill(metric),
        y: indices.map(i => chartData[metric][i]),
        name: `Cluster ${clusterId}`,
        type: 'box',
        boxpoints: 'outliers',
        jitter: 0.3,
        pointpos: 0,
        marker: { color: clusterColors[clusterId] },
        fillcolor: clusterColors[clusterId],
        legendgroup: `cluster-${clusterId}`,
        showlegend: metric === metricKeys[0],
        offsetgroup: clusterId,
      });
    });
  };

  if (selectedCluster !== null && selectedCluster !== '') {
    addBox(selectedCluster);
  } else {
    clusters.forEach(addBox);
  }

  return (
    <Plot
      data={data}
      layout={{
        title: {
          text: selectedCluster
            ? `Cluster ${selectedCluster}: Metric Distributions`
            : 'All Clusters: Metric Distributions',
          font: { size: 18, color: 'white' }
        },
        font: {
          family: 'TiemposTextBold, sans-serif',
          color: 'white'
        },
        margin: { t: 40, b: 80, l: 50, r: 20 },
        xaxis: {
          title: 'Kinematic Metric',
          type: 'category',
          tickangle: -45,
          automargin: true,
          showgrid: false,
          showline: true,
          linecolor: 'white',
          tickfont: { color: 'white' }
        },
        yaxis: {
          title: {
            text: 'VCL, VSL, VAP in µm/s; others unitless',
            font: {
              color: 'white',
              family: 'AtlasBold, sans-serif'
            },
          },
          automargin: true,
          showgrid: false,
          showline: true,
          linecolor: 'white',
          tickfont: { color: 'white' }
        },
        boxmode: 'group',
        showlegend: true,
        legend: {
          orientation: 'h',
          x: 0.4,
          y: 0.9,
          font: { color: 'white' }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }}
      config={{ responsive: true, displayModeBar: false }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
    />
  );
});

export default MetricBoxPlot;
