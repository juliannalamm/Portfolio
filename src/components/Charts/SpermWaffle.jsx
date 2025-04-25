import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';


const SpermIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Sperm">
      <path d="M24.94 12.3c-3 2.74-5.25.74-6.67 3.16-.57.86-.33 2.4-1.62 3.89a5.76 5.76 0 0 1-4.26 2.22c-3.9.36-3.46 3.4-4.3 4.91a5.05 5.05 0 0 1-3.4 2.52c-1.15.22-2.29 0-3.69 1.25 1.27-1.46 2.55-1.42 3.56-1.76a4.25 4.25 0 0 0 2.57-2.49c.47-1.17 0-2.5 1.09-4a5.51 5.51 0 0 1 3.78-2.52c3.52-.8 2.57-3.48 3.35-5.35a6.35 6.35 0 0 1 4-3.62c1.87-.46 2-.48 2.58-1.2z" />
      <path d="M27.63 12.6c-2.48 2.48-4.89.5-6.43-1s-3.53-4-1.05-6.43c3.59-3.59 8.47-4.09 10-2.54s1.07 6.37-2.52 9.97z" />
    </g>
  </svg>
);

const SQUARES_PER_ROW = 10;

const SpermWaffle = () => {
  const [normalizedData, setNormalizedData] = useState([]);

  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const counts = {};

        data.forEach(row => {
          const cluster = row.Subcluster
          const status = row['Fertility Status']

          if (!counts[cluster]) {
            counts[cluster] = { Fertile: 0, Subfertile: 0 };
          }

          if (status === 'Fertile' || status === 'Subfertile') {
            counts[cluster][status]++;
          }
        });

        const normalized = Object.entries(counts).map(([clusterId, values]) => {
          const total = values.Fertile + values.Subfertile;
          const scale = total > 0 ? 100 / total : 0;
          return {
            clusterId,
            fertile: Math.round(values.Fertile * scale),
            subfertile: Math.round(values.Subfertile * scale)
          };
        });

        setNormalizedData(normalized);
      },
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 py-8">
      {normalizedData.map(({ clusterId, fertile }) => {
        const icons = Array.from({ length: 100 }, (_, i) => {
          const isFertile = i < fertile;
          return (
            <div key={i} className="w-5 h-5 flex items-center justify-center">
              <SpermIcon className={isFertile ? "w-4 h-4 text-blue-500" : "w-4 h-4 text-red-500 opacity-60"} />
            </div>
          );
        });

        return (
          <div key={clusterId} className="text-center">
            <h4 className="text-md font-semibold mb-2">Cluster {clusterId}</h4>
            <div className="grid grid-cols-10 gap-[2px]">{icons}</div>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-bold text-lg">{fertile}</span><br />
              in 100 spermatozoa are fertile
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SpermWaffle;
