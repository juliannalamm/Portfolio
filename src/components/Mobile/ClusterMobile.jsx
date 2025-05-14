import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ClusteringChartMobile from './ClusteringChartMobile';
import TrajectoryViewer from '../Charts/TrajectoryViewer';
import { Shapes } from 'lucide-react';

const ClusterMobile = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedFid, setSelectedFid] = useState(null);
  const [coordinateData, setCoordinateData] = useState(null);

  // Load clustering data
  useEffect(() => {
    Papa.parse('/data/subkmeans_with_fertility_label.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.filter(row => row.Centroid === "False");
        setChartData({
          x: data.map(row => parseFloat(row['PCA Feature 1'])),
          y: data.map(row => parseFloat(row['PCA Feature 2'])),
          clusters: data.map(row => row.Subcluster || ""),
          participant: data.map(row => row.participant),
          fid: data.map(row => row.fid)
        });
      }
    });
  }, []);

  // Load coordinate data
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
          bb1: data.map(row => parseFloat(row.bb1))
        });
      }
    });
  }, []);

  if (!chartData || !coordinateData) {
    return <div className="text-burgundy p-4">Loading clustering chart…</div>;
  }

  return (
    <div className="bg-lightblue p-6 rounded-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Shapes className="text-orangebright w-8 h-8" />
        <h3 className="text-lg font-semibold text-burgundy">
          Sperm Clustering Visualization
        </h3>
      </div>

      <div className="mb-6">
        <ClusteringChartMobile
          chartData={chartData}
          onClickFid={setSelectedFid}  
        />
      </div>

      <div className="flex justify-center">
        <TrajectoryViewer fid={selectedFid} coordinateData={coordinateData} />
      </div>
    </div>
  );
};

export default ClusterMobile;
