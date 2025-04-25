import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Sankey = () => {
  const [flowProgress, setFlowProgress] = useState(0);

  // Animate flow growing in
  useEffect(() => {
    let animationFrame;
    let start = performance.now();

    const animateFlow = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / 2000, 1); // Animate over 2 seconds
      const eased = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      setFlowProgress(eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateFlow);
      }
    };

    animationFrame = requestAnimationFrame(animateFlow);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // intermediate, hyperactivated, progressive
  const fullLinkValues = [
    4, 1, 3,   // John's distribution
    2, 1, 1     // Steve's distribution
  ];

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <h2 className="text-center text-xl md:text-2xl font-bold text-burgundy mb-6" style={{ fontFamily: 'AtlasBold, serif' }}>
        Clustering Distribution of Motile Sperm
      </h2>
      <Plot
        data={[
          {
            type: 'sankey',
            orientation: 'h',
            node: {
              pad: 15,
              thickness: 20,
              line: {
                color: 'black',
                width: 0.5
              },
              label: [
                "John - Motile",
                "Steve - Motile",
                "Intermediate Motility",
                "Hyperactivated Motility",
                "Progressive Motility"
              ],
              color: [
                '#D44720',  // John node
                '#E9a752',  // Steve node
                '#accab2',  // Cluster nodes
                '#accab2',
                '#accab2'
              ]
            },
            link: {
              source: [
                0, 0, 0,   // John to clusters
                1, 1, 1    // Steve to clusters
              ],
              target: [
                2, 3, 4,
                2, 3, 4
              ],
              value: fullLinkValues.map(v => v * flowProgress),
              color: [
                '#D44720', '#D44720', '#D44720',  // John's flows
                '#E9a752', '#E9a752', '#E9a752'   // Steve's flows
              ]
            }
          }
        ]}
        layout={{
          title: '',
          font: { size: 14 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 20, l: 30, r: 30, b: 30 }
        }}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler
      />
    </div>
  );
};

export default Sankey;
