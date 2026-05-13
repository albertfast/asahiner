"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export const BackToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 group animate-bounce-in"
      aria-label="Back to top"
    >
      <div className="relative">
        {/* SVG Progress Ring */}
        <svg
          width="60"
          height="60"
          className="transform -rotate-90"
        >
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-slate-700"
          />
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ChevronUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </button>
  );
};