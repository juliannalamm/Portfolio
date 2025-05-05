import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-dist-min';

// your three line colors
const COLORS = ['#fe4939', '#4fa0f7', '#481231'];
// the metrics in the CSV that you want to cycle through
const ALL_METRICS = ['Motility', 'Total Sperm', 'TTP'];

// per-metric titles
const METRIC_CONFIG = {
  Motility: {
    chartTitle: '% Motility Decline Relative to Age 20',
    yTitle: '% Change in Motility'
  },
  'Total Sperm': {
    chartTitle: '% Decline in Total Sperm Count Relative to Age 20',
    yTitle: '% Change in Total Sperm Count'
  },
  TTP: {
    chartTitle: '% Increase in Time to Pregnancy (TTP)',
    yTitle: '% Change in Time to Pregnancy (TTP)'
  }
};

// a static base layout to reuse
const BASE_LAYOUT = {
  autosize: true,
  aspectratio: { x: 1, y: 0.7 },
  font: { family: 'AtlasBold, serif', size: 10, color: '#333' },
  title: {
    text: '% Reproductive Decline Relative to Age 20',
    font: { family: 'AtlasBold, sans-serif', size: 16 }
  },
  xaxis: {
    title: { text: 'Paternal Age (years)', font: { family: 'AtlasBold, serif', size: 12, color: '#333' } },
    range: [18, 56],
    tickmode: 'linear',
    tick0: 20,
    dtick: 5,
    showgrid: false
  },
  yaxis: {
    title: { text: '% Change', font: { family: 'AtlasBold, serif', size: 12, color: '#333' } },
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
    font: { size: 9 }
  },
  margin: { t: 50, l: 100, r: 50, b: 50 },
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
      line: { color: '#481231', dash: 'dash' }
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
      ax: -80,
      ay: 40,
      bordercolor: '#481231',
      borderwidth: 1,
      borderpad: 4,
      bgcolor: 'rgba(255,255,255,0.8)',
      font: { color: '#481231', size: 12 }
    }
  ]
};

export default function SpermAgeChart({ selectedMetric }) {
  const [rawData, setRawData] = useState([]);
  const graphDivRef = useRef(null);

  // 1️⃣ Load and parse the CSV once
  useEffect(() => {
    fetch('/data/Percent_Change_from_Youngest_Age.csv')
      .then(res => res.text())
      .then(csv => {
        const rows = csv.split('\n').filter(r => r.trim());
        const parsed = rows.slice(1).map(r => {
          const [age, metric, value, rawValue] = r.split(',');
          return {
            age: +age,
            metric: metric.trim(),
            value: +value,
            rawValue: +rawValue
          };
        });
        setRawData(parsed);
      });
  }, []);

  // helper to build exactly one trace
  const buildTrace = metric => {
    const slice = rawData.filter(d => d.metric === metric);
    return {
      x: slice.map(d => d.age),
      y: slice.map(d => d.value),
      customdata: slice.map(d => d.rawValue),
      mode: 'lines+markers',
      name: metric,
      line: {
        color: COLORS[ALL_METRICS.indexOf(metric)],
        dash: metric === 'TTP' ? 'dot' : 'solid'
      },
      connectgaps: true,
      hovertemplate: `Age: %{x}<br>${metric}: %{y:.1f}%<br>Raw: %{customdata:.1f}<extra></extra>`
    };
  };

  // 2️⃣ On metric change, do a full Plotly.react with animation
  useEffect(() => {
    const gd = graphDivRef.current;
    if (!gd || rawData.length === 0) return;

    const trace = buildTrace(selectedMetric);
    const vals = rawData.filter(d => d.metric === selectedMetric).map(d => d.value);
    const min = Math.min(...vals),
      max = Math.max(...vals),
      pad = (max - min) * 0.1;

    const { chartTitle, yTitle } = METRIC_CONFIG[selectedMetric] || {};

    // merge base layout + per-metric titles + axis ranges + animation
    const layout = {
      ...BASE_LAYOUT,
      title: { ...BASE_LAYOUT.title, text: chartTitle },
      yaxis: {
        ...BASE_LAYOUT.yaxis,
        autorange: false,
        range: [min - pad, max + pad],
        title: { ...BASE_LAYOUT.yaxis.title, text: yTitle }
      },
      transition: { duration: 700, easing: 'cubic-in-out' },
      frame: { duration: 700 }
    };

    Plotly.react(
      gd,
      [trace],
      layout,
      { responsive: true, displayModeBar: false }
    );
  }, [selectedMetric, rawData]);

  // 3️⃣ Initial mount / loading
  if (rawData.length === 0) return <div>Loading…</div>;

  // 4️⃣ Initial render uses the selectedMetric
  const { chartTitle, yTitle } = METRIC_CONFIG[selectedMetric] || {};
  return (
    <Plot
      data={[buildTrace(selectedMetric)]}
      layout={{
        ...BASE_LAYOUT,
        title: { ...BASE_LAYOUT.title, text: chartTitle },
        yaxis: { ...BASE_LAYOUT.yaxis, title: { ...BASE_LAYOUT.yaxis.title, text: yTitle } }
      }}
      config={{ responsive: true, displayModeBar: false }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      onInitialized={(_, gDiv) => {
        if (!graphDivRef.current) graphDivRef.current = gDiv;
      }}
    />
  );
}
