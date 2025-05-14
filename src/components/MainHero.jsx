'use client';

import { Canvas } from '@react-three/fiber';
import Particles from './Particles';

export default function MainHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Canvas layer */}
      <Canvas
        className="absolute inset-0 w-full h-full z-0"
        camera={{ position: [0, 0, 6], fov: 75 }}
      >
        {/* ✨ NEW — solid black clear‑colour */}
        <color attach="background" args={['#000000']} />

        <ambientLight intensity={0.8} />
        <Particles />
      </Canvas>

      {/* Text & button overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Transcending&nbsp;Biologics,<br />Revolutionizing&nbsp;Medicine
        </h1>
        <button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-semibold tracking-wider">
          OUR SCIENCE
        </button>
      </div>
    </div>
  );
}
