"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease-in progress - fast at start, slows near end
        const increment = prev < 60 ? 8 : prev < 85 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    // Minimum display time of 2s, then fade out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, #0f172a 0%, #0a0a1a 50%, #050510 100%)",
          }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <motion.div
              animate={{
                x: [0, -25, 15, 0],
                y: [0, 25, -15, 0],
                scale: [1, 0.95, 1.1, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <motion.div
              animate={{
                x: [0, 15, -30, 0],
                y: [0, -30, 15, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
          </div>

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Name with gradient animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center mb-10"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #06b6d4, #a855f7, #22d3ee, #10b981)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Ahmet Sahiner
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 text-sm sm:text-base text-muted-foreground tracking-widest uppercase"
              style={{
                color: "rgba(148, 163, 184, 0.6)",
              }}
            >
              Full-Stack Developer & Salesforce Certified
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 w-48 sm:w-64"
          >
            <div className="h-[2px] rounded-full overflow-hidden bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #06b6d4, #a855f7, #22d3ee)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  width: `${progress}%`,
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  width: { duration: 0.3, ease: "easeOut" },
                  backgroundPosition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </div>

            {/* Percentage text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-center text-xs tracking-wider"
              style={{ color: "rgba(148, 163, 184, 0.4)" }}
            >
              {progress}%
            </motion.p>
          </motion.div>

          {/* Decorative corner brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-accent/20 rounded-tl-sm" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-purple-accent/20 rounded-tr-sm" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-purple-accent/20 rounded-bl-sm" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-accent/20 rounded-br-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
