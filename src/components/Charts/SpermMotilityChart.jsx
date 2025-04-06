import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const SpermMotilityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/Percent_Change_from_Youngest_Age.csv')
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

    // Only plot the desired metrics
    const metrics = [...new Set(data.map(d => d.metric))].filter(metric =>
        ['Motility', 'Total Sperm', 'TTP'].includes(metric)
    );

    const traces = metrics.map((metric, i) => {
        const colorPalette = ['#fe4939', '#4fa0f7', '#481231'];
        const filtered = data.filter(d => d.metric === metric);
        return {
            x: filtered.map(d => d.age),
            y: filtered.map(d => d.value),
            mode: 'lines+markers',
            name: metric,
            yaxis: metric === 'TTP' ? 'y2' : 'y',
            line: {
                color: colorPalette[i % colorPalette.length],
                dash: metric === 'TTP' ? 'dot' : 'solid',
                shape: 'linear'
            },
            connectgaps: true,
            hovertemplate: `Age: %{x}<br>${metric}: %{y:.2f}%<extra></extra>`,
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
                    text: '% Reproductive Decline Relative to Age 20',
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
                    title: {
                        text: '% Change in Motility / Total Sperm',
                        font: { family: 'TiemposTextRegular, serif', size: 12, color: '#333' }
                    },
                    range: [-40, 10],
                    zeroline: false,
                    showgrid: false
                },
                yaxis2: {
                    title: {
                        text: '% Change in Time to Pregnancy (TTP)',
                        font: { family: 'TiemposTextRegular, serif', size: 12, color: '#333' }
                    },
                    overlaying: 'y',
                    side: 'right',
                    range: [-20, 500],
                    showgrid: false
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                legend: {
                    title: { text: 'Metric' },
                    x: 0.03,
                    y: 0.5,
                    xanchor: 'left',
                    yanchor: 'top',
                    font: {
                        size: 9,
                    }
                },
                margin: { t: 50, l: 100, r: 100, b: 50 },
                hovermode: 'closest',
                shapes: [
                    {
                        type: 'line',
                        x0: 35,
                        y0: 0,
                        x1: 35,
                        y1: 1,
                        xref: 'x',
                        yref: 'paper',
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
                        yref: 'paper',
                        text: 'John is here',
                        showarrow: true,
                        arrowhead: 2,
                        arrowsize: 1,
                        arrowwidth: 2,
                        arrowcolor: '#481231',
                        ax: -100,
                        ay: 60,
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

export default SpermMotilityChart;
