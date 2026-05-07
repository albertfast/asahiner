"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, FolderGit2, Briefcase } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import { aboutContent } from "@/lib/data";
import profilePhoto from "@/static/flash-story-sahne-1.jpg";

const AboutCyberBackground = dynamic(
  () => import("./AboutCyberBackground").then((mod) => ({ default: mod.AboutCyberBackground })),
  {
    ssr: false,
    loading: () => <div className="pointer-events-none absolute inset-0 z-0 bg-background" />,
  }
);

const statIcons = [User, GraduationCap, FolderGit2, Briefcase];
const statColors = [
  { icon: "text-cyan-accent", bg: "from-cyan-accent/20 to-cyan-accent/5", border: "hover:border-cyan-accent/30", glow: "hover-glow-cyan" },
  { icon: "text-purple-accent", bg: "from-purple-accent/20 to-purple-accent/5", border: "hover:border-purple-accent/30", glow: "hover-glow-purple" },
  { icon: "text-emerald-accent", bg: "from-emerald-accent/20 to-emerald-accent/5", border: "hover:border-emerald-accent/30", glow: "hover-glow-emerald" },
  { icon: "text-amber-accent", bg: "from-amber-accent/20 to-amber-accent/5", border: "hover:border-amber-accent/30", glow: "hover-glow-amber" },
];
const statGradientTexts = [
  "text-cyan-light",
  "text-purple-light",
  "text-emerald-accent",
  "text-amber-accent",
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 section-gradient-cyan relative overflow-hidden">
      <AboutCyberBackground />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading title="About Me" subtitle="A brief introduction to who I am and what drives me" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-cyan-accent to-purple-accent p-1 pulse-glow">
                <div className="relative w-full h-full rounded-full bg-background overflow-hidden">
                  <img
                    src={profilePhoto.src}
                    alt="Ahmet Sahiner profile photo"
                    className="h-full w-full object-cover object-[50%_43%]"
                  />
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-[-12px] rounded-full border border-cyan-accent/20 animate-spin" style={{ animationDuration: "20s" }} />
              <div className="absolute inset-[-24px] rounded-full border border-dashed border-purple-accent/15 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-accent to-cyan-accent opacity-20 blur-xl" />
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-4 rounded-xl border border-cyan-accent/10 bg-background/80 p-4 md:p-5 backdrop-blur-md"
          >
            {aboutContent.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="text-muted-foreground leading-relaxed text-sm md:text-base"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {aboutContent.stats.map((stat, i) => {
            const Icon = statIcons[i];
            const color = statColors[i];
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`glass-card rounded-xl p-4 md:p-6 text-center ${color.border} ${color.glow} transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color.bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${color.icon}`} />
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${statGradientTexts[i]}`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
