import React from 'react';
import Plot from 'react-plotly.js';

const TrajectoryViewer = ({ fid, coordinateData }) => {
  if (!fid || !coordinateData) return null;

  const indices = coordinateData.fid
    .map((f, i) => (f === fid ? i : null))
    .filter(i => i !== null);

  if (indices.length < 2) return <div>No trajectory for FID: {fid}</div>;

  const x = indices.map(i => coordinateData.bb0[i]);
  const y = indices.map(i => coordinateData.bb1[i]);

  return (
    <div className="mt-4 p-4 border rounded shadow bg-white">
      <h3 className="font-bold mb-2">Trajectory for FID: {fid}</h3>
      <Plot
        data={[{
          x, y,
          mode: 'lines',
          type: 'scatter',
          line: { color: 'black', width: 2 }
        }]}
        layout={{
          width: 400,
          height: 300,
          margin: { l: 40, r: 10, t: 30, b: 40 },
          xaxis: { title: 'bb0' },
          yaxis: { title: 'bb1' },
          showlegend: false,
        }}
      />
    </div>
  );
};

export default TrajectoryViewer;
