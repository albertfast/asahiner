"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

export type AmbientVariant =
  | "skills"
  | "experience"
  | "projects"
  | "research"
  | "awards"
  | "contact";

const variantColor: Record<AmbientVariant, string> = {
  skills: "#34d399",
  experience: "#818cf8",
  projects: "#22d3ee",
  research: "#f472b6",
  awards: "#fbbf24",
  contact: "#67e8f9",
};

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function AmbientShapes({
  variant,
  reducedMotion,
}: {
  variant: AmbientVariant;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useMemo(() => {
    const next = seeded(variant.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) + 107);
    return Array.from({ length: 18 }, (_, index) => ({
      key: `${variant}-${index}`,
      position: [
        (next() - 0.5) * 8,
        (next() - 0.5) * 4,
        -1.2 - next() * 4,
      ] as [number, number, number],
      rotation: [next() * Math.PI, next() * Math.PI, next() * Math.PI] as [number, number, number],
      scale: 0.12 + next() * 0.26,
      speed: 0.16 + next() * 0.32,
    }));
  }, [variant]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const elapsed = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      const shape = shapes[index];
      child.rotation.x = shape.rotation[0] + elapsed * shape.speed;
      child.rotation.y = shape.rotation[1] + elapsed * shape.speed * 0.8;
      child.position.y = shape.position[1] + Math.sin(elapsed * 0.5 + index) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => {
        const geometry =
          variant === "skills" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : variant === "experience" ? (
            <torusGeometry args={[0.72, 0.18, 8, 24]} />
          ) : variant === "projects" ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : variant === "research" ? (
            <icosahedronGeometry args={[0.82, 1]} />
          ) : variant === "awards" ? (
            <tetrahedronGeometry args={[0.9, 0]} />
          ) : (
            <dodecahedronGeometry args={[0.8, 0]} />
          );

        return (
          <mesh
            key={shape.key}
            position={shape.position}
            rotation={shape.rotation}
            scale={shape.scale * (index % 5 === 0 ? 1.25 : 1)}
          >
            {geometry}
            <meshBasicMaterial
              color={variantColor[variant]}
              wireframe
              transparent
              opacity={0.22}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function AmbientParticles({ variant }: { variant: AmbientVariant }) {
  const positions = useMemo(() => {
    const next = seeded(variant.length * 499);
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const i3 = i * 3;
      values[i3] = (next() - 0.5) * 8;
      values[i3 + 1] = (next() - 0.5) * 4;
      values[i3 + 2] = -1 - next() * 5;
    }
    return values;
  }, [variant]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={variantColor[variant]}
        size={0.014}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function SectionAmbient3D({ variant }: { variant: AmbientVariant }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-75" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 54 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AmbientParticles variant={variant} />
        <AmbientShapes variant={variant} reducedMotion={reducedMotion} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/78 via-background/84 to-background/96" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/86 via-transparent to-background/86" />
    </div>
  );
}
