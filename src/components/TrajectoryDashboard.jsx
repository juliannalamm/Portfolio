import ClusterTrajectoryViewer from './ClusterTrajectoryViewer';

const TrajectoryDashboard = ({ coordinateData }) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <ClusterTrajectoryViewer clusterId={0} coordinateData={coordinateData} />
      <ClusterTrajectoryViewer clusterId={1} coordinateData={coordinateData} />
      <ClusterTrajectoryViewer clusterId={2} coordinateData={coordinateData} />
    </div>
  );
};
