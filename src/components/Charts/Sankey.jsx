import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import spermData from '../../data/sankeysperm.json';

const { bisect, scaleLinear, line, curveMonotoneX, select, timer } = d3;

const Sankey = () => {
  const containerRef = useRef();

  useEffect(() => {
    // 1) DATA
    const dataset = spermData;

    // 2) ORIGINS & CLUSTERS
    const personNames = ['John', 'Steve'];
    const personIds = [0, 1];
    const clusterNames = [
      'Progressive Motility',
      'Hyperactivated Motility',
      'Intermediate Motility',
    ];
    const clusterIds = [0, 1, 2];

    // 3) CUMULATIVE PROBABILITIES
    const probs = {
      John: [0.4, 0.6, 1.0],  // 20% Intermediate, 40% Hyperactivated, 40% Progressive
      Steve: [0.5, 0.8, 1.0], // 50% Intermediate, 30% Hyperactivated, 20% Progressive
    };

    // 4) SPAWN HELPERx
    let nextId = 0;
    function generatePerson(elapsed) {
      nextId++;
      const pi = Math.floor(Math.random() * personIds.length);
      const pProbs = probs[personNames[pi]];
      const r = Math.random();
      const ci = bisect(pProbs, r);
      return {
        id: nextId,
        personIndex: pi,
        clusterIndex: ci,
        startTime: elapsed,
        yJitter: Math.random() * 30 - 15,
      };
    }

    // 5) DIMENSIONS
    const width = 1000;
    const height = 520;
    const margin = { top: 50, right: 400, bottom: 10, left: 120 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const pathH = 50;

    // 6) SCALES
    const xScale = scaleLinear().domain([0, 1]).range([0, innerW]).clamp(true);
    const yStart = scaleLinear().domain([personIds.length, -1]).range([0, innerH]);
    const yEnd = scaleLinear().domain([clusterIds.length, -1]).range([0, innerH]);
    const yProg = scaleLinear().domain([0.45, 0.55]).range([0, 1]).clamp(true);

    // 7) BUILD TUBES
    const linkGen = line()
      .x((d, i) => (i * innerW) / 5)
      .y((d, i) => (i < 3 ? yStart(d[0]) : yEnd(d[1])))
      .curve(curveMonotoneX);

    const linkData = personIds.flatMap(p =>
      clusterIds.map(c => Array(6).fill([p, c]))
    );

    // 8) SETUP SVG
    const root = select(containerRef.current);
    root.selectAll('*').remove();
    const svg = root.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left + 60},${margin.top})`);

    svg.append('text')
      .attr('x', width / 2 - 40)
      .attr('y', 30) // vertical position
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .attr('font-weight', 'bold')
      .text('Sperm Cluster Distribution: John vs Steve');

    // 9) SPERM SYMBOL
    svg.append('defs')
      .append('symbol')
      .attr('id', 'spermIcon')
      .attr('viewBox', '0 0 32 32')
      .append('g')
      .html(`
        <path d="M24.94 12.3c-3 2.74-5.25.74-6.67 3.16-.57.86-.33 2.4-1.62 3.89a5.76 5.76 0 0 1-4.26 2.22c-3.9.36-3.46 3.4-4.3 4.91a5.05 5.05 0 0 1-3.4 2.52c-1.15.22-2.29 0-3.69 1.25 1.27-1.46 2.55-1.42 3.56-1.76a4.25 4.25 0 0 0 2.57-2.49c.47-1.17 0-2.5 1.09-4a5.51 5.51 0 0 1 3.78-2.52c3.52-.8 2.57-3.48 3.35-5.35a6.35 6.35 0 0 1 4-3.62c1.87-.46 2-.48 2.58-1.2z"/>
        <path d="M27.63 12.6c-2.48 2.48-4.89.5-6.43-1s-3.53-4-1.05-6.43c3.59-3.59 8.47-4.09 10-2.54s1.07 6.37-2.52 9.97z"/>
      `);

    // 10) DRAW TUBES
    g.append('g')
      .selectAll('path')
      .data(linkData)
      .join('path')
      .attr('d', linkGen)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', pathH);

    // // CLUSTER LABELS
    // g.append('g')
    //   .attr('transform', `translate(${innerW + 32}, 0)`)
    //   .selectAll('text')
    //   .data(clusterIds)
    //   .join('text')
    //   .text(d => clusterNames[d])
    //   .attr('x', 0)
    //   .attr('y', d => yEnd(d) - pathH / 2 + 12)
    //   .attr('font-size', 13)
    //   .attr('font-weight', 600)
    //   .attr('text-anchor', 'start')
    //   .attr('fill', 'currentColor');


    // 11) STARTING BARS for John and Steve
    const startBarGroup = g.append('g')
      .attr('transform', `translate(-10, 0)`); // move them a bit left of the starting point

    const startBars = startBarGroup.selectAll('g')
      .data(personIds)
      .join('g')
      .attr('transform', d => `translate(0, ${yStart(d) - pathH / 2})`);

    startBars.append('rect')
      .attr('width', 10)
      .attr('height', pathH)
      .attr('fill', d => d === 0 ? '#D44720' : '#E9a752');

    startBars.append('text')
      .attr('x', -8)
      .attr('y', pathH / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 12)
      .text(d => d === 0 ? 'John' : 'Steve')
      .attr('fill', 'currentColor');


    // 12) LEGEND (John & Steve)
    const legend = g.append('g')
      .attr('transform', `translate(${innerW / 2 - 50}, ${20})`) // move up above the tubes
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor');

    const personLegend = legend.selectAll('g')
      .data(personNames.map((name, i) => ({
        name,
        color: i === 0 ? '#D44720' : '#E9a752',
        xOffset: i * 100,  // space them horizontally
      })))
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.xOffset}, 0)`);

    // Add sperm icon
    personLegend.append('use')
      .attr('href', '#spermIcon')
      .attr('width', 25)
      .attr('height', 25)
      .attr('fill', d => d.color)
      .attr('transform', 'translate(-9, -9)');

    // Add label
    personLegend.append('text')
      .attr('y', 30)
      .attr('font-size', 16)
      .text(d => d.name)
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle');

    const clusterGroup = g.append('g')
      .attr('transform', `translate(${innerW + 32}, 0)`);

    const clusterLabels = clusterGroup.selectAll('g')
      .data(clusterIds)
      .join('g')
      .attr('transform', d => `translate(0, ${yEnd(d) - pathH / 2 + 12})`);



    // 13) STACKED BARS
    const legendBarHeight = 50;
    const legendBarWidth = 25;
    let dataMetrics = clusterIds.map(() => personIds.map(() => 0));

    function drawLegendBars() {
      const clusterData = clusterIds.map(ci => {
        const john = dataMetrics[ci][0];
        const steve = dataMetrics[ci][1];
        const total = john + steve || 1;
        return {
          clusterIndex: ci,
          johnFraction: john / total,
          steveFraction: steve / total,
        };
      });

      g.selectAll('.legend-bar').remove();

      const bars = g.append('g')
        .attr('class', 'legend-bar')
        .attr('transform', `translate(${innerW + 1}, 0)`)
        .selectAll('g')
        .data(clusterData)
        .join('g')
        .attr('transform', d => `translate(0, ${yEnd(d.clusterIndex) - legendBarHeight / 2})`);

      bars.append('rect')
        .attr('width', legendBarWidth)
        .attr('height', d => d.johnFraction * legendBarHeight)
        .attr('y', d => (1 - d.johnFraction) * legendBarHeight)
        .attr('fill', '#D44720');

      bars.append('rect')
        .attr('width', legendBarWidth)
        .attr('height', d => d.steveFraction * legendBarHeight)
        .attr('y', 0)
        .attr('fill', '#E9a752');
    }

    function highlightMetrics() {
      drawLegendBars();

      clusterLabels.selectAll('text').remove(); // Clear old text
      clusterLabels.append('text')
        .text(d => clusterNames[d])
        .attr('font-size', 13)
        .attr('font-weight', 600)
        .attr('text-anchor', 'start')
        .attr('fill', 'currentColor');

      clusterLabels.append('text')
        .text(d => {
          const john = dataMetrics[d][0];
          const steve = dataMetrics[d][1];
          const total = john + steve || 1;
          const johnPct = Math.round((john / total) * 100);
          return `John: ${johnPct}%`;
        })
        .attr('font-size', 10)
        .attr('y', 16)
        .attr('fill', '#D44720')
        .attr('text-anchor', 'start');

      clusterLabels.append('text')
        .text(d => {
          const john = dataMetrics[d][0];
          const steve = dataMetrics[d][1];
          const total = john + steve || 1;
          const stevePct = Math.round((steve / total) * 100);
          return `Steve: ${stevePct}%`;
        })

        .attr('font-size', 10)
        .attr('y', 32)
        .attr('fill', '#E9a752')
        .attr('text-anchor', 'start');




    }


    // 14) ANIMATION
    let people = [];
    const markersG = g.append('g');

    timer(elapsed => {
      const alive = [];
      people.forEach(d => {
        if ((elapsed - d.startTime) / 5000 < 1) alive.push(d);
        else {
          dataMetrics[d.clusterIndex][d.personIndex]++;
        }
      });
      if (alive.length < people.length) highlightMetrics();
      people = alive;

      people.push(generatePerson(elapsed));

      const u = markersG.selectAll('use').data(people, d => d.id);

      const uEnter = u.enter()
        .append('use')
        .attr('href', '#spermIcon')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', d => d.personIndex === 0 ? '#D44720' : '#E9a752')
        .style('opacity', 0);

      uEnter.transition().duration(200)
        .style('opacity', 0.8);

      uEnter.merge(u)
        .attr('transform', d => {
          const t = (elapsed - d.startTime) / 5000;
          const x = xScale(t);
          const y0 = yStart(d.personIndex);
          const y1 = yEnd(d.clusterIndex);
          const y = y0 + (y1 - y0) * yProg(t) + d.yJitter;
          return `translate(${x - 6}, ${y - 6})`;
        })
        .style('opacity', d => {
          const t = (elapsed - d.startTime) / 5000;
          if (t < 0.8) return 0.8;
          if (t < 1) return 0.8 * (1 - (t - 0.8) / 0.2);
          return 0;
        });

      u.exit()
        .transition().duration(200)
        .style('opacity', 0)
        .remove();
    });

  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Sankey;
