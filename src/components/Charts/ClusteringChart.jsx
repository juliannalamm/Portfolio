import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

// PLOTLY RENDERING COMPONENT 
const ClusteringChart = ({ chartData, onHoverFid, selectedCluster }) => {

    // Define a color for each cluster (adjust these colors as desired)
    const clusterColors = {
        0: '#4fa0f7', // blue
        1: '#E9A752', // red‑orange (beeswax)
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
        <div className="w-full min-h-screen  bg-transparent">
            <Plot
                data={dataTraces}
                layout={{
                    autosize: true,
                    title: 'K-means Clustering with 2D PCA',
                    xaxis: {
                        title: {
                            text: 'PCA Feature 1',
                            font: {
                                color: 'white',
                                family: 'TiemposTextBold, sans-serif'
                            }
                        },
                        showticklabels: false,

                        ticks: '',
                        showgrid: false,
                        showgrid: false,
                        zeroline: true,
                        zerolinecolor: 'white',
                    },
                    yaxis: {
                        title: {
                            text: 'PCA Feature 2',
                            font: {
                                color: 'white',
                                family: 'TiemposTextBold, sans-serif'
                            }
                        },
                        showticklabels: false,
                        ticks: '',
                        showgrid: false,
                        zeroline: true,
                        zerolinecolor: 'white',

                    },
                    margin: { t: 10, l: 10, r: 10, b: 10 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    legend: {
                        font: { color: 'white' },
                    }
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
