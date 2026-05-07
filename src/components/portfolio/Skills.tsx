"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Cloud, Brain, Zap, Database, Globe, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import { skillCategories } from "@/lib/data";

const SectionAmbient3D = dynamic(
  () => import("./SectionAmbient3D").then((mod) => ({ default: mod.SectionAmbient3D })),
  { ssr: false }
);

const categoryIcons = [Code2, Server, Cloud, Brain];
const categoryColors = [
  {
    active: "from-cyan-accent to-cyan-light",
    inactive: "text-cyan-accent",
    pill: "hover:border-cyan-accent/30 hover:text-cyan-accent hover:bg-cyan-accent/5",
    bg: "bg-cyan-accent/10 text-cyan-light border-cyan-accent/15",
    icon: "text-cyan-accent bg-cyan-accent/10",
    count: "text-cyan-light",
  },
  {
    active: "from-emerald-accent to-emerald-accent/70",
    inactive: "text-emerald-accent",
    pill: "hover:border-emerald-accent/30 hover:text-emerald-accent hover:bg-emerald-accent/5",
    bg: "bg-emerald-accent/10 text-emerald-accent border-emerald-accent/15",
    icon: "text-emerald-accent bg-emerald-accent/10",
    count: "text-emerald-accent",
  },
  {
    active: "from-amber-accent to-amber-accent/70",
    inactive: "text-amber-accent",
    pill: "hover:border-amber-accent/30 hover:text-amber-accent hover:bg-amber-accent/5",
    bg: "bg-amber-accent/10 text-amber-accent border-amber-accent/15",
    icon: "text-amber-accent bg-amber-accent/10",
    count: "text-amber-accent",
  },
  {
    active: "from-pink-accent to-pink-accent/70",
    inactive: "text-pink-accent",
    pill: "hover:border-pink-accent/30 hover:text-pink-accent hover:bg-pink-accent/5",
    bg: "bg-pink-accent/10 text-pink-accent border-pink-accent/15",
    icon: "text-pink-accent bg-pink-accent/10",
    count: "text-pink-accent",
  },
];

const overviewIcons = [Zap, Database, Globe, Sparkles];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const colors = categoryColors[activeCategory];

  return (
    <section id="skills" className="py-20 md:py-28 px-4 section-gradient-emerald relative overflow-hidden">
      <SectionAmbient3D variant="skills" />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading title="Skills & Tools" subtitle="Technologies I work with on a daily basis" />

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
        >
          {skillCategories.map((cat, i) => {
            const Icon = categoryIcons[i];
            const catColor = categoryColors[i];
            const isActive = activeCategory === i;
            return (
              <motion.button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${catColor.active} text-white glow-cyan`
                    : `glass-card ${catColor.inactive} hover:border-opacity-40`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skillCategories[activeCategory].skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`px-4 py-2 text-sm font-medium rounded-lg glass-card ${colors.pill} transition-all duration-200 cursor-default`}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* All Skills Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="animated-gradient-border rounded-xl">
            <div className="glass-card rounded-xl p-5 md:p-6 bg-background/80">
              <h3 className="text-sm font-semibold mb-4 text-center gradient-text">
                Quick Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skillCategories.map((cat, i) => {
                  const OverviewIcon = overviewIcons[i];
                  const catColor = categoryColors[i];
                  return (
                    <motion.div
                      key={cat.title}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`text-center p-3 rounded-lg bg-gradient-to-br ${catColor.bg.split(" ")[0]}/5 to-transparent border ${catColor.bg.split(" ")[2]}/20 transition-all duration-300`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${catColor.icon} flex items-center justify-center mx-auto mb-2`}>
                        <OverviewIcon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {cat.title}
                      </p>
                      <p className={`text-lg font-bold ${catColor.count} mt-1`}>
                        {cat.skills.length}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
