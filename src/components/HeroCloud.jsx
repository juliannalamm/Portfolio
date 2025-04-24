import { Canvas } from '@react-three/fiber';
import ParticleCloud from './ParticleCloud';
import { OrbitControls } from '@react-three/drei';

const HeroCloud = () => {
  return (
    <div className="h-screen w-full bg-burgundy relative">
      <Canvas
        // 1) Place camera right at cluster 0's center:
        camera={{ position: [-1.5, 0, 0], fov: 75, near: 0.1, far: 20 }}
      >
        <ambientLight intensity={0.5} />

        <ParticleCloud />

        {/* 
         2) Let the user look around, but lock zoom/pan so they stay “inside” 
        */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          // optional: limit vertical tilt so “ground” stays down
          maxPolarAngle={Math.PI * 0.49}
          minPolarAngle={Math.PI * 0.01}
        />
      </Canvas>

      <div className="absolute top-1/3 w-full text-center text-white pointer-events-none">
        <h1 className="text-4xl font-bold">
          Kmeans Clustering of Motility Patterns
        </h1>
      </div>
    </div>
  );
};

export default HeroCloud;
