import React from 'react';
import Plot from 'react-plotly.js';

const TrajectoryViewer = ({
  fid,
  coordinateData,
  width = 260,
  height = 220,
  bgColor = 'rgba(0,0,0,0.5)',
  title = 'Trajectory',
  textColor = 'white',
  borderColor = 'rgba(255,138,76,1)' // orangebright fallback
}) => {
  const indices = fid
    ? coordinateData.fid
        .map((f, i) => (f === fid ? i : null))
        .filter(i => i !== null)
    : [];

  const showTrajectory = fid && indices.length >= 5;

  const content = showTrajectory ? (() => {
    const rawX = indices.map(i => coordinateData.bb0[i]);
    const rawY = indices.map(i => coordinateData.bb1[i]);
    const minX = Math.min(...rawX), maxX = Math.max(...rawX);
    const minY = Math.min(...rawY), maxY = Math.max(...rawY);
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const x = rawX.map(v => v - cx);
    const y = rawY.map(v => v - cy);

    return (
      <Plot
        data={[{
          x,
          y,
          mode: 'lines',
          type: 'scatter',
          line: { color: textColor, width: 2 },
          hoverinfo: 'skip'
        }]}
        layout={{
          width,
          height,
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
  })() : (
    <>
      <video
        src="/videos/tracks/straightline.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <p className="text-white text-center text-xs font-semibold px-3">
          Hover over a point to view its trajectory
        </p>
      </div>
    </>
  );

  return (
    <div
      className="rounded-xl border shadow-xl overflow-hidden"
      style={{
        width: `${width}px`,
        backgroundColor: bgColor,
        borderColor,
        borderWidth: '1px',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Title bar */}
      <div
        className="px-3 py-1 border-b"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <h3
          className="text-center text-sm font-bold"
          style={{ color: textColor, fontFamily: 'AtlasBold' }}
        >
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="relative" style={{ height: `${height}px` }}>
        {content}
      </div>
    </div>
  );
};

export default TrajectoryViewer;
