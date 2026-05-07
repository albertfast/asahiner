"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Cpu, Brain, Zap, Code2, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { experiences } from "@/lib/data";

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

const accentColorMap: Record<string, { icon: string; bg: string; text: string; bullet: string; border: string; glow: string }> = {
  cyan: { icon: "text-cyan-accent", bg: "bg-cyan-accent/10", text: "text-cyan-accent", bullet: "bg-cyan-accent", border: "border-l-color-cyan", glow: "hover-glow-cyan" },
  purple: { icon: "text-purple-accent", bg: "bg-purple-accent/10", text: "text-purple-accent", bullet: "bg-purple-accent", border: "border-l-color-purple", glow: "hover-glow-purple" },
  emerald: { icon: "text-emerald-accent", bg: "bg-emerald-accent/10", text: "text-emerald-accent", bullet: "bg-emerald-accent", border: "border-l-color-emerald", glow: "hover-glow-emerald" },
  amber: { icon: "text-amber-accent", bg: "bg-amber-accent/10", text: "text-amber-accent", bullet: "bg-amber-accent", border: "border-l-color-amber", glow: "hover-glow-amber" },
  pink: { icon: "text-pink-accent", bg: "bg-pink-accent/10", text: "text-pink-accent", bullet: "bg-pink-accent", border: "border-l-color-pink", glow: "hover-glow-pink" },
  indigo: { icon: "text-indigo-accent", bg: "bg-indigo-accent/10", text: "text-indigo-accent", bullet: "bg-indigo-accent", border: "border-l-color-indigo", glow: "hover-glow-indigo" },
};

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 px-4 section-gradient-indigo relative overflow-hidden">
      {/* Floating orbs - VIVID */}
      <div className="orb orb-cyan w-[300px] h-[300px] -top-20 -left-32" style={{ animationDelay: "-2s" }} />
      <div className="orb orb-purple w-[260px] h-[260px] top-1/3 -right-20 opacity-40" style={{ animationDelay: "-5s" }} />
      <div className="orb orb-amber w-[220px] h-[220px] bottom-20 left-1/3 opacity-35" style={{ animationDelay: "-8s" }} />

      {/* Cyber grid background */}
      <div className="cyber-grid" />

      <div className="mx-auto max-w-5xl relative z-10">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and key contributions"
        />

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
                className={`glass-card rounded-xl p-5 md:p-6 ${colors.border} ${colors.glow} transition-all duration-300 relative overflow-hidden`}
              >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
