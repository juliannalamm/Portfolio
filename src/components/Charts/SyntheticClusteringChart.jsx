import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

// PLOTLY RENDERING COMPONENT 
const SyntheticClusteringChart = ({ chartData, onHoverFid, selectedCluster }) => {

    // Define a color for each cluster (adjust these colors as desired)
    const clusterColors = {
        0: '#4fa0f7', // blue
        1: '#481231', // red-orange
        2: '#fe4939'  // green
    };

    const uniqueClusters = [...new Set(chartData.clusters)];


    // Create a trace for each cluster
    const filteredClusters = selectedCluster !== null && selectedCluster !== ""
        ? [selectedCluster]  // only show this cluster
        : [...new Set(chartData.clusters)];  // show all if none selected

    const clusterTraces = filteredClusters.map(cluster => {
        const indices = chartData.clusters
            .map((c, i) => (String(c).trim() === String(cluster).trim() ? i : null))
            .filter(i => i !== null);

        const x = indices.map(i => chartData.x[i]);
        const y = indices.map(i => chartData.y[i]);
        const fids = indices.map(i => chartData.fid[i]);

        const symbols = fids.map(fid =>
            fid.startsWith('synthetic') ? 'star' : 'circle'
        );

        const sizes = fids.map(fid =>
            fid.startsWith('synthetic') ? 14 : 10
        );

        const hoverText = fids.map(fid =>
            fid.startsWith('synthetic') ? `Synthetic point: ${fid}` : `FID: ${fid}`
        );

        return {
            x,
            y,
            type: 'scatter',
            mode: 'markers',
            marker: {
                symbol: symbols,
                size: sizes,
                color: clusterColors[cluster] || 'gray',
            },
            name: `Cluster ${cluster}`,
            text: hoverText,
            hoverinfo: 'text',
            hovertemplate: '%{text}<extra></extra>',
        };
    });


 

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
    const dataTraces = [...clusterTraces];

    return (
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-transparent">
            <Plot
                data={dataTraces}
                layout={{
                    autosize: true,
                    title: 'K-means Clustering with 2D PCA',
                    xaxis: {
                        title: { text: 'PCA Feature 1' },
                        showticklabels: false,
                        ticks: '',
                        showgrid: false
                    },
                    yaxis: {
                        title: { text: 'PCA Feature 2' },
                        showticklabels: false,
                        ticks: '',
                        showgrid: false
                    },
                    margin: { t: 50, l: 30, r: 10, b: 90 },
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



export default SyntheticClusteringChart;
