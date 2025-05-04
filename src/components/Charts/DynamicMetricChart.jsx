// ScrollAnimatedChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist-min';

const DynamicMetricChart = ({ metric = 'Motility', progress = 0 }) => {
  const chartRef = useRef(null);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    fetch('/data/Percent_Change_from_Youngest_Age.csv')
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.split('\n').filter((r) => r.trim().length > 0);
        const parsed = rows.slice(1).map((row) => {
          const [age, metric, value, rawValue] = row.split(',');
          return {
            age: parseFloat(age),
            metric: metric.trim(),
            value: parseFloat(value),
            rawValue: parseFloat(rawValue),
          };
        });
        setFullData(parsed);
      });
  }, []);

  useEffect(() => {
    if (!chartRef.current || fullData.length === 0) return;

    const filtered = fullData.filter((d) => d.metric === metric);
    const pointCount = Math.ceil(progress * filtered.length);
    const visiblePoints = filtered.slice(0, pointCount);

    const x = visiblePoints.map((d) => d.age);
    const y = visiblePoints.map((d) => d.value);
    const customdata = visiblePoints.map((d) => d.rawValue);

    const rawLabel =
      metric === 'Motility' ? 'Raw Motility (%)'
      : metric === 'TTP' ? 'Raw TTP (months)'
      : 'Raw Count (million)';

    const trace = {
      x,
      y,
      customdata,
      type: 'scatter',
      mode: 'lines+markers+text',
      name: metric,
      line: {
        color: metric === 'TTP' ? '#481231' : metric === 'Total Sperm' ? '#4fa0f7' : '#fe4939',
        shape: 'linear',
        dash: metric === 'TTP' ? 'dot' : 'solid',
      },
      hovertemplate: `Age: %{x}<br>${metric}: %{y:.2f}%<br>${rawLabel}: %{customdata:.1f}<extra></extra>`,
      text: y.map((val) => `${val.toFixed(1)}%`),
      textposition: 'bottom center',
      textfont: { size: 11, color: '#333' },
    };

    const yVals = y.length ? y : [0];
    const layout = {
      margin: { t: 40, b: 40, l: 60, r: 30 },
      xaxis: {
        title: 'Paternal Age (years)',
        range: [18, 56],
        tickmode: 'linear',
        dtick: 5,
      },
      yaxis: {
        title: `% Change in ${metric}`,
        range: [Math.min(...yVals) - 5, Math.max(...yVals) + 5],
      },
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      transition: {
        duration: 500,
        easing: 'cubic-in-out'
      },
    };

    Plotly.react(chartRef.current, [trace], layout, { responsive: true });
  }, [progress, metric, fullData]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default DynamicMetricChart;