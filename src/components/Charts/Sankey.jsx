// AnimatedSankey.jsx
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
      'Intermediate Motility',
      'Hyperactivated Motility',
      'Progressive Motility',
    ];
    const clusterIds = [0, 1, 2];

    // 3) CUMULATIVE PROBABILITIES
    const probs = {};
    dataset.forEach(row => {
      const total = row.Intermediate + row.Hyperactivated + row.Progressive;
      probs[row.person] = [
        row.Intermediate / total,
        (row.Intermediate + row.Hyperactivated) / total,
        1,
      ];
    });

    // 4) SPAWN HELPER
    let nextId = 0;
    function generatePerson(elapsed) {
      nextId++;
      const pi = Math.floor(Math.random() * personIds.length);
      const name = personNames[pi];
      const pProbs = probs[name];
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
    const barWidth = 14;
    const barPadding = 4;

    // 6) SCALES & LINK GENERATOR
    const xScale = scaleLinear().domain([0, 1]).range([0, innerW]).clamp(true);
    const yStart = scaleLinear().domain([personIds.length, -1]).range([0, innerH]);
    const yEnd = scaleLinear().domain([clusterIds.length, -1]).range([0, innerH]);
    const yProg = scaleLinear().domain([0.45, 0.55]).range([0, 1]).clamp(true);

    const LINK_PTS = 6;
    const linkGen = line()
      .x((d, i) => (i * innerW) / (LINK_PTS - 1))
      .y((d, i) => (i < LINK_PTS / 2 ? yStart(d[0]) : yEnd(d[1])))
      .curve(curveMonotoneX);

    // 7) BUILD BACKGROUND TUBES
    const linkData = personIds.flatMap(p =>
      clusterIds.map(c => Array(LINK_PTS).fill([p, c]))
    );

    // 8) SET UP SVG CONTAINER
    const root = select(containerRef.current);
    root.selectAll('*').remove();
    const svg = root
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // 9) DEFINE SPERM SYMBOL
    svg.append('defs')
      .append('symbol')
        .attr('id', 'spermIcon')
        .attr('viewBox', '0 0 32 32')
      .append('g')
        .html(`
          <path d="M24.94 12.3c-3 2.74-5.25.74-6.67 3.16-.57.86-.33 2.4-1.62 3.89a5.76 5.76 0 0 1-4.26 2.22c-3.9.36-3.46 3.4-4.3 4.91a5.05 5.05 0 0 1-3.4 2.52c-1.15.22-2.29 0-3.69 1.25 1.27-1.46 2.55-1.42 3.56-1.76a4.25 4.25 0 0 0 2.57-2.49c.47-1.17 0-2.5 1.09-4a5.51 5.51 0 0 1 3.78-2.52c3.52-.8 2.57-3.48 3.35-5.35a6.35 6.35 0 0 1 4-3.62c1.87-.46 2-.48 2.58-1.2z"/>
          <path d="M27.63 12.6c-2.48 2.48-4.89.5-6.43-1s-3.53-4-1.05-6.43c3.59-3.59 8.47-4.09 10-2.54s1.07 6.37-2.52 9.97z"/>
        `);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 10) JOHN & STEVE LEGEND
    const legend = g.append('g').attr('transform', `translate(${innerW - 120}, -20)`);
    legend
      .selectAll('g')
      .data(
        personNames.map((n, i) => ({
          name: n,
          color: i === 0 ? '#D44720' : '#E9a752',
          y: i * 20,
        }))
      )
      .enter()
      .append('g')
        .attr('transform', d => `translate(0,${d.y})`)
      .call(sel => {
        sel.append('circle').attr('r', 6).attr('fill', d => d.color);
        sel.append('text')
          .text(d => d.name)
          .attr('x', 12)
          .attr('dominant-baseline', 'middle')
          .attr('font-size', 12);
      });

    // 11) DRAW TUBES
    g.append('g')
      .selectAll('path')
      .data(linkData)
      .join('path')
        .attr('d', linkGen)
        .attr('fill', 'none')
        .attr('stroke', '#fff')
        .attr('stroke-width', pathH);

    // 11.5) CLUSTER LABELS (right side)
    const clusterLabelGroup = g.append('g')
      .attr('transform', `translate(${innerW + 32}, 0)`)
      .attr('text-anchor', 'start')
      .attr('fill', 'currentColor');

    clusterLabelGroup
      .selectAll('g')
      .data(clusterIds)
      .enter()
      .append('g')
        .attr('transform', d => `translate(0, ${yEnd(d) - pathH/2 + 12})`)
      .append('text')
        .text(d => clusterNames[d])
        .attr('font-size', 13)
        .attr('font-weight', 600)
        .style('text-transform', 'capitalize');

    // 12) METRICS (bar charts) SETUP
    const metricsG = g.append('g').attr('transform', `translate(${innerW},0)`);
    let dataMetrics = clusterIds.map(() => personIds.map(() => 0));
    const heightScale = scaleLinear().range([0, pathH]);

    function highlightMetrics() {
      const flat = clusterIds.flatMap(ci => {
        const counts = dataMetrics[ci];
        const total = counts[0] + counts[1];
        heightScale.domain([0, total]);
        return personIds.map(pi => ({
          clusterIndex: ci,
          personIndex: pi,
          count: counts[pi],
          total,
        }));
      });

      metricsG
        .selectAll('rect')
        .data(flat, d => `${d.clusterIndex}-${d.personIndex}`)
        .join('rect')
          .attr('fill', d => (d.personIndex === 0 ? '#D44720' : '#E9a752'))
          .attr('width', barWidth)
          .style('opacity', 0.8)
        .transition()
        .duration(200)
          .attr('transform', d => {
            const x = -barWidth + (barWidth + barPadding) * d.personIndex;
            const y0 = yEnd(d.clusterIndex) - pathH / 2;
            const h = heightScale(d.count);
            return `translate(${x},${y0 + (pathH - h)})`; 
          })
          .attr('height', d => heightScale(d.count));

      metricsG
        .selectAll('text')
        .data(flat, d => `lbl-${d.clusterIndex}-${d.personIndex}`)
        .join('text')
          .attr('font-size', 10)
          .attr('fill', '#000')
          .text(d => d.count)
        .transition()
        .duration(200)
          .attr('transform', d => {
            const x = -barWidth + (barWidth + barPadding) * d.personIndex + barWidth / 2;
            const y0 = yEnd(d.clusterIndex) - pathH / 2;
            const h = heightScale(d.count);
            return `translate(${x},${y0 + (pathH - h/2)})`;
          })
          .attr('text-anchor', 'middle');
    }

    highlightMetrics();

    // 13) ANIMATE SPERM ICONS
    let people = [];
    const markersG = g.append('g');

    timer(elapsed => {
      // remove & tally finished
      const alive = [];
      people.forEach(d => {
        if ((elapsed - d.startTime) / 5000 < 1) alive.push(d);
        else {
          dataMetrics[d.clusterIndex][d.personIndex]++;
        }
      });
      if (alive.length < people.length) highlightMetrics();
      people = alive;
    
      // spawn a new sperm
      people.push(generatePerson(elapsed));
    
      // BIND sperm <use> icons
      const u = markersG.selectAll('use').data(people, d => d.id);
    
      // ENTER selection (new sperm)
      const uEnter = u.enter()
        .append('use')
          .attr('href', '#spermIcon')
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', d => d.personIndex === 0 ? '#D44720' : '#E9a752')
          .style('opacity', 0);
    
      // Fade-in new sperm
      uEnter.transition().duration(200)
        .style('opacity', 0.8);
    
      // MERGE and UPDATE
      uEnter.merge(u)
        .attr('transform', d => {
          const t = (elapsed - d.startTime) / 5000;
          const x = xScale(t);
          const y0 = yStart(d.personIndex);
          const y1 = yEnd(d.clusterIndex);
          const y  = y0 + (y1 - y0) * yProg(t) + d.yJitter;
          return `translate(${x - 6}, ${y - 6})`;
        })
        .style('opacity', d => {
          const t = (elapsed - d.startTime) / 5000;
          if (t < 0.8) return 0.8;                      // full opacity until 80% of trip
          if (t < 1.0) return 0.8 * (1 - (t - 0.8) / 0.2); // fade from 0.8 to 0
          return 0;
        });
    
      // EXIT selection
      u.exit()
        .transition().duration(200)
        .style('opacity', 0)
        .remove();
    });
    

  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Sankey;
