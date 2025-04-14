import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const clusterColors = {
    0: '#4fa0f7', // blue
    1: '#481231', // red-orange
    2: '#fe4939'  // green
};

const SyntheticClusterChartPanel = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        Papa.parse('/data/subkmeans_with_fertility_label.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data;

                const points = data.filter(row => {
                    const val = row.Centroid ? row.Centroid.toString().trim().toLowerCase() : '';
                    return val === 'false' || val === '';
                });

                const x = points.map(row => parseFloat(row['PCA Feature 1']));
                const y = points.map(row => parseFloat(row['PCA Feature 2']));
                const clusters = points.map(row => row.Subcluster?.trim());
                const participant = points.map(row => row.participant);
                const fid = points.map(row => row.fid);

                // Inject synthetic points
                const syntheticPoints = [
                    { x: 0.15, y: -0.25, cluster: '0', fid: 'synthetic-0a' },
                    { x: 0.18, y: -0.2, cluster: '0', fid: 'synthetic-0b' },
                    { x: 0.28, y: 0.12, cluster: '2', fid: 'synthetic-2a' },
                    { x: 0.25, y: 0.15, cluster: '2', fid: 'synthetic-2b' },
                    { x: -0.05, y: 0.1, cluster: '1', fid: 'synthetic-1a' },
                    { x: -0.13, y: -0.35, cluster: '1', fid: 'synthetic-1b' },
                    { x: -0.05, y: -0.2, cluster: '1', fid: 'synthetic-1c' },
                ];

                syntheticPoints.forEach(pt => {
                    x.push(pt.x);
                    y.push(pt.y);
                    clusters.push(pt.cluster);
                    participant.push('synthetic');
                    fid.push(pt.fid);
                });

                setChartData({ x, y, clusters, participant, fid });
            },
            error: (err) => console.error("Error loading clustering data:", err)
        });
    }, []);

    if (!chartData) return <div>Loading synthetic cluster chart...</div>;

    const allClusters = [...new Set(chartData.clusters)];
    const traces = allClusters.map(cluster => {
        const indices = chartData.clusters
            .map((c, i) => (String(c).trim() === String(cluster)) ? i : null)
            .filter(i => i !== null);

        const x = indices.map(i => chartData.x[i]);
        const y = indices.map(i => chartData.y[i]);
        const fids = indices.map(i => chartData.fid[i]);

        const symbols = fids.map(fid => fid.startsWith('synthetic') ? 'star' : 'circle');
        const sizes = fids.map(fid => fid.startsWith('synthetic') ? 20 : 10);
        const colors = fids.map(fid =>
            fid.startsWith('synthetic') ? '#4ddb65' : clusterColors[cluster]
        );

        const opacities = fids.map(fid =>
            fid.startsWith('synthetic') ? 1 : 0.8
        );

        return {
            x,
            y,
            mode: 'markers',
            type: 'scatter',
            name: `Cluster ${cluster}`,
            marker: {
                size: sizes,
                symbol: symbols,
                color: colors,
                opacity: opacities,
                line: {
                    color: 'rgba(0,0,0,0)', // transparent
                    width: 0
                }


            },
            text: fids.map(fid => fid.startsWith('synthetic') ? `Synthetic: ${fid}` : `FID: ${fid}`),
            hovertemplate: '%{text}<extra></extra>',
        };
    });

    return (
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <Plot
                data={traces}
                layout={{
                    title: 'Clusters with Synthetic Points',
                    xaxis: {
                        title: 'PCA Feature 1',
                        showticklabels: false,
                        showgrid: false,
                        zeroline: false,
                    },
                    yaxis: {
                        title: 'PCA Feature 2',
                        showticklabels: false,
                        showgrid: false,
                        zeroline: false,
                    },
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

export default SyntheticClusterChartPanel;
