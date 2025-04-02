import React from 'react';
import Plot from 'react-plotly.js';

const TrajectoryViewer = ({ fid, coordinateData }) => {
  let x = [], y = [];

  if (fid && coordinateData) {
    const indices = coordinateData.fid
      .map((f, i) => (f === fid ? i : null))
      .filter(i => i !== null);

    if (indices.length > 5) {
      const rawX = indices.map(i => coordinateData.bb0[i]);
      const rawY = indices.map(i => coordinateData.bb1[i]);

      // Find center
      const minX = Math.min(...rawX);
      const maxX = Math.max(...rawX);
      const minY = Math.min(...rawY);
      const maxY = Math.max(...rawY);
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      // Translate only
      x = rawX.map(val => val - centerX);
      y = rawY.map(val => val - centerY);
    }
  }

  return (
    <Plot
      data={[
        {
          x,
          y,
          mode: 'lines',
          type: 'scatter',
          line: { color: '#fe4939', width: 2 },
          hoverinfo: 'skip',
        }
      ]}
      layout={{
        width: 350,
        height: 250,
        margin: { l: 10, r: 10, t: 20, b: 10 },
        xaxis: {
          visible: false,
          showticklabels: false,
          range: [-0.5, 0.5], // <- adjust range to fit your dataset
          fixedrange: true,
        },
        yaxis: {
          visible: false,
          showticklabels: false,
          range: [-0.5, 0.5], // <- adjust as needed
          fixedrange: true,
          scaleanchor: 'x',
        },
        showlegend: false,
        paper_bgcolor: 'white',
        plot_bgcolor: '#481231',
      }}
      config={{ displayModeBar: false }}
    />
  );
};

export default TrajectoryViewer;
