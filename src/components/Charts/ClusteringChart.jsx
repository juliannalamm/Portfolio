import React from 'react';
import Plot from 'react-plotly.js';

// PLOTLY RENDERING COMPONENT 
const ClusteringChart = ({ chartData }) => {
    // Get unique clusters from your data
    const uniqueClusters = [...new Set(chartData.clusters)];

    // Define a color for each cluster (adjust these colors as desired)
    const clusterColors = {
        0: '#bfdaf7', // blue
        1: '#481231', // red-orange
        2: '#fe4939'  // green
    };

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

    return (
        <Plot
            data={[...clusterTraces, centroidsTrace]}
            layout={{
                title: 'K-means Clustering with 2D PCA',
                xaxis: { title: 'PCA Feature 1' },
                yaxis: { title: 'PCA Feature 2' },
                width: 800,
                height: 600,
            }}
        />
    );
};

//TODO: display fid and participant in tooltip 


export default ClusteringChart;
