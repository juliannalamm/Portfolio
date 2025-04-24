import { Canvas } from '@react-three/fiber';
import ParticleCloud from './ParticleCloud';

const HeroCloud = () => {
  return (
    <div className="h-screen w-full bg-black relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleCloud />
      </Canvas>
      <div className="absolute top-1/3 w-full text-center text-white">
        <h1 className="text-4xl font-bold">Visualizing Sperm Movement Patterns</h1>
      </div>
    </div>
  );
};

export default Hero;
