"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Shield, CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import {
  educationEntries,
  certifications,
  deansList,
} from "@/lib/data";

const EducationCyberBackground = dynamic(
  () => import("./EducationCyberBackground").then((mod) => ({ default: mod.EducationCyberBackground })),
  {
    ssr: false,
    loading: () => <div className="pointer-events-none absolute inset-0 z-0 bg-background" />,
  }
);

const timelineColors = [
  { dot: "from-cyan-accent to-cyan-light", glow: "glow-cyan", text: "text-cyan-accent" },
  { dot: "from-purple-accent to-purple-light", glow: "glow-purple", text: "text-purple-accent" },
  { dot: "from-emerald-accent to-emerald-light", glow: "glow-emerald", text: "text-emerald-accent" },
  { dot: "from-amber-accent to-amber-light", glow: "glow-amber", text: "text-amber-accent" },
  { dot: "from-pink-accent to-pink-accent/70", glow: "glow-pink", text: "text-pink-accent" },
];

const certBorders = [
  "hover:border-cyan-accent/40 hover-glow-cyan",
  "hover:border-purple-accent/40 hover-glow-purple",
  "hover:border-emerald-accent/40 hover-glow-emerald",
  "hover:border-amber-accent/40 hover-glow-amber",
];

const certIcons = [
  "text-cyan-accent bg-cyan-accent/10",
  "text-purple-accent bg-purple-accent/10",
  "text-emerald-accent bg-emerald-accent/10",
  "text-amber-accent bg-amber-accent/10",
];

function TimelineItem({
  institution,
  degree,
  date,
  gpa,
  details,
  index,
}: {
  institution: string;
  degree: string;
  date: string;
  gpa?: string | null;
  details?: string | null;
  index: number;
}) {
  const color = timelineColors[index % timelineColors.length];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0 pb-10 last:pb-0"
    >
      {/* Vertical line with gradient */}
      <div className="absolute left-[11px] md:left-1/2 top-2 bottom-0 w-px bg-gradient-to-b from-cyan-accent/40 via-purple-accent/40 to-emerald-accent/40 -translate-x-1/2" />

      {/* Animated dot */}
      <motion.div
        className={`absolute left-[4px] md:left-1/2 top-1.5 w-[18px] h-[18px] rounded-full bg-gradient-to-br ${color.dot} -translate-x-1/2 ${color.glow}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      />

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`md:w-[calc(50%-2rem)] glass-card rounded-xl p-4 md:p-5 ml-0 md:ml-0 hover-glow-${["cyan", "purple", "emerald", "amber", "pink"][index % 5]} transition-all duration-300 ${
          isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <p className={`text-xs ${color.text} font-medium`}>{date}</p>
        </div>
        <h3 className="text-sm md:text-base font-semibold text-foreground">
          {degree}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          {institution}
        </p>
        {(gpa || details) && (
          <p className="text-xs text-muted-foreground mt-1">
            {gpa && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-accent/10 text-emerald-accent text-[10px] font-medium mr-2">
                GPA: {gpa}
              </span>
            )}
            {details}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28 px-4 section-gradient-purple relative overflow-hidden">
      <EducationCyberBackground />

      <div className="mx-auto max-w-5xl relative z-10">
        <SectionHeading title="Education" subtitle="My academic journey and certifications" />

        {/* Education Timeline */}
        <div className="relative">
          {educationEntries.map((entry, i) => (
            <TimelineItem key={i} {...entry} index={i} />
          ))}
        </div>

        {/* Dean's List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="glass-card rounded-xl p-4 md:p-6 hover-glow-purple transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-accent/20 to-amber-accent/5 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold">
                Dean&apos;s Honor List
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {deansList.map((semester) => (
                <motion.span
                  key={semester}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-purple-accent/10 text-purple-light border border-purple-accent/20 pulse-glow-purple cursor-default"
                >
                  <CheckCircle className="w-3 h-3 inline mr-1 -mt-0.5" />
                  {semester}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-accent/20 to-cyan-accent/5 flex items-center justify-center">
              <Shield className="w-4 h-4 text-cyan-accent" />
            </div>
            <h3 className="text-base md:text-lg font-semibold">Certifications</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => {
              const borderClass = certBorders[i % certBorders.length];
              const iconClass = certIcons[i % certIcons.length];
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`glass-card rounded-xl p-4 transition-all duration-300 ${borderClass}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{cert.name}</h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                        {cert.credentialId && (
                          <span className="px-2 py-0.5 rounded bg-muted/50">ID: {cert.credentialId}</span>
                        )}
                        {cert.date && <span>{cert.date}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
