import Plot from 'react-plotly.js';

const ClusteringChartMobile = ({ chartData, onClickFid }) => {
  const clusterColors = {
    0: '#4fa0f7',  // Intermediate
    1: '#E9A752',  // Hyperactivated
    2: '#fe4939',  // Straight Line
  };

  const clusterLabels = {
    0: 'Intermediate',
    1: 'Hyperactivated',
    2: 'Straight Line',
  };

  const traces = [0, 1, 2].map(cluster => {
    const indices = chartData.clusters
      .map((c, i) => (String(c) === String(cluster) ? i : null))
      .filter(i => i !== null);

    return {
      name: clusterLabels[cluster], // ← custom label
      x: indices.map(i => chartData.x[i]),
      y: indices.map(i => chartData.y[i]),
      customdata: indices.map(i => chartData.fid[i]),
      text: indices.map(i => `FID: ${chartData.fid[i]}`),
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 8,
        color: clusterColors[cluster],
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
        width: 300,
        height: 400,
        margin: { l: 5, r: 30, t: 20, b: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          font: { color: 'black', size: 10 },
          orientation: 'h',
          x: 0,
          y: -0.2
        },
        xaxis: { visible: false, fixedrange: true },
        yaxis: { visible: false, fixedrange: true, scaleanchor: 'x' },
      }}
      config={{ displayModeBar: false }}
      onClick={handleClick}
    />
  );
};

export default ClusteringChartMobile;
