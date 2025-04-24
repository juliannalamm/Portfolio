import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const CLUSTER_COUNT = 3;
const PARTICLES_PER_CLUSTER = 2000;

export default function ParticleCloud() {
  const ref = useRef();

  // Cluster distance for the 3 groups
  const clusterCenters = useMemo(() => [
    new THREE.Vector3(-1.5, 0, 0),
    new THREE.Vector3(1.5, 0, 0),
    new THREE.Vector3(0, 0, 1.5),
  ], []);

  // Generate particle positions around each cluster center
  const positions = useMemo(() => {
    const pos = new Float32Array(CLUSTER_COUNT * PARTICLES_PER_CLUSTER * 3);
    let index = 0;

    clusterCenters.forEach((center) => {
      for (let i = 0; i < PARTICLES_PER_CLUSTER; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.6 + Math.random() * 0.4;

        const x = center.x + r * Math.sin(phi) * Math.cos(theta);
        const y = center.y + r * Math.sin(phi) * Math.sin(theta);
        const z = center.z + r * Math.cos(phi);

        pos.set([x, y, z], index);
        index += 3;
      }
    });

    return pos;
  }, [clusterCenters]);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // [-1, 1] normalized pointer position

    // Slight rotation and mouse drift
    ref.current.rotation.y = t * 0.2 + x * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1 + y * 0.3;
  });

  return (
    <group ref={ref} scale={1.9}> {/* ← scale up the whole cloud */}
    <Points positions={positions}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  </group>
);
}
