// HeroCloud.jsx
import { Canvas } from '@react-three/fiber';
import ParticleCloud from './ParticleCloud';
import { OrbitControls } from '@react-three/drei';

const HeroCloud = () => {
  return (
    <div className="h-screen w-full bg-black relative">
      <Canvas
        camera={{
          position: [0, 0, 8],   // x=0, y=0, z=8 → straight-on
          fov: 75,
          near: 0.1,
          far: 50,
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleCloud />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          // lock vertical movement so you stay at y=0
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      <div className="absolute top-1/3 w-full text-center text-white pointer-events-none">
        <h1 className="text-4xl font-bold">
          Visualizing Sperm Movement Patterns
        </h1>
      </div>
    </div>
  );
};

export default HeroCloud;
