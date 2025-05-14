import Plot from 'react-plotly.js';

const ClusteringChartMobile = ({ chartData, onClickFid }) => {
  const clusterColors = {
    0: '#4fa0f7',
    1: '#E9A752',
    2: '#fe4939',
  };

  const uniqueClusters = [...new Set(chartData.clusters)];

  const traces = uniqueClusters.map(cluster => {
    const indices = chartData.clusters
      .map((c, i) => (String(c) === String(cluster) ? i : null))
      .filter(i => i !== null);

    return {
      x: indices.map(i => chartData.x[i]),
      y: indices.map(i => chartData.y[i]),
      customdata: indices.map(i => chartData.fid[i]),
      text: indices.map(i => `FID: ${chartData.fid[i]}`),
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 8,
        color: clusterColors[cluster] || 'gray',
      },
      hovertemplate: '%{text}<extra></extra>',
    };
  });

  const handleClick = (e) => {
    if (e?.points?.[0]?.customdata) {
      onClickFid(e.points[0].customdata);
    }
  };

  return (
    <Plot
      data={traces}
      layout={{
        width: 320,
        height: 280,
        margin: { l: 20, r: 20, t: 40, b: 40 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { visible: false, fixedrange: true },
        yaxis: { visible: false, fixedrange: true, scaleanchor: 'x' },
      }}
      config={{ displayModeBar: false }}
      onClick={handleClick}
    />
  );
};

export default ClusteringChartMobile;
