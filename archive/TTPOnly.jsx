import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TTPOnly = () => {
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
        ['TTP'].includes(metric)
    );

    const TTPtraces = metrics.map((metric, i) => {
        const colorPalette = ['#481231'];
        const filtered = data.filter(d => d.metric === metric);
        return {
            x: filtered.map(d => d.age),
            y: filtered.map(d => d.value),
            customdata: filtered.map(d => d.rawValue),
            mode: 'lines+markers+text',
            name: metric,
            line: {
                color: colorPalette[i % colorPalette.length],
                shape: 'linear'
            },
            yaxis: 'y1',
            connectgaps: true,
            hovertemplate: 'Age: %{x}<br>TTP Change: %{y:.2f}%<br>Raw TTP: %{customdata:f} Months<extra></extra>',
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
            data={TTPtraces}
            layout={{
                autosize: true,
                aspectratio: { x: 1, y: 0.7 },
                font: {
                    family: 'AtlasBold, serif',
                    size: 10,
                    color: '#333'
                },
                title: {
                    text: '% Increase to Time to Pregnancy (TTP) relative to age 20',
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
                        text: '% Change in Time to Pregnancy (TTP)',
                        font: { family: 'AtlasBold, serif', size: 12, color: '#333' }
                    },
                    range: [-30, 500],
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    linewidth: 1,
                    linecolor: '#ccc',
                    mirror: true
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                showlegend: true,
                legend: {
                    title: { text: 'Metric' },
                    x: 0.9,
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
                        y0: -30,
                        x1: 35,
                        y1: 500,
                        xref: 'x',
                        yref: 'y',
                        line: {
                            color: '#481231',
                            dash: 'dash'
                        }
                    }
                ],



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

export default TTPOnly;