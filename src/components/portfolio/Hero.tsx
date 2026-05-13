"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { personalInfo } from "@/lib/data";

const Scene3D = dynamic(
  () => import("./Scene3D").then((mod) => ({ default: mod.Scene3D })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-accent/5 via-background to-background" />
    ),
  }
);

function useTypewriter(text: string, speed: number = 40, startDelay: number = 1000) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Delay before typing starts
    timeout = setTimeout(() => {
      setHasStarted(true);
      let index = 0;

      const typeChar = () => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(typeChar, speed);
        } else {
          setIsComplete(true);
        }
      };

      typeChar();
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayText, isComplete, hasStarted };
}

export function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const { displayText, isComplete, hasStarted } = useTypewriter(
    personalInfo.tagline,
    40,
    1000 // starts after name fade-in (~0.6s + buffer)
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-base text-muted-foreground mb-4 tracking-widest uppercase"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: hasStarted ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed min-h-[3.5rem] md:min-h-[2.5rem]"
          >
            <span>{displayText}</span>
            <span
              className={`inline-block ml-0.5 text-cyan-accent ${
                isComplete ? "animate-blink" : "opacity-100"
              }`}
            >
              |
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="px-6 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-cyan-accent to-purple-accent text-white hover:opacity-90 transition-opacity glow-cyan"
            >
              View Projects
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="px-6 py-3 rounded-lg font-medium text-sm border border-cyan-accent/30 text-cyan-accent hover:bg-cyan-accent/10 transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-muted-foreground"
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>

      {/* Blinking cursor animation styles */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
