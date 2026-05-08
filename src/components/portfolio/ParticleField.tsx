"use client";

import { useEffect, useRef } from "react";

export const ParticleField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simple PRNG for consistent particle positions
    let seed = 12345;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Create particles
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse";

      // Random position
      const x = random() * 100;
      const y = random() * 100;

      // Random animation delay and duration
      const delay = random() * 10;
      const duration = 10 + random() * 20;

      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationName = "drift";

      particles.push(particle);
      container.appendChild(particle);
    }

    // Mouse spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
      }}
    />
  );
};

// Add CSS animation for drift
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes drift {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      25% {
        transform: translate(10px, -10px) scale(1.2);
        opacity: 0.6;
      }
      50% {
        transform: translate(-5px, 15px) scale(0.8);
        opacity: 0.4;
      }
      75% {
        transform: translate(15px, 5px) scale(1.1);
        opacity: 0.5;
      }
    }
  `;
  document.head.appendChild(style);
}