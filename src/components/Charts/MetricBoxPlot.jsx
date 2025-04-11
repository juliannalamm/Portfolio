import { memo } from 'react';
import Plot from 'react-plotly.js';

const MetricBoxPlot = ({ chartData, selectedCluster }) => {
  if (!chartData) return <div>Loading metrics...</div>;

  // Determine which indices to include
  const indices = (selectedCluster && selectedCluster !== "")
    ? chartData.clusters
        .map((c, i) => (String(c).trim() === String(selectedCluster).trim() ? i : null))
        .filter(i => i !== null)
    : chartData.clusters.map((_, i) => i);

  const metrics = {
    VCL: indices.map(i => chartData.VCL[i]),
    VAP: indices.map(i => chartData.VAP[i]),
    VSL: indices.map(i => chartData.VSL[i]),
    LIN: indices.map(i => chartData.LIN[i]),
    WOB: indices.map(i => chartData.WOB[i]),
    STR: indices.map(i => chartData.STR[i]),
    "ALH Max": indices.map(i => chartData["ALH Max"][i]),
  };

  const traces = Object.keys(metrics).map(metricKey => ({
    y: metrics[metricKey],
    name: metricKey,
    type: 'box',
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: -1.8,
    fillcolor: 'rgba(200, 200, 200, 0.5)',
  }));

  return (
    <Plot
      data={traces}
      layout={{
        title: {
          text: `Metric Distributions${selectedCluster ? ` for Cluster ${selectedCluster}` : ''}`,
          font: { size: 16 },
          pad: { b: 10 }
        },
        margin: {
          t: 30,
          b: 40,
          l: 40,
          r: 20
        },
        xaxis: {
          title: 'Metrics',
          tickangle: -45,
          automargin: true
        },
        yaxis: {
          title: 'Value',
          automargin: true
        },
        boxmode: 'group',
        showlegend: false
      }}
      config={{ responsive: true }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
};

// Custom comparison function for memo
function areEqual(prevProps, nextProps) {
  const sameCluster = prevProps.selectedCluster === nextProps.selectedCluster;

  const prevData = prevProps.chartData;
  const nextData = nextProps.chartData;

  const dataStable = prevData && nextData && prevData.fid.length === nextData.fid.length;

  return sameCluster && dataStable;
}

export default memo(MetricBoxPlot, areEqual);
