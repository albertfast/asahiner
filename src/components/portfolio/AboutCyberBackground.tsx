"use client";

import { useMemo, useRef } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const CELL_COUNT = 130;

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function torusKnotPoint(t: number, radius = 1.35, tube = 0.42) {
  return {
    x: (radius + tube * Math.cos(3 * t)) * Math.cos(2 * t),
    y: (radius + tube * Math.cos(3 * t)) * Math.sin(2 * t),
    z: tube * Math.sin(3 * t),
  };
}

function CyberCells({ reducedMotion }: { reducedMotion: boolean }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const cells = useMemo(() => {
    const random = createSeededRandom(20621);
    const basePositions = new Float32Array(CELL_COUNT * 3);
    const positions = new Float32Array(CELL_COUNT * 3);
    const colors = new Float32Array(CELL_COUNT * 3);
    const seeds = new Float32Array(CELL_COUNT);
    const cyan = new THREE.Color("#67e8f9");
    const purple = new THREE.Color("#c084fc");
    const dim = new THREE.Color("#164e63");
    const color = new THREE.Color();

    for (let i = 0; i < CELL_COUNT; i++) {
      const t = random() * Math.PI * 20;
      const angle = random() * Math.PI * 2;
      const point = torusKnotPoint(t);
      const offset = 0.18 + random() * 0.18;
      const i3 = i * 3;

      basePositions[i3] = point.x + Math.cos(angle) * offset;
      basePositions[i3 + 1] = point.y + Math.sin(angle) * offset;
      basePositions[i3 + 2] = point.z + (random() - 0.5) * 0.36;
      positions[i3] = basePositions[i3];
      positions[i3 + 1] = basePositions[i3 + 1];
      positions[i3 + 2] = basePositions[i3 + 2];
      seeds[i] = random();

      color.lerpColors(dim, i % 3 === 0 ? purple : cyan, 0.45 + random() * 0.45);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { basePositions, positions, colors, seeds };
  }, []);

  useFrame((state) => {
    if (reducedMotion || !geometryRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const positionAttribute = geometryRef.current.getAttribute("position") as THREE.BufferAttribute;
    const colorAttribute = geometryRef.current.getAttribute("color") as THREE.BufferAttribute;

    for (let i = 0; i < CELL_COUNT; i++) {
      const i3 = i * 3;
      const seed = cells.seeds[i];
      const alive = Math.sin(elapsed * 1.4 + seed * 18) > -0.25;
      const pulse = alive ? 0.9 + Math.sin(elapsed * 4 + seed * 20) * 0.1 : 0.22;

      cells.positions[i3] = cells.basePositions[i3] + Math.sin(elapsed * 0.8 + seed * 12) * 0.05;
      cells.positions[i3 + 1] = cells.basePositions[i3 + 1] + Math.cos(elapsed * 0.7 + seed * 9) * 0.05;
      cells.positions[i3 + 2] = cells.basePositions[i3 + 2] + Math.sin(elapsed * 0.5 + seed * 16) * 0.04;

      positionAttribute.setXYZ(i, cells.positions[i3], cells.positions[i3 + 1], cells.positions[i3 + 2]);
      colorAttribute.setXYZ(
        i,
        alive ? 0.18 + pulse * 0.25 : 0.04,
        alive ? 0.75 + pulse * 0.2 : 0.12,
        alive ? 0.95 : 0.2 + pulse * 0.2
      );
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[cells.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[cells.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.036}
        vertexColors
        transparent
        opacity={0.68}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function TorusKnot({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const compact = viewport.width < 5;
  const baseScale = compact ? 0.58 : 0.82;
  const position: [number, number, number] = compact
    ? [0.25, -0.22, -0.9]
    : [1.6, -0.08, -0.75];

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    if (!reducedMotion) {
      groupRef.current.rotation.x = elapsed * 0.13;
      groupRef.current.rotation.y = elapsed * 0.19;
      groupRef.current.rotation.z = Math.sin(elapsed * 0.16) * 0.12;
    }

    const pulse = reducedMotion ? 1 : 0.97 + Math.sin(elapsed * 1.15) * 0.035;
    groupRef.current.scale.setScalar(baseScale * pulse);
  });

  return (
    <group ref={groupRef} position={position} rotation={[0.15, -0.35, 0.18]} scale={baseScale}>
      <mesh>
        <torusKnotGeometry args={[1.35, 0.42, 220, 26, 2, 3]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={0.47}>
        <torusKnotGeometry args={[1.35, 0.16, 120, 10, 2, 3]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <CyberCells reducedMotion={reducedMotion} />
    </group>
  );
}

function CyberPolyhedron({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.82, 1), []);
  const { viewport } = useThree();
  const compact = viewport.width < 5;
  const baseScale = compact ? 0.6 : 0.78;
  const position: [number, number, number] = compact
    ? [-1.55, 0.45, -1.05]
    : [-2.15, 0.68, -0.85];

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.x = -elapsed * 0.32;
    groupRef.current.rotation.y = elapsed * 0.42;
    groupRef.current.rotation.z = elapsed * 0.22;
    groupRef.current.scale.setScalar(baseScale * (1 + Math.sin(elapsed * 1.7) * 0.06));
  });

  return (
    <group ref={groupRef} position={position} rotation={[0.2, 0.4, 0]} scale={baseScale}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#c084fc"
          wireframe
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points geometry={geometry}>
        <pointsMaterial
          color="#f0abfc"
          size={0.04}
          transparent
          opacity={0.58}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <TorusKnot reducedMotion={reducedMotion} />
      <CyberPolyhedron reducedMotion={reducedMotion} />
    </>
  );
}

export function AboutCyberBackground() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent reducedMotion={reducedMotion} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_35%,transparent_0%,transparent_18%,rgba(8,10,24,0.68)_48%,rgba(8,10,24,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/94 via-background/78 to-background/86" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background/95" />
    </div>
  );
}
