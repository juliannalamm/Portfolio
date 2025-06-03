// hooks/useSpermChartData.js
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useSpermChartData = () => {
  const [chartData, setChartData] = useState(null);
  const [coordinateData, setCoordinateData] = useState(null);

  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        const pointsOnly = data.filter(row => row.Centroid === "False");

        setChartData({
          x: pointsOnly.map(row => parseFloat(row['PCA Feature 1'])),
          y: pointsOnly.map(row => parseFloat(row['PCA Feature 2'])),
          clusters: pointsOnly.map(row => row.Subcluster || ""),
          participant: pointsOnly.map(row => row.participant),
          fid: pointsOnly.map(row => row.fid),
          VCL: pointsOnly.map(row => parseFloat(row.VCL)),
          VSL: pointsOnly.map(row => parseFloat(row.VSL)),
          VAP: pointsOnly.map(row => parseFloat(row.VAP)),
          LIN: pointsOnly.map(row => parseFloat(row.LIN)),
          WOB: pointsOnly.map(row => parseFloat(row.WOB)),
          STR: pointsOnly.map(row => parseFloat(row.STR)),
          "ALH Max": pointsOnly.map(row => parseFloat(row["ALH Max"]))
 
        });
      },
      error: (err) => console.error("Error parsing subkmeans CSV:", err)
    });
  }, []);

  useEffect(() => {
    Papa.parse('/data/subclustered_bb.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        setCoordinateData({
          fid: data.map(row => row.fid),
          bb0: data.map(row => parseFloat(row.bb0)),
          bb1: data.map(row => parseFloat(row.bb1)),
        });
      },
      error: (err) => console.error("Error parsing coordinate CSV:", err)
    });
  }, []);

  return { chartData, coordinateData };
};

export default useSpermChartData;
