"use client";

import { useCallback, useRef, useState } from "react";

interface TiltValues {
  transform: string;
  glareStyle: React.CSSProperties;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

const MAX_TILT = 5; // degrees
const GLARE_OPACITY = 0.15;
const SCALE_ON_HOVER = 1.03;

export function useTilt(): TiltValues {
  const cardRef = useRef<HTMLElement | null>(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    cardRef.current = card;
    const rect = card.getBoundingClientRect();

    // Normalized position from center (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const centerX = x - 0.5;
    const centerY = y - 0.5;

    // Tilt: moving mouse right tilts right (positive Y rotation)
    setTiltY(centerX * MAX_TILT * 2);
    setTiltX(-centerY * MAX_TILT * 2);
    setGlareX(x * 100);
    setGlareY(y * 100);
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  }, []);

  const transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${isHovered ? SCALE_ON_HOVER : 1}, ${isHovered ? SCALE_ON_HOVER : 1}, 1)`;

  const glareStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${isHovered ? GLARE_OPACITY : 0}), transparent 60%)`,
    transition: "opacity 0.3s ease",
    zIndex: 1,
  };

  return { transform, glareStyle, onMouseMove, onMouseLeave };
}
