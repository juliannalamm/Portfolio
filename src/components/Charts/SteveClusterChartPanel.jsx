// SyntheticClusterChartPanel.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#481231',
  2: '#fe4939'
};

const SteveClusterChartPanel = ({ activeStep }) => {
  const [realTraces, setRealTraces] = useState([]);
  const [JohnTrace, setJohnTrace] = useState(null);
  const [SteveTrace, setSteveTrace] = useState(null);
  const [starSize, setStarSize] = useState(0);

  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const points = data.filter(row => row.Centroid === "False"); // filter out centroid points


        const x = points.map(row => parseFloat(row['PCA Feature 1']));
        const y = points.map(row => parseFloat(row['PCA Feature 2']));
        const clusters = points.map(row => row.Subcluster?.trim());
        const participant = points.map(row => row.participant);
        const fid = points.map(row => row.fid);

        // Inject synthetic points
        const JohnPoints = [
          { x: 0.15, y: -0.25, cluster: '0', fid: 'John-0a' },
          { x: 0.18, y: -0.2, cluster: '0', fid: 'John-0b' },
          { x: 0.28, y: 0.12, cluster: '2', fid: 'John-2a' },
          { x: 0.25, y: 0.15, cluster: '2', fid: 'John-2b' },
          { x: -0.05, y: 0.1, cluster: '1', fid: 'John-1a' },
          { x: -0.13, y: -0.35, cluster: '1', fid: 'John-1b' },
          { x: -0.05, y: -0.2, cluster: '1', fid: 'John-1c' },
        ];

        const StevePoints = [
          { x: -0.3, y: 0.25, cluster: '0', fid: 'Steve-0a' },
          { x: 0.18, y: 0.4, cluster: '0', fid: 'Steve-0b' },
          { x: 0.3, y: 0.2, cluster: '2', fid: 'Steve-2a' },
          { x: 0.13, y: 0.15, cluster: '2', fid: 'Steve-2b' },
          { x: -0.05, y: 0.2, cluster: '1', fid: 'Steve-1a' },
          { x: -0.13, y: -0.1, cluster: '1', fid: 'Steve-1b' },
          { x: -0.08, y: -0.2, cluster: '1', fid: 'Steve-1c' },
        ];

        JohnPoints.forEach(pt => {
          x.push(pt.x);
          y.push(pt.y);
          clusters.push(pt.cluster);
          participant.push('synthetic');
          fid.push(pt.fid);
        });

        StevePoints.forEach(pt => {
          x.push(pt.x);
          y.push(pt.y);
          clusters.push(pt.cluster);
          participant.push('synthetic');
          fid.push(pt.fid);
        });

        // Create real traces
        const allClusters = [...new Set(clusters)];
        const realTraces = allClusters.map(cluster => {
          const indices = clusters
            .map((c, i) => (String(c).trim() === String(cluster)) ? i : null)
            .filter(i => i !== null);

          const traceX = indices.map(i => x[i]);
          const traceY = indices.map(i => y[i]);
          const traceFids = indices.map(i => fid[i]);

          const symbols = traceFids.map(fid => fid.startsWith('John') || fid.startsWith('Steve') ? 'star' : 'circle');          
          const sizes = traceFids.map(fid => fid.startsWith('John') || fid.startsWith('Steve') ? 20 : 10);
          const colors = traceFids.map(fid =>
            fid.startsWith('John') || fid.startsWith('Steve') ? '#4ddb65' : clusterColors[cluster]
          );
          const opacities = traceFids.map(fid =>
            fid.startsWith('John') || fid.startsWith('Steve') ? 0 : 1
          );

          return {
            x: traceX,
            y: traceY,
            mode: 'markers',
            type: 'scatter',
            name: `Cluster ${cluster}`,
            marker: {
              size: sizes,
              symbol: symbols,
              color: colors,
              opacity: opacities,
              line: { color: 'rgba(0,0,0,0)', width: 0 }
            },
            text: traceFids.map(fid => fid.startsWith('John') ? "John's data" : fid.startsWith('Steve') ? "Steve's data" : `FID: ${fid}`) ,         
            hovertemplate: '%{text}<extra></extra>',
          };
        });

        // Create synthetic star trace separately
        const JohnOnlyTrace = {
          x: JohnPoints.map(p => p.x),
          y: JohnPoints.map(p => p.y),
          type: 'scatter',
          mode: 'markers',
          name: `John's Data`,
          marker: {
            size: 20,
            symbol: 'star',
            color: '#4ddb65',
            opacity: starSize > 0 ? 1 : 0,
          },
          text: JohnPoints.map(() => "John's data"),
          hovertemplate: '%{text}<extra></extra>'
        };

        const SteveOnlyTrace = {
          x: StevePoints.map(p => p.x),
          y: StevePoints.map(p => p.y),
          type: 'scatter',
          mode: 'markers',
          name: `Steve Data`,
          marker: {
            size: starSize,
            symbol: 'star',
            color: '#d234eb',
            opacity: starSize > 0 ? 1 : 0,
          },
          text: StevePoints.map(() => "Steve data"),
          hovertemplate: '%{text}<extra></extra>'
        };

        setRealTraces(realTraces);
        setJohnTrace(JohnOnlyTrace);
        setSteveTrace(SteveOnlyTrace);
      },
      error: (err) => console.error("Error loading clustering data:", err)
    });
  }, [starSize]);

  useEffect(() => {
    if (activeStep === 4) {
      let animationFrame;
      let start = performance.now();

      const animateSize = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed /2000, 1);
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
      <Plot
        data={[...realTraces, JohnTrace, SteveTrace].filter(Boolean)}
        layout={{
          title: 'Clusters with Synthetic Points',
          xaxis: { title: 'PCA Feature 1', showticklabels: false, showgrid: false, zeroline: false },
          yaxis: { title: 'PCA Feature 2', showticklabels: false, showgrid: false, zeroline: false },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 50, l: 30, r: 30, b: 40 },
        }}
        config={{ displayModeBar: false }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SteveClusterChartPanel;
