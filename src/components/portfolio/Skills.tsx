"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Cloud, Brain, Zap, Database, Globe, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
    bar: "bg-cyan-accent",
    barBg: "bg-cyan-accent/15",
  },
  {
    active: "from-emerald-accent to-emerald-accent/70",
    inactive: "text-emerald-accent",
    pill: "hover:border-emerald-accent/30 hover:text-emerald-accent hover:bg-emerald-accent/5",
    bg: "bg-emerald-accent/10 text-emerald-accent border-emerald-accent/15",
    icon: "text-emerald-accent bg-emerald-accent/10",
    count: "text-emerald-accent",
    bar: "bg-emerald-accent",
    barBg: "bg-emerald-accent/15",
  },
  {
    active: "from-amber-accent to-amber-accent/70",
    inactive: "text-amber-accent",
    pill: "hover:border-amber-accent/30 hover:text-amber-accent hover:bg-amber-accent/5",
    bg: "bg-amber-accent/10 text-amber-accent border-amber-accent/15",
    icon: "text-amber-accent bg-amber-accent/10",
    count: "text-amber-accent",
    bar: "bg-amber-accent",
    barBg: "bg-amber-accent/15",
  },
  {
    active: "from-pink-accent to-pink-accent/70",
    inactive: "text-pink-accent",
    pill: "hover:border-pink-accent/30 hover:text-pink-accent hover:bg-pink-accent/5",
    bg: "bg-pink-accent/10 text-pink-accent border-pink-accent/15",
    icon: "text-pink-accent bg-pink-accent/10",
    count: "text-pink-accent",
    bar: "bg-pink-accent",
    barBg: "bg-pink-accent/15",
  },
];

const overviewIcons = [Zap, Database, Globe, Sparkles];

// Radar chart data derived from skill categories
const radarData = skillCategories.map((cat) => ({
  category: cat.title.split(" & ")[0],
  skills: cat.skills.length,
  fullMark: 15,
}));

// Custom tooltip for the radar chart
function RadarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-3 py-2 text-xs border border-cyan-accent/20 bg-background/95">
      <p className="text-cyan-light font-medium">{payload[0].value} skills</p>
    </div>
  );
}

// Proficiency map — realistic simulated values (65-95%)
const skillProficiency: Record<string, number> = {
  // Languages & Frameworks
  Python: 90,
  JavaScript: 88,
  TypeScript: 85,
  Java: 75,
  HTML: 92,
  CSS: 90,
  React: 88,
  "React Native (Expo)": 82,
  "Expo Go": 80,
  "iOS & Android Apps": 78,
  TailwindCSS: 87,
  Bootstrap: 82,

  // Backend & Databases
  "Node.js": 85,
  Flask: 80,
  Django: 78,
  Supabase: 82,
  PostgreSQL: 80,
  MySQL: 78,
  "API Integration": 88,
  "REST APIs": 90,
  "SOAP APIs": 75,

  // Cloud & DevOps
  "Salesforce Sales Cloud": 88,
  "Salesforce CPQ": 82,
  "Billing Cloud": 78,
  Apex: 80,
  LWC: 82,
  Heroku: 75,
  Copado: 72,
  Git: 90,
  GitHub: 92,
  Jenkins: 68,
  Postman: 85,
  "VS Code": 90,
  "Agile Methodology": 85,
  Trello: 80,

  // AI & Machine Learning
  NumPy: 85,
  Pandas: 83,
  "scikit-learn": 78,
  PyTorch: 75,
  "Q-learning": 72,
  DQN: 70,
  "LLM Prompt Engineering": 80,
  "Data Evaluation": 77,
};

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

        {/* Skills Grid with Proficiency Bars */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skillCategories[activeCategory].skills.map((skill, i) => {
            const proficiency = skillProficiency[skill] ?? 75;
            return (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`px-4 py-2 text-sm font-medium rounded-lg glass-card ${colors.pill} transition-all duration-200 cursor-default flex flex-col items-center gap-1.5`}
              >
                <span>{skill}</span>
                {/* Proficiency progress bar */}
                <div className={`w-full h-[2px] rounded-full ${colors.barBg} overflow-hidden`}>
                  <motion.div
                    className={`h-full rounded-full ${colors.bar}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.04 + 0.2, ease: "easeOut" }}
                  />
                </div>
              </motion.span>
            );
          })}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Category stats grid */}
                <div className="grid grid-cols-2 gap-3">
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

                {/* Radar Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-full max-w-[280px] md:max-w-[320px]">
                    <ResponsiveContainer width="100%" height={280}>
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid
                          stroke="#06b6d440"
                          strokeDasharray="3 3"
                        />
                        <PolarAngleAxis
                          dataKey="category"
                          tick={{ fill: "#94a3b8", fontSize: 11 }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 15]}
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="Skills"
                          dataKey="skills"
                          stroke="#06b6d4"
                          fill="url(#radarGradient)"
                          strokeWidth={2}
                          fillOpacity={0.4}
                          dot={{ r: 4, fill: "#06b6d4", stroke: "#06b6d4", strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: "#a855f7", stroke: "#a855f7", strokeWidth: 2 }}
                        />
                        <Tooltip content={<RadarTooltip />} />
                        <defs>
                          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3} />
                          </linearGradient>
                        </defs>
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
