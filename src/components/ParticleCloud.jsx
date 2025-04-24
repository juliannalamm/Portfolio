import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const CLUSTER_COUNT = 3;
const PARTICLES_PER_CLUSTER = 2000;

export default function ParticleCloud() {
  const ref = useRef();

  const clusterCenters = useMemo(() => [
    new THREE.Vector3(-1.5, 0, 0),
    new THREE.Vector3( 1.5, 0, 0),
    new THREE.Vector3( 0,   0, 1.5),
  ], []);

  // ▶ Build both positions *and* colors in one go:
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(CLUSTER_COUNT * PARTICLES_PER_CLUSTER * 3);
    const col = new Float32Array(CLUSTER_COUNT * PARTICLES_PER_CLUSTER * 3);
    const clusterColors = [
      new THREE.Color('#4fa0f7'),  // blue
      new THREE.Color('#E9A752'),  // yellow
      new THREE.Color('#fe4939'),  // red
    ];
    let idx = 0;

    clusterCenters.forEach((center, ci) => {
      const cc = clusterColors[ci];
      for (let i = 0; i < PARTICLES_PER_CLUSTER; i++) {
        // your gaussian code …
        const gaussian = () => Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
        const variance = [{x:0.6,y:0.4,z:0.2},{x:0.5,y:0.5,z:0.3},{x:0.4,y:0.6,z:0.2}][ci];
        const x = center.x + gaussian() * variance.x;
        const y = center.y + gaussian() * variance.y;
        const z = center.z + gaussian() * variance.z;

        pos.set([x, y, z], idx);
        // ← WRITE THE COLOR INTO THE `col` BUFFER:
        col.set([cc.r, cc.g, cc.b], idx);

        idx += 3;
      }
    });

    return { positions: pos, colors: col };
  }, [clusterCenters]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.02;
  });

  return (
    <group ref={ref} scale={1.9}>
      {/* ▶ PASS `colors` alongside `positions` */}
      <Points positions={positions} colors={colors}>
        <PointMaterial
          vertexColors      // ▶ TELL IT TO USE YOUR COLOR BUFFER
          size={0.018}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
