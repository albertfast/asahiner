"use client";

import { useEffect, useState } from "react";

const sections = [
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

export const SectionDots = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            activeSection === section
              ? "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50 scale-125"
              : "bg-transparent border-slate-600 hover:border-slate-400"
          }`}
          aria-label={`Scroll to ${section} section`}
        />
      ))}
    </div>
  );
};