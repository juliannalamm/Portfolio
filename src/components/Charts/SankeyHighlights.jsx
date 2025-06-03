import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const { bisect, scaleLinear, line, curveMonotoneX, select, timer } = d3;

const SankeyHighlights = () => {
  const containerRef = useRef();
  const timerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible && timerRef.current) {
      timerRef.current.stop();
      timerRef.current = null;
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const clusterNames = [
      'Progressive Motility',
      'Hyperactivated Motility',
      'Intermediate Motility',
    ];
    const clusterIds = [0, 1, 2];
    let nextId = 0;
    function generateSperm(elapsed) {
      nextId++;
      const r = Math.random();
      const ci = bisect([0.33, 0.66, 1.0], r);
      return {
        id: nextId,
        clusterIndex: ci,
        startTime: elapsed,
        yJitter: Math.random() * 30 - 15,
      };
    }

    const width = 1000;
    const height = 520;
    const margin = { top: 50, right: 400, bottom: 10, left: 120 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const pathH = 50;
    const xScale = scaleLinear().domain([0, 1]).range([0, innerW]).clamp(true);
    const yStart = innerH / 2;
    const yEnd = scaleLinear().domain([clusterIds.length, -1]).range([0, innerH]);
    const yProg = scaleLinear().domain([0.45, 0.55]).range([0, 1]).clamp(true);

    const linkGen = line()
      .x((d, i) => (i * innerW) / 5)
      .y((d, i) => (i < 3 ? yStart : yEnd(d[1])))
      .curve(curveMonotoneX);
    const linkData = clusterIds.map(c => Array(6).fill([0, c]));

    const root = select(containerRef.current);
    root.selectAll('*').remove();
    const svg = root.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left + 60},${margin.top})`);

    svg.append('defs')
      .append('symbol')
      .attr('id', 'spermIcon')
      .attr('viewBox', '0 0 32 32')
      .append('g')
      .html(`
        <path d="M24.94 12.3c-3 2.74-5.25.74-6.67 3.16-.57.86-.33 2.4-1.62 3.89a5.76 5.76 0 0 1-4.26 2.22c-3.9.36-3.46 3.4-4.3 4.91a5.05 5.05 0 0 1-3.4 2.52c-1.15.22-2.29 0-3.69 1.25 1.27-1.46 2.55-1.42 3.56-1.76a4.25 4.25 0 0 0 2.57-2.49c.47-1.17 0-2.5 1.09-4a5.51 5.51 0 0 1 3.78-2.52c3.52-.8 2.57-3.48 3.35-5.35a6.35 6.35 0 0 1 4-3.62c1.87-.46 2-.48 2.58-1.2z"/>
        <path d="M27.63 12.6c-2.48 2.48-4.89.5-6.43-1s-3.53-4-1.05-6.43c3.59-3.59 8.47-4.09 10-2.54s1.07 6.37-2.52 9.97z"/>
      `);

    g.append('g')
      .selectAll('path')
      .data(linkData)
      .join('path')
      .attr('d', linkGen)
      .attr('fill', 'none')
      .attr('stroke', '#bfdaf7')
      .attr('stroke-width', pathH);

    g.append('rect')
      .attr('x', -10)
      .attr('y', yStart - pathH / 2)
      .attr('width', 10)
      .attr('height', pathH)
      .attr('fill', '#E9a752');

    const labelGroup = g.append('g')
      .attr('transform', `translate(${innerW},3)`);

    const legendBars = labelGroup.selectAll('g')
      .data(clusterIds)
      .join('g')
      .attr('transform', d => `translate(0,${yEnd(d) - 28})`);

    legendBars.append('rect')
      .attr('width', 25)
      .attr('height', 50)
      .attr('fill', '#E9a752');

    legendBars.append('text')
      .text(d => clusterNames[d])
      .attr('x', 30)
      .attr('y', 15)
      .attr('font-size', 13)
      .attr('fill', '#481231')
      .attr('font-family', 'AtlasBold');

      const counterTexts = legendBars.append('text')
      .attr('x', 100)
      .attr('y', 35)
      .attr('font-size', 12)
      .attr('fill', '#481231')
      .attr('font-family', 'AtlasBold');

    const markersG = g.append('g');
    let dataMetrics = clusterIds.map(() => [0]);
    let people = [];

    timerRef.current = timer(elapsed => {
      const alive = [];
      people.forEach(d => {
        if ((elapsed - d.startTime) / 5000 < 1) {
          alive.push(d);
        } else {
          dataMetrics[d.clusterIndex][0]++;
        }
      });
      people = alive;

      people.push(generateSperm(elapsed));

      counterTexts.text((d, i) => `Count: ${dataMetrics[i][0]}`);

      const u = markersG.selectAll('use').data(people, d => d.id);
      const uEnter = u.enter()
        .append('use')
        .attr('href', '#spermIcon')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', '#E9a752')
        .style('opacity', 0);

      uEnter.transition().duration(200).style('opacity', 0.8);

      uEnter.merge(u)
        .attr('transform', d => {
          const t = (elapsed - d.startTime) / 5000;
          const x = xScale(t);
          const y0 = yStart;
          const y1 = yEnd(d.clusterIndex);
          const y = y0 + (y1 - y0) * yProg(t) + d.yJitter;
          return `translate(${x - 6},${y - 6})`;
        })
        .style('opacity', d => {
          const t = (elapsed - d.startTime) / 5000;
          if (t < 0.8) return 0.8;
          if (t < 1) return 0.8 * (1 - (t - 0.8) / 0.2);
          return 0;
        });

      u.exit().transition().duration(200).style('opacity', 0).remove();
    });

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default SankeyHighlights;