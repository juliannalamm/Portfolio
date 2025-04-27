// src/components/TrajectoryViewer.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const TrajectoryViewer = ({ fid, coordinateData }) => {
  // Compute indices for this fid
  const indices = fid
    ? coordinateData.fid
        .map((f, i) => (f === fid ? i : null))
        .filter(i => i !== null)
    : [];

  // Prepare the content 
  let content;
  if (fid && indices.length >= 5) {
    const rawX = indices.map(i => coordinateData.bb0[i]);
    const rawY = indices.map(i => coordinateData.bb1[i]);
    // for centering 
    const minX = Math.min(...rawX), maxX = Math.max(...rawX);
    const minY = Math.min(...rawY), maxY = Math.max(...rawY);
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const x = rawX.map(v => v - cx), y = rawY.map(v => v - cy);

    content = (
      <Plot
        data={[{ x, y, mode: 'lines', type: 'scatter', line: { color: 'white', width: 2 }, hoverinfo: 'skip' }]}
        layout={{
          width: 280,
          height: 240,
          margin: { l: 0, r: 0, t: 0, b: 0 },
          xaxis: { visible: false, fixedrange: true },
          yaxis: { visible: false, fixedrange: true, scaleanchor: 'x' },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler
      />
    );
  } else {
    content = (
      <>
        <video
          src="/videos/tracks/straightline.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <p className="text-white text-center text-sm font-semibold px-4">
            Hover over a point to view its trajectory
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="w-[300px] bg-black/50 backdrop-blur-md rounded-xl border border-orangebright/100 shadow-xl overflow-hidden">
      {/* Title bar */}
      <div className="px-4 py-2 bg-black/70 border-b border-white/10">
        <h3 className="text-center text-white
        "   style={{ fontFamily: 'AtlasBold' }}
        >Trajectory</h3>
      </div>

      {/* Content area */}
      <div className="relative h-[240px]">
        {content}
      </div>
    </div>
  );
};

export default TrajectoryViewer;
