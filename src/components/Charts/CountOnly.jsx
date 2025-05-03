import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CountOnly = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/Percent_Change_from_Youngest_Age.csv')
            .then(res => res.text())
            .then(csv => {
                const rows = csv.split('\n').filter(r => r.trim().length > 0);
                const parsed = rows.slice(1).map(row => {
                    const [age, metric, value, RawValue] = row.split(',');
                    return {
                        age: parseFloat(age.replace(/[^\d.]/g, '')),
                        metric: metric.trim(),
                        value: parseFloat(value),
                        rawValue: parseFloat(RawValue)
                    };
                });
                setData(parsed);
            });
    }, []);

    const metrics = [...new Set(data.map(d => d.metric))].filter(metric =>
        ['Total Sperm'].includes(metric)
    );

    const traces = metrics.map((metric, i) => {
        const colorPalette = ['4fa0f7'];
        const filtered = data.filter(d => d.metric === metric);
        return {
            x: filtered.map(d => d.age),
            y: filtered.map(d => d.value),
            customdata: filtered.map((d) => d.rawValue),

            mode: 'lines+markers+text',
            name: metric,
            line: {
                color: colorPalette[i % colorPalette.length],
                shape: 'linear'
            },
            yaxis: 'y1',
            connectgaps: true,
            hovertemplate: 'Age: %{x}<br>Motility Change: %{y:.2f}%<br>Raw Sperm Count: %{customdata:.1f} million<extra></extra>',
            text: filtered.map(d => `${d.value.toFixed(1)}%`), // Value shown on each point
            textposition: 'bottom center', 
            textfont: {
                size: 11,
                color: '#333'
            }


        };
    });

    return (
        <Plot
            data={traces}
            layout={{
                autosize: true,
                aspectratio: { x: 1, y: 0.7 },
                font: {
                    family: 'AtlasBold, serif',
                    size: 10,
                    color: '#333'
                },
                title: {
                    text: '% Decline in Total Sperm Count Relative to Age 20',
                    font: {
                        family: 'AtlasBold, sans-serif',
                        size: 16
                    }
                },
                xaxis: {
                    title: {
                        text: 'Paternal Age (years)',
                        font: { family: 'AtlasBold, serif', size: 12, color: '#333' }
                    },
                    range: [18, 56],
                    tickmode: 'linear',
                    tick0: 20,
                    dtick: 5,
                    showline: true,
                    linewidth: 1,
                    linecolor: '#333',
                    mirror: false,
                    showgrid: false
                },
                yaxis: {
                    title: {
                        text: '% Change in Total Sperm Count',
                        font: { family: 'AtlasBold, serif', size: 12, color: '#333' }
                    },
                    range: [-40, 10],
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    linewidth: 1,
                    linecolor: '#ccc',
                    mirror: true
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                showlegend:true, 
                legend: {
                    title: { text: 'Metric' },
                    x: 0.8,
                    y: 0.9,
                    xanchor: 'left',
                    yanchor: 'top',
                    font: {
                        size: 10,
                    }
                },
                margin: { t: 50, l: 100, r: 100, b: 50 },
                hovermode: 'closest',
                shapes: [
                    {
                        type: 'line',
                        x0: 35,
                        y0: -40,
                        x1: 35,
                        y1: 10,
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
                        y: 0,
                        xref: 'x',
                        yref: 'y',
                        text: 'John is here',
                        showarrow: true,
                        arrowhead: 2,
                        arrowsize: 1,
                        arrowwidth: 2,
                        arrowcolor: '#481231',
                        ax: -80,
                        ay: -40,
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

export default CountOnly;