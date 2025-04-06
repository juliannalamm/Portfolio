import React, { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

// Replace with your actual file paths or uploads
const TRAJECTORY_CSV = "/data/subclustered_bb.csv";
const METADATA_CSV = "/data/subkmeans_w_metadata.csv";

const TrajectoryPlot = () => {
  const [trajectoryData, setTrajectoryData] = useState([]);
  const [metadata, setMetadata] = useState([]);

  // Load both CSVs
  useEffect(() => {
    Papa.parse(TRAJECTORY_CSV, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => setTrajectoryData(result.data),
    });

    Papa.parse(METADATA_CSV, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => setMetadata(result.data),
    });
  }, []);

  // Select first 10 FIDs
  const selectedFids = useMemo(() => {
    const fids = metadata.map((row) => row.fid).filter(Boolean);
    return fids.slice(0, 10);
  }, [metadata]);

  // Filter trajectory data for selected FIDs
  const filteredTrajectories = useMemo(() => {
    const grouped = {};
    trajectoryData
      .filter((row) => selectedFids.includes(row.fid))
      .forEach((row) => {
        if (!grouped[row.fid]) grouped[row.fid] = [];
        grouped[row.fid].push(row);
      });

    // Sort each trajectory by frame number
    Object.values(grouped).forEach((points) =>
      points.sort((a, b) => a.frame_number - b.frame_number)
    );
    return grouped;
  }, [trajectoryData, selectedFids]);

  // Plotly traces
  const traces = useMemo(() => {
    return Object.entries(filteredTrajectories).map(([fid, points]) => {
      return {
        x: points.map((p) => p.center_x_um),
        y: points.map((p) => p.center_y_um),
        mode: "lines+markers",
        name: `FID: ${fid}`,
        text: points.map(
          (p) => `Frame: ${p.frame_number}<br>Cluster: ${p.Subcluster}`
        ),
        hoverinfo: "text+name",
      };
    });
  }, [filteredTrajectories]);

  return (
    <div>
      <h2>Trajectory Plot for 10 FIDs</h2>
      <Plot
        data={traces}
        layout={{
          title: "Trajectory Plot",
          xaxis: { title: "center_x_um" },
          yaxis: { title: "center_y_um" },
          height: 700,
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default TrajectoryPlot;
