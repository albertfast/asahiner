"use client";

import { useEffect, useState } from "react";

const sections = [
  "hero",
  "about",
  "education",
  "skills",
  "experience",
  "projects",
  "activity",
  "research",
  "awards",
  "contact",
];

const sectionColors = {
  hero: "#06b6d4",
  about: "#a855f7",
  education: "#10b981",
  skills: "#f59e0b",
  experience: "#ef4444",
  projects: "#8b5cf6",
  activity: "#06b6d4",
  research: "#f97316",
  awards: "#84cc16",
  contact: "#ec4899",
};

export const ScrollSpyProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);

      // Find current section
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:block hidden">
      <div className="h-1 bg-slate-800/80 backdrop-blur-sm">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: sectionColors[currentSection as keyof typeof sectionColors] || "#06b6d4",
          }}
        />
      </div>
      <div className="h-8 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: sectionColors[currentSection as keyof typeof sectionColors] || "#06b6d4",
            }}
          />
          <span className="capitalize">{currentSection}</span>
        </div>
      </div>
    </div>
  );
};