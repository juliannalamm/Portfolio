import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#481231',
  2: '#fe4939',
};

const clusterTitles = {
  0: 'Intermediate Motility',
  1: 'Hyperactivated Motility',
  2: 'Progressive Motility',
};

const SyntheticClusterChartPanel = ({ activeStep }) => {
  const [realTraces, setRealTraces] = useState([]);
  const [johnTrace, setJohnTrace] = useState(null);
  const [steveTrace, setSteveTrace] = useState(null);
  const [starSize, setStarSize] = useState(0);

  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const points = data.filter(row => row.Centroid === "False");

        const x = points.map(row => parseFloat(row['PCA Feature 1']));
        const y = points.map(row => parseFloat(row['PCA Feature 2']));
        const clusters = points.map(row => row.Subcluster?.trim());
        const fid = points.map(row => row.fid);

        // Define synthetic points
        const johnPoints = [
          { x: 0.15, y: -0.25, cluster: '0', fid: 'John-0a' },
          { x: 0.18, y: -0.2, cluster: '0', fid: 'John-0b' },
          { x: 0.28, y: 0.12, cluster: '2', fid: 'John-2a' },
          { x: 0.25, y: 0.15, cluster: '2', fid: 'John-2b' },
          { x: -0.05, y: 0.1, cluster: '1', fid: 'John-1a' },
          { x: -0.13, y: -0.35, cluster: '1', fid: 'John-1b' },
          { x: -0.05, y: -0.2, cluster: '1', fid: 'John-1c' },
        ];

        const stevePoints = [
          { x: -0.3, y: 0.25, cluster: '0', fid: 'Steve-0a' },
          { x: 0.18, y: 0.4, cluster: '0', fid: 'Steve-0b' },
          { x: 0.3, y: 0.2, cluster: '2', fid: 'Steve-2a' },
          { x: 0.13, y: 0.15, cluster: '2', fid: 'Steve-2b' },
          { x: -0.05, y: 0.2, cluster: '1', fid: 'Steve-1a' },
          { x: -0.13, y: -0.1, cluster: '1', fid: 'Steve-1b' },
          { x: -0.08, y: -0.2, cluster: '1', fid: 'Steve-1c' },
        ];

        // Create real cluster traces
        const allClusters = [...new Set(clusters)];
        const realClusterTraces = allClusters.map(cluster => {
          const indices = clusters
            .map((c, i) => (String(c) === String(cluster)) ? i : null)
            .filter(i => i !== null);

          const traceX = indices.map(i => x[i]);
          const traceY = indices.map(i => y[i]);
          const traceFids = indices.map(i => fid[i]);

          return {
            x: traceX,
            y: traceY,
            mode: 'markers',
            type: 'scatter',
            name: clusterTitles[cluster] || `Cluster ${cluster}`,   // <<< this line
            marker: {
              size: 10,
              symbol: 'circle',
              color: clusterColors[cluster],
              opacity: 1,
              line: { color: 'rgba(0,0,0,0)', width: 0 }
            },
            text: traceFids.map(fid => `FID: ${fid}`),
            hovertemplate: '%{text}<extra></extra>',
          };
        });

        // Create John's trace separately
        const johnTrace = {
          x: johnPoints.map(p => p.x),
          y: johnPoints.map(p => p.y),
          mode: 'markers',
          type: 'scatter',
          name: "John's Data",
          marker: {
            size: starSize,
            symbol: 'diamond',
            color: '#f5d11d',
            opacity: starSize > 0 ? 1 : 0,
            line: { color: 'rgba(0,0,0,0)', width: 0 }
          },
          text: johnPoints.map(() => "John's data"),
          hovertemplate: '%{text}<extra></extra>'
        };

        // Create Steve's trace separately
        const steveTrace = {
          x: stevePoints.map(p => p.x),
          y: stevePoints.map(p => p.y),
          mode: 'markers',
          type: 'scatter',
          name: "Steve's Data",
          marker: {
            size: starSize,
            symbol: 'diamond',
            color: '#22d469',
            opacity: starSize > 0 ? 1 : 0,
            line: { color: 'rgba(0,0,0,0)', width: 0 }
          },
          text: stevePoints.map(() => "Steve's data"),
          hovertemplate: '%{text}<extra></extra>'
        };

        setRealTraces(realClusterTraces);
        setJohnTrace(johnTrace);
        setSteveTrace(steveTrace);
      },
      error: (err) => console.error("Error loading clustering data:", err)
    });
  }, [starSize]);

  useEffect(() => {
    if (activeStep === 5) {
      let animationFrame;
      let start = performance.now();

      const animateSize = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / 2000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setStarSize(20 * eased);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateSize);
        }
      };

      animationFrame = requestAnimationFrame(animateSize);

      return () => cancelAnimationFrame(animationFrame);
    } else {
      setStarSize(0);
    }
  }, [activeStep]);

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <h2 className="text-center text-xl md:text-2xl font-bold text-burgundy mb-0" style={{ fontFamily: 'AtlasBold, serif' }}>
        John and Steve's Cluster Distribution
      </h2>
      <Plot
        data={[...realTraces, johnTrace, steveTrace].filter(Boolean)}
        layout={{
          title: 'Clusters with John & Steve Synthetic Points',
          xaxis: { title: 'PCA Feature 1', showticklabels: false, showgrid: false, zeroline: false },
          yaxis: { title: 'PCA Feature 2', showticklabels: false, showgrid: false, zeroline: false },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 50, l: 30, r: 30, b: 40 },
          showlegend: true,
        }}
        config={{ displayModeBar: false }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SyntheticClusterChartPanel;
