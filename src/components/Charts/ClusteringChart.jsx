import React from 'react';
import Plot from 'react-plotly.js';

const ClusteringChart = ({
  chartData,
  onHoverFid,
  selectedCluster,
  chartStyle = {},
  className = "",
  style = {}
}) => {
  // Merge chartStyle with defaults
  const {
    bg = 'rgba(0,0,0,0)',
    textColor = 'white',
    markerColors = {
      0: '#4fa0f7',  // blue
      1: '#E9A752',  // beeswax orange
      2: '#fe4939',  // red
    },
    clusterLabels = {
        0: 'Cluster 0',
        1: 'Cluster 1',
        2: 'Cluster 2',
      },
    showLegend = true,
    legendPosition = null, 
    title = 'K-means Clustering with 2D PCA',
  } = chartStyle;

  const uniqueClusters = [...new Set(chartData.clusters)];

  // Filter cluster points if selected
  const filteredClusters = selectedCluster !== null && selectedCluster !== ""
    ? [selectedCluster]
    : uniqueClusters;

  const clusterTraces = filteredClusters.map(cluster => {
    const indices = chartData.clusters
      .map((c, i) => (String(c).trim() === String(cluster).trim() ? i : null))
      .filter(i => i !== null);

    const x = indices.map(i => chartData.x[i]);
    const y = indices.map(i => chartData.y[i]);
    const hoverText = indices.map(i =>
      `Cluster ${cluster}<br>Participant: ${chartData.participant[i]}<br>FID: ${chartData.fid[i]}`
    );
    const customdata = indices.map(i => chartData.fid[i]);

    return {
      x,
      y,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 10,
        color: markerColors[cluster] || 'gray',
      },
      name: clusterLabels[cluster] || `Cluster ${cluster}`,
      text: hoverText,
      customdata,
      hovertemplate: '%{text}<br><extra></extra>',
    };
  });

  const centroidsTrace = {
    x: chartData.centX,
    y: chartData.centY,
    mode: 'markers',
    type: 'scatter',
    marker: {
      symbol: 'x',
      size: 16,
      color: 'red',
    },
    name: 'Centroids',
  };

  const handleHover = (event) => {
    if (event?.points?.[0]?.customdata) {
      onHoverFid(event.points[0].customdata);
    }
  };

  const handleUnhover = () => {
    onHoverFid(null);
  };

  const dataTraces = [...clusterTraces, centroidsTrace];

  return (
    <div className={`relative ${className}`} style={style}>
      <Plot
        key={filteredClusters.join('-')}  // <- this is the fix

        data={dataTraces}
        layout={{
          autosize: true,
          title: {
            text: title,
            font: {
              size: 18,
              color: textColor,
              family: 'AtlasBold, sans-serif'
            },
            x: 0.4,
            xanchor: 'center'
          },
          xaxis: {
            title: {
              text: 'PCA Feature 1',
              font: {
                color: textColor,
                family: 'AtlasBold, sans-serif'
              }
            },
            showticklabels: false,
            ticks: '',
            showgrid: false,
            zeroline: true,
            zerolinecolor: textColor,
          },
          yaxis: {
            title: {
              text: 'PCA Feature 2',
              font: {
                color: textColor,
                family: 'AtlasBold, sans-serif'
              }
            },
            showticklabels: false,
            ticks: '',
            showgrid: false,
            zeroline: true,
            zerolinecolor: textColor,
          },
          margin: { t: 60, l: 30, r: 30, b: 30 },
          paper_bgcolor: bg,
          plot_bgcolor: bg,
          showlegend: showLegend,
          legend: {
            font: { color: textColor },
            ...(legendPosition || { x: 1, y: 1, xanchor: 'left', yanchor: 'top', orientation: 'v' })
          }
        }}
        config={{ displayModeBar: false }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        onHover={handleHover}
        onUnhover={handleUnhover}
      />
    </div>
  );
};

export default ClusteringChart;
