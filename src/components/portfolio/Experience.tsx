"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Building2, Cpu, Brain, Zap, Code2, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import { experiences } from "@/lib/data";

const SectionAmbient3D = dynamic(
  () => import("./SectionAmbient3D").then((mod) => ({ default: mod.SectionAmbient3D })),
  { ssr: false }
);

const experienceAccentColors = [
  "cyan",
  "purple",
  "emerald",
  "amber",
  "pink",
  "indigo",
  "cyan",
  "purple",
  "emerald",
] as const;

const accentIconMap: Record<string, typeof Briefcase> = {
  cyan: Code2,
  purple: Cpu,
  emerald: Zap,
  amber: Building2,
  pink: Users,
  indigo: Brain,
};

const accentColorMap: Record<string, { icon: string; bg: string; text: string; bullet: string; border: string; glow: string; dot: string; dotGlow: string }> = {
  cyan: {
    icon: "text-cyan-accent",
    bg: "bg-cyan-accent/10",
    text: "text-cyan-accent",
    bullet: "bg-cyan-accent",
    border: "border-l-color-cyan",
    glow: "hover-glow-cyan",
    dot: "bg-cyan-accent",
    dotGlow: "shadow-[0_0_12px_rgba(6,182,212,0.6),0_0_24px_rgba(6,182,212,0.3)]",
  },
  purple: {
    icon: "text-purple-accent",
    bg: "bg-purple-accent/10",
    text: "text-purple-accent",
    bullet: "bg-purple-accent",
    border: "border-l-color-purple",
    glow: "hover-glow-purple",
    dot: "bg-purple-accent",
    dotGlow: "shadow-[0_0_12px_rgba(168,85,247,0.6),0_0_24px_rgba(168,85,247,0.3)]",
  },
  emerald: {
    icon: "text-emerald-accent",
    bg: "bg-emerald-accent/10",
    text: "text-emerald-accent",
    bullet: "bg-emerald-accent",
    border: "border-l-color-emerald",
    glow: "hover-glow-emerald",
    dot: "bg-emerald-accent",
    dotGlow: "shadow-[0_0_12px_rgba(16,185,129,0.6),0_0_24px_rgba(16,185,129,0.3)]",
  },
  amber: {
    icon: "text-amber-accent",
    bg: "bg-amber-accent/10",
    text: "text-amber-accent",
    bullet: "bg-amber-accent",
    border: "border-l-color-amber",
    glow: "hover-glow-amber",
    dot: "bg-amber-accent",
    dotGlow: "shadow-[0_0_12px_rgba(245,158,11,0.6),0_0_24px_rgba(245,158,11,0.3)]",
  },
  pink: {
    icon: "text-pink-accent",
    bg: "bg-pink-accent/10",
    text: "text-pink-accent",
    bullet: "bg-pink-accent",
    border: "border-l-color-pink",
    glow: "hover-glow-pink",
    dot: "bg-pink-accent",
    dotGlow: "shadow-[0_0_12px_rgba(236,72,153,0.6),0_0_24px_rgba(236,72,153,0.3)]",
  },
  indigo: {
    icon: "text-indigo-accent",
    bg: "bg-indigo-accent/10",
    text: "text-indigo-accent",
    bullet: "bg-indigo-accent",
    border: "border-l-color-indigo",
    glow: "hover-glow-indigo",
    dot: "bg-indigo-accent",
    dotGlow: "shadow-[0_0_12px_rgba(99,102,241,0.6),0_0_24px_rgba(99,102,241,0.3)]",
  },
};

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animate the timeline line height from 0% to 100%
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 md:py-28 px-4 section-gradient-indigo relative overflow-hidden">
      <SectionAmbient3D variant="experience" />
      <div className="cyber-grid" />

      <div className="mx-auto max-w-5xl relative z-10">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and key contributions"
        />

        <div ref={containerRef} className="relative">
          {/* Vertical timeline line — visible on md+ */}
          <div className="hidden md:block absolute left-[23px] top-0 bottom-0 w-[2px] bg-border/30 overflow-hidden">
            <motion.div
              className="w-full rounded-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(180deg, #06b6d4, #a855f7, #10b981)",
              }}
            />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const accent = experienceAccentColors[i % experienceAccentColors.length];
              const colors = accentColorMap[accent];
              const Icon = accentIconMap[accent] || Briefcase;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="relative md:pl-12"
                >
                  {/* Timeline dot — visible on md+ */}
                  <motion.div
                    className={`hidden md:flex absolute left-[15px] top-6 w-4 h-4 rounded-full ${colors.dot} border-2 border-background z-10 items-center justify-center`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 300 }}
                  >
                    {/* Pulsing glow ring */}
                    <motion.div
                      className={`absolute w-4 h-4 rounded-full ${colors.dot} ${colors.dotGlow}`}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                  </motion.div>

                  <div className={`glass-card rounded-xl p-5 md:p-6 ${colors.border} ${colors.glow} transition-all duration-300 relative overflow-hidden`}>
                    {/* Visible colored accent in background */}
                    <div className={`absolute top-0 right-0 w-40 h-40 ${colors.bg} rounded-full blur-3xl opacity-60 pointer-events-none`} />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 relative">
                      <div className="flex items-start gap-3">
                        <motion.div
                          className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className={`w-5 h-5 ${colors.icon}`} />
                        </motion.div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          <p className={`text-sm ${colors.text} font-medium`}>{exp.company}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 px-2.5 py-1 rounded-full bg-muted/50">
                        {exp.date}
                      </span>
                    </div>
                    <ul className="space-y-1.5 ml-0 sm:ml-[52px] relative">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.bullet} mt-2 shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
