"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Cpu, Brain, Zap, Code2, Users, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import { SectionReveal } from "./SectionReveal";
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

const accentColorMap: Record<string, { icon: string; bg: string; text: string; bullet: string; border: string; glow: string }> = {
  cyan: { icon: "text-cyan-accent", bg: "bg-cyan-accent/10", text: "text-cyan-accent", bullet: "bg-cyan-accent", border: "border-l-color-cyan", glow: "hover-glow-cyan" },
  purple: { icon: "text-purple-accent", bg: "bg-purple-accent/10", text: "text-purple-accent", bullet: "bg-purple-accent", border: "border-l-color-purple", glow: "hover-glow-purple" },
  emerald: { icon: "text-emerald-accent", bg: "bg-emerald-accent/10", text: "text-emerald-accent", bullet: "bg-emerald-accent", border: "border-l-color-emerald", glow: "hover-glow-emerald" },
  amber: { icon: "text-amber-accent", bg: "bg-amber-accent/10", text: "text-amber-accent", bullet: "bg-amber-accent", border: "border-l-color-amber", glow: "hover-glow-amber" },
  pink: { icon: "text-pink-accent", bg: "bg-pink-accent/10", text: "text-pink-accent", bullet: "bg-pink-accent", border: "border-l-color-pink", glow: "hover-glow-pink" },
  indigo: { icon: "text-indigo-accent", bg: "bg-indigo-accent/10", text: "text-indigo-accent", bullet: "bg-indigo-accent", border: "border-l-color-indigo", glow: "hover-glow-indigo" },
};

// Mock skills data with levels
const skills = [
  { name: "React/Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "AWS/Azure", level: 75 },
  { name: "Docker/K8s", level: 70 },
];

function SkillProgressBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-cyan-accent to-purple-accent rounded-full"
        />
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 px-4 section-gradient-indigo relative overflow-hidden">
      <SectionAmbient3D variant="experience" />
      <div className="cyber-grid" />

      <div className="mx-auto max-w-5xl relative z-10">
        <SectionReveal>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey and key contributions"
            number="03"
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
                      {/* Company Logo Placeholder */}
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shrink-0 border border-slate-600/50">
                        <Building2 className="w-5 h-5 text-slate-400" />
                      </div>
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

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-4 ml-0 sm:ml-[52px]">
                    {exp.techStack?.slice(0, 6).map((tech, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * j }}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
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

          {/* Skills Section with Animated Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-accent/20 to-cyan-accent/5 flex items-center justify-center">
                <Star className="w-4 h-4 text-cyan-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold">Technical Skills</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, i) => (
                <SkillProgressBar key={i} {...skill} />
              ))}
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
