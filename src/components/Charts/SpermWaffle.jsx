import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import fertileSperm from '../../assets/GoodSperm.svg';
import subfertileSperm from '../../assets/BadSperm.svg';
import {Smile, Skull } from 'lucide-react';

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
          const cluster = row.Subcluster?.trim();
          const status = row['Fertility Status']?.trim();

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
  console.log("Normalized cluster data:", normalizedData);

  return (
    <div className="flex flex-wrap justify-center gap-8 py-8">
      {normalizedData.map(({ clusterId, fertile, subfertile }) => {
        const icons = Array.from({ length: 100 }, (_, i) => {
          const isFertile = i < fertile;
          return (
            <div key={i} className="w-5 h-5 flex items-center justify-center">
            {isFertile ? (
              <Smile size={16} className="text-blue-500" />
            ) : (
              <Skull size={16} className="text-red-500 opacity-60" />
            )}
          </div>
          );
        });

        return (
          <div key={clusterId} className="text-center">
            <h4 className="text-md font-semibold mb-2">Cluster {clusterId}</h4>
            <div className="grid grid-cols-10 gap-[2px]">{icons}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SpermWaffle;
