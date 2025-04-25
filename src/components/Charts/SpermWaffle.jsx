import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const clusterTitles = {
  0: 'Cluster 0 – Intermediate Motility',
  1: 'Cluster 1 – Hyperactivated Motility',
  2: 'Cluster 2 – Progressive Motility',
};

const SpermIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M24.94 12.3c-3 2.74-5.25.74-6.67 3.16-.57.86-.33 2.4-1.62 3.89a5.76 5.76 0 0 1-4.26 2.22c-3.9.36-3.46 3.4-4.3 4.91a5.05 5.05 0 0 1-3.4 2.52c-1.15.22-2.29 0-3.69 1.25 1.27-1.46 2.55-1.42 3.56-1.76a4.25 4.25 0 0 0 2.57-2.49c.47-1.17 0-2.5 1.09-4a5.51 5.51 0 0 1 3.78-2.52c3.52-.8 2.57-3.48 3.35-5.35a6.35 6.35 0 0 1 4-3.62c1.87-.46 2-.48 2.58-1.2z" />
      <path d="M27.63 12.6c-2.48 2.48-4.89.5-6.43-1s-3.53-4-1.05-6.43c3.59-3.59 8.47-4.09 10-2.54s1.07 6.37-2.52 9.97z" />
    </g>
  </svg>
);

const SpermWaffle = () => {
  const [clusterData, setClusterData] = useState([]);

  useEffect(() => {
    
    //load csv 
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const counts = {};

        // for each subcluster, count the number of fertile and subfertile sperm from the column 
        data.forEach(({ Subcluster, 'Fertility Status': status }) => {
          if (!counts[Subcluster]) {
            counts[Subcluster] = { Fertile: 0, Subfertile: 0 };
          }

          if (status === 'Fertile' || status === 'Subfertile') {
            counts[Subcluster][status]++;
          }
        });

        //divide the counts by 100 for percentage
        const normalized = Object.entries(counts).map(([id, { Fertile, Subfertile }]) => {
          const total = Fertile + Subfertile;
          const scale = 100 / total;

          return {
            clusterId: id,
            fertile: Math.round(Fertile * scale),
            subfertile: Math.round(Subfertile * scale),
          };
        });

        setClusterData(normalized);
      },
    });
  }, []);

  return (
    <section className="text-center px-4 py-8">
      {/* Chart Title */}
      <h2 className="text-xl font-bold text-burgundy mb-4">
        Number of Fertile Sperm by Cluster
      </h2>
  
      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mb-6 text-sm text-burgundy">
        <div className="flex items-center gap-2">
        <SpermIcon className="w-6 h-6 text-blue-500" />
          <span>Fertile</span>
        </div>
        <div className="flex items-center gap-2">
        <SpermIcon className="w-6 h-6 text-red-500" />
          <span>Subfertile</span>
        </div>
      </div>
  
      {/* Waffle Charts */}
      <div className="flex flex-wrap justify-center gap-8">
        {clusterData.map(({ clusterId, fertile }) => (
          <div key={clusterId} className="text-center text-burgundy">
            <h4 className="text-md font-semibold mb-5">
              {clusterTitles[clusterId]}
            </h4>
            <div className="grid grid-cols-10 gap-[2px]">
              {Array.from({ length: 100 }, (_, i) => (
                <div key={i} className="w-5 h-5 flex items-center justify-center">
                  <SpermIcon
                    className={i < fertile
                      ? 'w-5 h-5 text-blue-500'
                      : 'w-5 h-5 text-red-500 '}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm mt-2">
              <span className="font-bold text-lg">{fertile}</span><br />
              in 100 spermatozoa are fertile
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};  
export default SpermWaffle;
