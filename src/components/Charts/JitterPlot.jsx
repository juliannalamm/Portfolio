import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const clusterTitles = {
  0: 'Intermediate Motility',
  1: 'Hyperactivated Motility',
  2: 'Progressive Motility',
};

const generateSyntheticPoints = (numPoints, participant) => {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const cluster = Math.floor(Math.random() * 3); // 0, 1, or 2
    const jitter = (Math.random() - 0.5) * 0.3; // random jitter between -0.15 and 0.15
    const y = Math.random(); // random Y spread between 0 and 1
    points.push({ participant, cluster, x: cluster + jitter, y });
  }
  return points;
};

const JitterPlot = () => {
  const [johnPoints, setJohnPoints] = useState([]);
  const [stevePoints, setStevePoints] = useState([]);

  useEffect(() => {
    const john = generateSyntheticPoints(30, 'John');
    const steve = generateSyntheticPoints(30, 'Steve');
    setJohnPoints(john);
    setStevePoints(steve);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <h2 className="text-center text-xl md:text-2xl font-bold text-burgundy mb-4" style={{ fontFamily: 'AtlasBold, serif' }}>
        Synthetic Sperm Distribution Across Clusters
      </h2>
      <Plot
        data={[
          {
            x: johnPoints.map(p => p.x),
            y: johnPoints.map(p => p.y),
            mode: 'markers',
            type: 'scatter',
            name: "John's Data",
            marker: {
              color: '#f5d11d',
              size: 10,
              symbol: 'diamond',
              line: { width: 1, color: '#333' }
            },
            hoverinfo: 'name+x',
          },
          {
            x: stevePoints.map(p => p.x),
            y: stevePoints.map(p => p.y),
            mode: 'markers',
            type: 'scatter',
            name: "Steve's Data",
            marker: {
              color: '#22d469',
              size: 10,
              symbol: 'diamond',
              line: { width: 1, color: '#333' }
            },
            hoverinfo: 'name+x',
          },
        ]}
        layout={{
          title: '',
          xaxis: {
            tickvals: [0, 1, 2],
            ticktext: [clusterTitles[0], clusterTitles[1], clusterTitles[2]],
            range: [-0.5, 2.5],
            title: 'Cluster',
          },
          yaxis: {
            showticklabels: false,
            title: '',
            showgrid: false,
            zeroline: false,
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 50, l: 30, r: 30, b: 40 },
          showlegend: true,
          legend: { orientation: 'h', x: 0.25, y: 1.1 },
        }}
        config={{ displayModeBar: false }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default JitterPlot;
