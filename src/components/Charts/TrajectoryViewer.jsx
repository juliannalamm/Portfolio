import React from 'react';
import Plot from 'react-plotly.js';

const TrajectoryViewer = ({ fid, coordinateData }) => {
  // Prepare default empty plot data
  let x = [], y = [];
  if (fid && coordinateData) {
    const indices = coordinateData.fid
      .map((f, i) => (f === fid ? i : null))
      .filter(i => i !== null);

    if (indices.length > 5) {
      x = indices.map(i => coordinateData.bb0[i]);
      y = indices.map(i => coordinateData.bb1[i]);
    }
  }

  return (
    <div className="border rounded shadow-sm bg-white p-4 w-full h-full">
      <h3 className="font-bold text-sm mb-2">
        {fid ? `ID: ${fid}` : 'Trajectory Viewer'}
      </h3>
      <Plot
        data={[
          {
            x,
            y,
            mode: 'lines',
            type: 'scatter',
            line: { color: 'black', width: 2 },
          }
        ]}
        layout={{
          width: 350,
          height: 250,
          margin: { l: 10, r: 10, t: 20, b: 10 },
          xaxis: {
            visible: false,
            showticklabels: false,
            range: [0, 1], // use a normalized range if you want identical scaling
            fixedrange: true
          },
          yaxis: {
            visible: false,
            showticklabels: false,
            scaleanchor: "x", // ensures equal aspect ratio
            range: [0, 1],     // or remove if you prefer auto-scaling
            fixedrange: true
          },
          showlegend: false,
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default TrajectoryViewer;
