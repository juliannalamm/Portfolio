'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/** Procedural curl‑noise helper (tiny & fast) */
function curl(x, y, z, t) {
  return [
    Math.sin(y + t) * 0.002,
    Math.sin(z + t) * 0.002,
    Math.sin(x + t) * 0.002
  ];
}

export default function Particles({ count = 5000 }) {
  /* ---------- 1. positions buffer ------------------------------------ */
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  /* ---------- 2. circular sprite texture ----------------------------- */
  const circleTexture = useMemo(() => {
    const size = 128;                                   // bigger, crisper texture
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
  
    // warm centre → fast fade to transparent
    const g = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    g.addColorStop(0.00, '#fffaf0');                    // soft off‑white core
    g.addColorStop(0.35, 'rgba(255,255,255,0)');        // fade out quickly
    g.addColorStop(1.00, 'rgba(255,255,255,0)');
  
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    return tex;
  }, []);
  

  /* ---------- 3. animate --------------------------------------------- */
  const pointsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2;          // slower motion
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = positions[ix + 0];
      const y = positions[ix + 1];
      const z = positions[ix + 2];

      const [dx, dy, dz] = curl(x, y, z, t);
      positions[ix + 0] += dx;
      positions[ix + 1] += dy;
      positions[ix + 2] += dz;

      /* wrap around bounds so particles stay on screen */
      if (positions[ix + 0] > 5) positions[ix + 0] = -5;
      if (positions[ix + 0] < -5) positions[ix + 0] = 5;
      if (positions[ix + 1] > 5) positions[ix + 1] = -5;
      if (positions[ix + 1] < -5) positions[ix + 1] = 5;
      if (positions[ix + 2] > 5) positions[ix + 2] = -5;
      if (positions[ix + 2] < -5) positions[ix + 2] = 5;
    }

    /* flag to GPU that positions changed */
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  /* ---------- 4. render ---------------------------------------------- */
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}          /* ✔️ round sprite */
        transparent
        alphaTest={0.5}
        size={0.07}                  /* world units */
        sizeAttenuation
        depthWrite={false}
        
        // blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </points>
  );
}
