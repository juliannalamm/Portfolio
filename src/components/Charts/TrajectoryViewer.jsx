import React from 'react';
import Plot from 'react-plotly.js';

const TrajectoryViewer = ({ fid, coordinateData }) => {
  // Default view (before hover)
  if (!fid) {
    return (
      <div className="w-[300px] h-[300px] relative rounded-lg overflow-hidden">
        <video
          src="/videos/tracks/straightline.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <p className="text-white text-center text-sm font-semibold px-4">
            Hover over a point to view its trajectory
          </p>
        </div>
      </div>
    );
  }

  // Extract and center the trajectory
  const indices = coordinateData.fid
    .map((f, i) => (f === fid ? i : null))
    .filter(i => i !== null);

  if (indices.length < 5) return null;

  const rawX = indices.map(i => coordinateData.bb0[i]);
  const rawY = indices.map(i => coordinateData.bb1[i]);

  const minX = Math.min(...rawX);
  const maxX = Math.max(...rawX);
  const minY = Math.min(...rawY);
  const maxY = Math.max(...rawY);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const x = rawX.map(val => val - centerX);
  const y = rawY.map(val => val - centerY);

  return (
    <div className="w-[300px] h-[300px] relative rounded-lg overflow-hidden bg-white">
      <Plot
        data={[{
          x,
          y,
          mode: 'lines',
          type: 'scatter',
          line: { color: 'white', width: 2 },
          hoverinfo: 'skip',
        }]}
        layout={{
          width: 350,
          height: 250,
          margin: { l: 10, r: 10, t: 20, b: 10 },
          xaxis: {
            visible: false,
            range: [-0.5, 0.5],
            fixedrange: true,
            showticklabels: false,
          },
          yaxis: {
            visible: false,
            range: [-0.5, 0.5],
            fixedrange: true,
            showticklabels: false,
            scaleanchor: 'x',
          },
          showlegend: false,
          paper_bgcolor: '#000',
          plot_bgcolor: '#000',
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default TrajectoryViewer;
