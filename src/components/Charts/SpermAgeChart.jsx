import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const SpermAgePlot = () => {
    const [data, setData] = useState([]);

    // Fetch CSV data and parse it (unchanged)
    useEffect(() => {
        fetch('/data/Reshaped_Sperm_Data.csv')
            .then(res => res.text())
            .then(csv => {
                const rows = csv.split('\n').filter(r => r.trim().length > 0);
                const parsed = rows.slice(1).map(row => {
                    const [age, metric, value] = row.split(',');
                    return {
                        age: parseFloat(age.replace(/[^\d.]/g, '')),
                        metric: metric.trim(),
                        value: parseFloat(value)
                    };
                });
                setData(parsed);
            });
    }, []);

    // Create traces (unchanged)
    const metrics = [...new Set(data.map(d => d.metric))].filter(metric => metric !== 'Normalized HR');

    const traces = metrics.map((metric, i) => {
        const colorPalette = ['#fe4939', '#481231', '#4fa0f7'];
        const dashStyle = metric === 'Normalized Time to Pregnancy' ? 'dash' : 'solid';
        const filtered = data.filter(d => d.metric === metric);
        return {
            x: filtered.map(d => d.age),
            y: filtered.map(d => d.value),
            mode: 'lines+markers',
            name: metric,
            line: {
                color: colorPalette[i % colorPalette.length],
                dash: dashStyle,
                shape: 'linear'
            },
            connectgaps: true,
            hovertemplate: `Age: %{x}<br>${metric}: %{y:.2f}<extra></extra>`,
        };
    });

    return (
        <Plot
            data={traces}
            layout={{
                autosize: true,
                aspectratio: { x: 1, y: 0.7 },
                font: {
                    family: 'TiemposTextRegular, serif',
                    size: 10,
                    color: '#333'
                },
                title: {
                    text: 'Normalized Reproductive Metrics by Paternal Age',
                    font: {
                        family: 'AtlasBold, sans-serif',
                        size: 16
                    }
                },
                xaxis: {
                    title: {
                        text: 'Paternal Age (years)',
                        font: { family: 'TiemposTextRegular, serif', size: 12, color: '#333' }
                    },
                    range: [18, 56],
                    tickmode: 'linear',
                    tick0: 20,
                    dtick: 5,
                    showgrid: false
                },
                yaxis: {
                    title: { text:'Normalized Value (0–1)' ,
                    font: { family: 'TiemposTextRegular, serif', size: 12, color: '#333' }

                    } ,
                    range: [0, 1.05],
                    zeroline: false,
                    showgrid: false
                },


                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                legend: {
                    title: { text: 'Metric' },
                    x: 1,
                    y: 1.0,
                    xanchor: 'left',
                    yanchor: 'top',
                    font: {
                        size: 9,
                    }
                },
                margin: { t: 50, l: 80, r: 20, b: 50 },
                hovermode: 'closest',
                shapes: [
                    {
                        type: 'line',
                        x0: 35,
                        y0: 0,
                        x1: 35,
                        y1: 1.05,
                        xref: 'x',
                        yref: 'y',
                        line: {
                            color: '#481231',
                            dash: 'dash'
                        }
                    }
                ],
                annotations: [
                    {
                        x: 35,
                        y: 0.85,
                        xref: 'x',
                        yref: 'y',
                        text: 'John is 35',
                        showarrow: true,
                        arrowhead: 2,
                        arrowsize: 1,
                        arrowwidth: 2,
                        arrowcolor: '#481231',
                        ax: -100,
                        ay: 80,
                        bordercolor: '#481231',
                        borderwidth: 1,
                        borderpad: 4,
                        bgcolor: 'rgba(255,255,255,0.8)',
                        font: {
                            color: '#481231',
                            size: 12
                        }
                    }
                ]
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={{
                responsive: true,
                displayModeBar: false
            }}
        />
    );
};

export default SpermAgePlot;