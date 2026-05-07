"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  opacity: number;
  color: string;
  size: number;
  decay: number;
}

const COLORS = [
  "rgba(0, 255, 255, ",   // cyan-accent
  "rgba(168, 85, 247, ",  // purple-accent
  "rgba(0, 255, 255, ",   // cyan-accent (more frequent)
  "rgba(168, 85, 247, ",  // purple-accent (more frequent)
  "rgba(236, 72, 153, ",  // pink-accent
];

const MAX_PARTICLES = 18;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const isDesktopRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    // Add new particle at cursor position
    if (isDesktopRef.current && mouseRef.current.x > 0 && mouseRef.current.y > 0) {
      const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 4 + Math.random() * 2; // 4-6px
      particles.push({
        x: mouseRef.current.x + (Math.random() - 0.5) * 4,
        y: mouseRef.current.y + (Math.random() - 0.5) * 4,
        opacity: 0.7 + Math.random() * 0.3,
        color: colorBase,
        size,
        decay: 0.015 + Math.random() * 0.015,
      });
    }

    // Limit particles
    while (particles.length > MAX_PARTICLES) {
      particles.shift();
    }

    // Draw and update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.opacity -= p.decay;

      if (p.opacity <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.opacity * 0.3})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Check desktop
    isDesktopRef.current = window.innerWidth > 768;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    // If not desktop or prefers reduced motion, don't set up
    if (!isDesktopRef.current || prefersReducedMotionRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isDesktopRef.current = window.innerWidth > 768;
    };
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Don't render canvas at all if not needed (SSR check happens in useEffect)
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}
