import { memo } from 'react';
import Plot from 'react-plotly.js';


const MetricBoxPlot = memo(({ chartData, selectedCluster }) => {
  if (!chartData) return <div>Loading metrics...</div>;

  const clusterLabels = [...new Set(chartData.clusters.map(c => String(c).trim()))];

  const metricsKeys = ['VCL', 'VAP', 'VSL', 'LIN', 'WOB', 'STR', 'ALH Max'];

  const traces = [];

  if (selectedCluster !== null && selectedCluster !== "") {
    // Filter for selected cluster
    const indices = chartData.clusters
      .map((c, i) => (String(c).trim() === String(selectedCluster).trim() ? i : null))
      .filter(i => i !== null);

    metricsKeys.forEach(metric => {
      traces.push({
        y: indices.map(i => chartData[metric][i]),
        name: metric,
        type: 'box',
        boxpoints: 'outliers',
        jitter: -1,
        pointpos: 0,
        fillcolor: 'rgba(200, 200, 200)',
      });
    });
  } else {
    // All clusters: one trace per cluster per metric
    clusterLabels.forEach(cluster => {
      const indices = chartData.clusters
        .map((c, i) => (String(c).trim() === cluster ? i : null))
        .filter(i => i !== null);

      metricsKeys.forEach(metric => {
        traces.push({
          y: indices.map(i => chartData[metric][i]),
          name: `Cluster ${cluster} - ${metric}`,
          type: 'box',
          boxpoints: 'outliers',
          jitter: 0,
          pointpos: 0,
          fillcolor: 'rgba(200, 200, 200)',
        });
      });
    });
  }

  return (
    <Plot
      data={traces}
      layout={{
        title: {
          font: { size: 16 },
        },
        margin: { t: 20, b: 10, l: 30, r: 10 },
        xaxis: {
          title: selectedCluster ? 'Metrics' : 'Cluster-Metric',
          tickangle: -45,
          automargin: true,
        },
        yaxis: {
          title: 'Value',
          automargin: true,
        },
        boxmode: 'group',
        showlegend: false,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      }}
      config={{ responsive: true }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
});

export default MetricBoxPlot;
