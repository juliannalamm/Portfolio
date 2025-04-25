import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const MotilityOnly = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/Percent_Change_from_Youngest_Age.csv')
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.split('\n').filter((r) => r.trim().length > 0);

        // Skip the header row
        const parsed = rows.slice(1).map((row) => {
          const [age, metric, value] = row.split(',');
          return {
            age: parseFloat(age.replace(/[^\d.]/g, '')),
            metric: metric.trim(),
            value: parseFloat(value),
          };
        });

        setData(parsed);
      });
  }, []);

  // Filter data for 'Motility' metric only
  const motilityData = data.filter((d) => d.metric === 'Motility');

  if (!motilityData.length) {
    return <p>Loading Motility chart...</p>;
  }

  // Create Plotly trace
  const trace = {
    x: motilityData.map((d) => d.age),
    y: motilityData.map((d) => d.value),
    mode: 'lines+markers+text',
    name: 'Motility',
    line: {
      color: '#fe4939',
      shape: 'linear',
    },
    yaxis: 'y1',
    connectgaps: true,
    hovertemplate: 'Age: %{x}<br>Motility: %{y:.2f}%<extra></extra>',
    text: motilityData.map((d) => `${d.value.toFixed(1)}%`),
    textposition: 'bottom center',
    textfont: {
      size: 11,
      color: '#333',
    },
  };

  // Define Plotly layout
  const layout = {
    autosize: true,
    font: {
      family: 'AtlasBold, serif',
      size: 10,
      color: '#333',
    },
    title: {
      text: '% Motility Decline Relative to Age 20',
      font: {
        family: 'AtlasBold, sans-serif',
        size: 16,
      },
    },
    xaxis: {
      title: {
        text: 'Paternal Age (years)',
        font: { family: 'AtlasBold, serif', size: 12, color: '#333' },
      },
      range: [18, 56],
      tickmode: 'linear',
      tick0: 20,
      dtick: 5,
      showline: true,
      linewidth: 1,
      linecolor: '#333',
      mirror: false,
      showgrid: false,
    },
    yaxis: {
      title: {
        text: '% Change in Motility',
        font: { family: 'AtlasBold, serif', size: 12, color: '#333' },
      },
      range: [-40, 10],
      showgrid: false,
      zeroline: false,
      showline: false,
      linewidth: 1,
      linecolor: '#ccc',
      mirror: true,
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,
    legend: {
      title: { text: 'Metric' },
      x: 0.8,
      y: 0.9,
      xanchor: 'left',
      yanchor: 'top',
      font: {
        size: 10,
      },
    },
    margin: { t: 50, l: 50, r: 50, b: 50 },
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
          dash: 'dash',
        },
      },
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
          size: 12,
        },
      },
    ],
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
    />
  );
};

export default MotilityOnly;
