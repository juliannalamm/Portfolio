import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

// PLOTLY RENDERING COMPONENT 
const ClusteringChart = ({ chartData, onHoverFid }) => {

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
            color: 'red',
        },
        name: 'Centroids',
    };

    // Handle hover events to show the track line, prop passed from DashboardClusterChart
    const handleHover = (event) => {
        if (event?.points?.[0]?.customdata) {
            onHoverFid(event.points[0].customdata);
        }
    };

    const handleUnhover = () => {
        onHoverFid(null);
    };


    // Combine all traces (clusters, centroids, and hovered track if exists)
    const dataTraces = [...clusterTraces, centroidsTrace];

    return (
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-transparent">
            <Plot
                data={dataTraces}
                layout={{
                    autosize: true,
                    title: 'K-means Clustering with 2D PCA',
                    xaxis: { title: 'PCA Feature 1' },
                    yaxis: { title: 'PCA Feature 2' },
                    margin: { t: 50, l: 30, r: 80, b: 50 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                }}
                config={{ displayModeBar: false }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                onHover={handleHover}
                onUnhover={handleUnhover}
            />
        </div>
    );
};



export default ClusteringChart;
