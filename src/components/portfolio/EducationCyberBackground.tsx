"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const CUBE_COUNT = 26;
const STAR_COUNT = 160;

function random(seed: number) {
  let value = seed;
  return () => {
    value = (value * 48271) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function FloatingCubes({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    const next = random(20260507);
    return Array.from({ length: CUBE_COUNT }, (_, index) => ({
      key: index,
      position: [
        (next() - 0.5) * 7.5,
        (next() - 0.5) * 3.6,
        -1.2 - next() * 3.5,
      ] as [number, number, number],
      scale: 0.08 + next() * 0.22,
      rotation: [next() * Math.PI, next() * Math.PI, next() * Math.PI] as [number, number, number],
      speed: 0.18 + next() * 0.32,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const elapsed = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      const cube = cubes[index];
      child.rotation.x = cube.rotation[0] + elapsed * cube.speed;
      child.rotation.y = cube.rotation[1] + elapsed * cube.speed * 0.8;
      child.position.y = cube.position[1] + Math.sin(elapsed * 0.45 + index) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube) => (
        <mesh
          key={cube.key}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#67e8f9"
            wireframe
            transparent
            opacity={0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function StarField() {
  const positions = useMemo(() => {
    const next = random(1701);
    const values = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      values[i3] = (next() - 0.5) * 8;
      values[i3 + 1] = (next() - 0.5) * 4;
      values[i3 + 2] = -1 - next() * 5;
    }
    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e0f2fe"
        size={0.015}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function EducationCyberBackground() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <StarField />
        <FloatingCubes reducedMotion={reducedMotion} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/82 to-background/94" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/82" />
    </div>
  );
}
