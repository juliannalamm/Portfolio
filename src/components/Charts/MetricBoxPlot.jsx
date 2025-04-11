import React from 'react';
import Plot from 'react-plotly.js';

const MetricBoxPlot = ({ chartData, selectedCluster }) => {
    if (!chartData) return <div>Loading metrics...</div>;

    // If a cluster is selected, filter indices; otherwise, use all indices.
    const indices = (selectedCluster && selectedCluster !== "")
        ? chartData.clusters
            .map((c, i) => (String(c).trim() === String(selectedCluster).trim() ? i : null))
            .filter(i => i !== null)
        : chartData.clusters.map((_, i) => i);
    console.log("Selected cluster:", selectedCluster);
    console.log("Filtered indices:", indices);

    // Create a metrics object – note that keys "ALH Mean" and "ALH Max" match how you stored them.
    const metrics = {
        VCL: indices.map(i => chartData.VCL[i]),
        VAP: indices.map(i => chartData.VAP[i]),
        VSL: indices.map(i => chartData.VSL[i]),
        LIN: indices.map(i => chartData.LIN[i]),
        WOB: indices.map(i => chartData.WOB[i]),
        STR: indices.map(i => chartData.STR[i]),
        "ALH Mean": indices.map(i => chartData["ALH Mean"][i]),
        "ALH Max": indices.map(i => chartData["ALH Max"][i]),
    };

    // Create a trace for each metric
    const traces = Object.keys(metrics).map(metricKey => ({
        y: metrics[metricKey],
        name: metricKey,
        type: 'box',
        boxpoints: 'all',  // Show individual data points
        jitter: 0.3,
        pointpos: -1.8,
    }));

    return (
        <Plot
            data={traces}
            layout={{
                title: `Metric Distributions${selectedCluster ? ` for Cluster ${selectedCluster}` : ''}`,
                xaxis: { title: 'Metrics' },
                yaxis: { title: 'Value' },
                boxmode: 'group',
                height: 400,
            }}
            config={{ responsive: true }}
        />
    );
};

export default MetricBoxPlot;
