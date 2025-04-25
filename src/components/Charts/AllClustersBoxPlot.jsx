import React from 'react';
import Plot from 'react-plotly.js';

const clusterColors = {
  0: '#4fa0f7',
  1: '#E9a752',
  2: '#fe4939'
};

const metrics = ['VCL', 'VAP', 'VSL', 'LIN', 'WOB', 'STR', 'ALH Max'];

const AllClustersBoxPlot = ({ chartData }) => {
  const clusters = Array.from(new Set(chartData.clusters)); // remove duplicates, turn set into array, unique values from original 

  //need to flatten it so cluster numbers are aligned with data
  const points = clusters.flatMap(cluster => {
    const indices = chartData.clusters
      .map((c, i) => String(c).trim() === cluster ? i : null)
      .filter(i => i !== null);

    //loop over all metrics (i.e. VCL, VAP, VSL, etc.) 
    return metrics.map(metric => {
      const values = indices
        .map(i => chartData[metric][i]) // for each metric, create a new array of values that will be a trace 
        .filter(value => value != null) // if value is not null 
        .sort((val1, val2) => val1 - val2)         // sort values in ascendinng order for min max calc

      if (values.length === 0) return null;

      const min = values[0];
      const max = values[values.length - 1];
      const median = values[Math.floor((values.length - 1) / 2)];

      return {
        x: Array(values.length).fill(metric),
        y: values,
        name: `Cluster ${cluster}`,
        type: 'box',
        boxpoints: 'outliers',
        jitter: 0.3,
        pointpos: 0,
        marker: { color: clusterColors[cluster] },
        fillcolor: clusterColors[cluster],
        legendgroup: `cluster-${cluster}`,
        showlegend: metric === metrics[0],
        offsetgroup: cluster,
        hoveron: 'boxes+points',
        customdata: Array(values.length).fill([min, median, max]),
        hovertemplate: [
          'Metric: %{x}<br>',
          'Min: %{customdata[0]}<br>',
          'Median: %{customdata[1]}<br>',
          'Max: %{customdata[2]}',
          '<extra></extra>'
        ].join('')
      };
    }).filter(Boolean);
  });

  return (
    <Plot
      data={points}
      layout={{
        title: {
          text: 'All Clusters: Metric Distributions',
          font: { size: 18, color: 'white' }
        },
        font: {
          family: 'AtlasBold, sans-serif',
          color: 'white'
        },
        margin: { t: 40, b: 80, l: 50, r: 20 },
        xaxis: {
          title: 'Kinematic Metric',
          type: 'category',
          tickangle: -45,
          automargin: true,
          showgrid: false,
          showline: true,
          linecolor: 'white',
          tickfont: { color: 'white' }
        },
        yaxis: {
          title: 'Value',
          automargin: true,
          showgrid: false,
          showline: true,
          linecolor: 'white',
          tickfont: { color: 'white' }
        },
        boxmode: 'group',
        showlegend: true,
        legend: {
          orientation: 'h',
          x: 0.4,
          y: 0.9,
          font: { color: 'white' }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }}
      config={{ responsive: true, displayModeBar: false }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default AllClustersBoxPlot;
