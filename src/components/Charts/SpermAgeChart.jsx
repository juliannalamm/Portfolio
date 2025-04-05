import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';

const SpermAgePlot = () => {
  const [data, setData] = useState([]);

  // Fetch the reshaped (melted) CSV data
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

  // Extract unique metrics to create traces
  const metrics = [...new Set(data.map(d => d.metric))];
  const traces = metrics.map((metric, i) => {
    const colorPalette = ['#1f77b4', '#2ca02c', '#d62728', '#ff7f0e'];
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
        title: {
          text: 'Normalized Reproductive Metrics by Paternal Age',
          font: { size: 20 }
        },
        xaxis: {
          title: 'Paternal Age (years)',
          range: [18, 56],
          tickmode: 'linear',
          tick0: 20,
          dtick: 5,
          showgrid: false
        },
        yaxis: {
          title: 'Normalized Value (0–1)',
          range: [0, 1.05],
          zeroline: false,
          showgrid: false
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        legend: { title: { text: 'Metric' } },
        margin: { t: 60, l: 60, r: 20, b: 60 },
        hovermode: 'closest',
        // Add a vertical dashed line at age 35
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
              color: 'purple',
              dash: 'dash'
            }
          }
        ],
        // Add an annotation pointing to the vertical line
        annotations: [
            {
              x: 35,
              y: 0.85,
              xref: 'x',
              yref: 'y',
              text: 'John is here',
              showarrow: true,
              arrowhead: 2,
              arrowsize: 1,
              arrowwidth: 2,
              arrowcolor: 'purple',
              // Adjust these offsets to control the angle:
              ax: -100, // x offset (negative moves the arrow tail to the left)
              ay: -100, // y offset (negative moves the arrow tail downwards)
              bordercolor: 'purple',
              borderwidth: 1,
              borderpad: 4,
              bgcolor: 'rgba(255,255,255,0.8)', // white with slight transparency
              font: {
                color: 'purple',
                size: 12
              }
            }
          ]
      }}
      style={{ width: '100%', height: '600px' }}
    />
  );
};

export default SpermAgePlot;
