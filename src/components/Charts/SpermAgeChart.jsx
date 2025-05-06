import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist';

// line colors & metrics
const COLORS = ['#fe4939', '#4fa0f7', '#481231'];
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

// shared base layout
const BASE_LAYOUT = {
  autosize: true,
  aspectratio: { x: 1, y: 0.7 },
  font: { family: 'AtlasBold, serif', size: 10, color: '#333' },
  title: { text: '', font: { family: 'AtlasBold, sans-serif', size: 16 } },
  xaxis: {
    title: { text: 'Paternal Age (years)', font: { family: 'AtlasBold, serif', size: 12, color: '#333' } },
    range: [18, 56],
    tickmode: 'linear',
    tick0: 20,
    dtick: 5,
    showgrid: false
  },
  yaxis: {
    title: { text: '', font: { family: 'AtlasBold, serif', size: 12, color: '#333' } },
    showgrid: false
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  legend: { title: { text: 'Metric' }, x: 0.03, y: 0.5, xanchor: 'left', yanchor: 'top', font: { size: 9 } },
  margin: { t: 50, l: 100, r: 50, b: 50 },
  hovermode: 'closest',
  shapes: [
    { type: 'line', x0: 35, y0: 0, x1: 35, y1: 1, xref: 'x', yref: 'paper', line: { color: '#481231', dash: 'dash' } }
  ],
};

export default function SpermAgeChart({ selectedMetric }) {
  const [rawData, setRawData] = useState([]);
  const graphDivRef = useRef(null);

  // load CSV once
  useEffect(() => {
    fetch('/data/Percent_Change_from_Youngest_Age.csv')
      .then(r => r.text())
      .then(csv => {
        const rows = csv.split('\n').filter(r => r.trim());
        setRawData(rows.slice(1).map(r => {
          const [age, metric, value, rawValue] = r.split(',');
          return { age: +age, metric: metric.trim(), value: +value, rawValue: +rawValue };
        }));
      });
  }, []);

  // build single trace
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

  // animate on metric change
  useEffect(() => {
    const gd = graphDivRef.current;
    if (!gd || rawData.length === 0) return;

    const trace = buildTrace(selectedMetric);
    const vals = rawData.filter(d => d.metric === selectedMetric).map(d => d.value);
    const min = Math.min(...vals), max = Math.max(...vals), pad = (max - min) * 0.2;
    const { chartTitle, yTitle } = METRIC_CONFIG[selectedMetric] || {};

    // prepare update object
    const update = {
      data: [trace],
      layout: {
        ...BASE_LAYOUT,
        title: { ...BASE_LAYOUT.title, text: chartTitle },
        yaxis: {
          ...BASE_LAYOUT.yaxis,
          autorange: false,
          range: [min - pad, max + pad],
          title: { ...BASE_LAYOUT.yaxis.title, text: yTitle }
        }
      }
    };

    const animOpts = {
      transition: { duration: 1200, easing: 'cubic-in-out',fromcurrent: true },
      frame: { duration: 1200, }
    };

    Plotly.animate(gd, update, animOpts);
  }, [selectedMetric, rawData]);

  // initial or loading state
  if (!rawData.length) return <div>Loading…</div>;

  // initial render uses selectedMetric
  const initialTrace = buildTrace(selectedMetric);
  const { chartTitle, yTitle } = METRIC_CONFIG[selectedMetric] || {};

  return (
    <Plot
      data={[initialTrace]}
      layout={{
        ...BASE_LAYOUT,
        title: { ...BASE_LAYOUT.title, text: chartTitle },
        yaxis: { ...BASE_LAYOUT.yaxis, title: { ...BASE_LAYOUT.yaxis.title, text: yTitle } }
      }}
      config={{ responsive: true, displayModeBar: false }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      onInitialized={(_, gDiv) => { graphDivRef.current = gDiv; }}
    />
  );
}
