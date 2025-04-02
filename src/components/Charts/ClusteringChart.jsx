import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

// PLOTLY RENDERING COMPONENT 
const ClusteringChart = ({ chartData, coordinateData }) => {
    const [hoverTrack, setHoverTrack] = useState(null);

 // Precompute the track mapping only if coordinateData is available
 const trackMapping = useMemo(() => {
    if (!coordinateData || !coordinateData.fid) return {};
    const mapping = {};
    for (let i = 0; i < coordinateData.fid.length; i++) {
      const fid = coordinateData.fid[i];
      if (!mapping[fid]) {
        mapping[fid] = { x: [], y: [] };
      }
      mapping[fid].x.push(coordinateData.bb0[i]);
      mapping[fid].y.push(coordinateData.bb1[i]);
    }
    return mapping;
  }, [coordinateData]);


    // Define a color for each cluster (adjust these colors as desired)
    const clusterColors = {
        0: '#bfdaf7', // blue
        1: '#481231', // red-orange
        2: '#fe4939'  // green
    };

    const uniqueClusters = [...new Set(chartData.clusters)];


    // Create a trace for each cluster
    const clusterTraces = uniqueClusters.map(cluster => {
        // Find indices for this cluster
        const indices = chartData.clusters
            .map((c, i) => (c == cluster ? i : null)) // for each element in the clusters array
            .filter(i => i !== null); // keep the index if it matches the current cluster, otherwise return null and filter out the nulls

        const x = indices.map(i => chartData.x[i]); // extract the x coordinates for the selected indices 
        const y = indices.map(i => chartData.y[i]); // extract the y coordinates for the selected indices


        // Build a hover text string for each point using template literals:
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
                color: clusterColors[cluster] || 'gray',
            },
            name: `Cluster ${cluster}`,
            text: hoverText,
            customdata,
            hovertemplate: '%{text}<br><extra></extra>',
        };
    });

    // Create a trace for centroids
    const centroidsTrace = {
        x: chartData.centX,
        y: chartData.centY,
        mode: 'markers',
        type: 'scatter',
        marker: {
            symbol: 'x',
            size: 16,
            color: 'black',
        },
        name: 'Centroids',
    };

    // Handle hover events to show the track line
    const handleHover = (event) => {
        if (event && event.points && event.points.length > 0) {
            const point = event.points[0];
            const fid = point.customdata;
            const track = trackMapping[fid];
            if (track) {
                setHoverTrack({ ...track, fid });
            }
        }
    };

    const handleUnhover = () => {
        setHoverTrack(null);
    };

    // Combine all traces (clusters, centroids, and hovered track if exists)
    const dataTraces = [...clusterTraces, centroidsTrace];
    if (hoverTrack) {
        dataTraces.push({
            x: hoverTrack.x,
            y: hoverTrack.y,
            mode: 'lines',
            type: 'scatter',
            line: { width: 2, dash: 'dash' },
            name: `Track for FID ${hoverTrack.fid}`,
            hoverinfo: 'skip',
        });
    }




    return (
        <Plot
            data={dataTraces}
            layout={{
                title: 'K-means Clustering with 2D PCA',
                xaxis: { title: 'PCA Feature 1' },
                yaxis: { title: 'PCA Feature 2' },
                width: 800,
                height: 600,
            }}
            onHover={handleHover}
            onUnhover={handleUnhover}
        />
    );
};



export default ClusteringChart;
