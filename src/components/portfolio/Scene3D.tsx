"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const count = 200;
  const lineCount = 100;
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const t = Math.random();
      // Cyan to purple gradient
      colors[i * 3] = 0.024 + t * 0.65; // r
      colors[i * 3 + 1] = 0.714 - t * 0.38; // g
      colors[i * 3 + 2] = 0.831 + t * 0.14; // b

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, []);

  const linePositions = useMemo(() => {
    const positions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const i1 = Math.floor(Math.random() * count);
      const i2 = Math.floor(Math.random() * count);

      positions[i * 6] = particles.positions[i1 * 3];
      positions[i * 6 + 1] = particles.positions[i1 * 3 + 1];
      positions[i * 6 + 2] = particles.positions[i1 * 3 + 2];
      positions[i * 6 + 3] = particles.positions[i2 * 3];
      positions[i * 6 + 4] = particles.positions[i2 * 3 + 1];
      positions[i * 6 + 5] = particles.positions[i2 * 3 + 2];

      const alpha = 0.15 + Math.random() * 0.2;
      lineColors[i * 6] = 0.024 * alpha;
      lineColors[i * 6 + 1] = 0.714 * alpha;
      lineColors[i * 6 + 2] = 0.831 * alpha;
      lineColors[i * 6 + 3] = 0.659 * alpha;
      lineColors[i * 6 + 4] = 0.333 * alpha;
      lineColors[i * 6 + 5] = 0.969 * alpha;
    }

    return { positions, colors: lineColors };
  }, [particles]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.05;
    if (meshRef.current) {
      meshRef.current.rotation.y = t;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t;
      linesRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[linePositions.colors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={4}
          saturation={0.5}
          fade
          speed={0.5}
        />
        <ParticleField />
      </Canvas>
    </div>
  );
}
