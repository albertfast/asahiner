"use client";

import { motion } from "framer-motion";
import { Atom, Eye, Orbit, Cpu, Search, Image } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { researchInterests } from "@/lib/data";

const researchIcons = [Atom, Eye, Orbit, Cpu, Search, Image];

const cardAccents = [
  { gradient: "from-cyan-accent to-cyan-light", iconBg: "bg-cyan-accent/15", iconText: "text-cyan-accent", pill: "bg-cyan-accent/10 text-cyan-light border-cyan-accent/15", glow: "hover-glow-cyan", borderAccent: "border-t-color-cyan", cornerBg: "from-cyan-accent" },
  { gradient: "from-purple-accent to-purple-light", iconBg: "bg-purple-accent/15", iconText: "text-purple-accent", pill: "bg-purple-accent/10 text-purple-light border-purple-accent/15", glow: "hover-glow-purple", borderAccent: "border-t-color-purple", cornerBg: "from-purple-accent" },
  { gradient: "from-amber-accent to-amber-accent/70", iconBg: "bg-amber-accent/15", iconText: "text-amber-accent", pill: "bg-amber-accent/10 text-amber-accent border-amber-accent/15", glow: "hover-glow-amber", borderAccent: "border-t-color-amber", cornerBg: "from-amber-accent" },
  { gradient: "from-emerald-accent to-emerald-accent/70", iconBg: "bg-emerald-accent/15", iconText: "text-emerald-accent", pill: "bg-emerald-accent/10 text-emerald-accent border-emerald-accent/15", glow: "hover-glow-emerald", borderAccent: "border-t-color-emerald", cornerBg: "from-emerald-accent" },
  { gradient: "from-pink-accent to-pink-accent/70", iconBg: "bg-pink-accent/15", iconText: "text-pink-accent", pill: "bg-pink-accent/10 text-pink-accent border-pink-accent/15", glow: "hover-glow-pink", borderAccent: "border-t-color-pink", cornerBg: "from-pink-accent" },
  { gradient: "from-indigo-accent to-indigo-accent/70", iconBg: "bg-indigo-accent/15", iconText: "text-indigo-accent", pill: "bg-indigo-accent/10 text-indigo-accent border-indigo-accent/15", glow: "hover-glow-indigo", borderAccent: "border-t-color-indigo", cornerBg: "from-indigo-accent" },
];

export function Research() {
  return (
    <section id="research" className="py-20 md:py-28 px-4 section-gradient-pink relative overflow-hidden">
      {/* Floating orbs - VIVID */}
      <div className="orb orb-purple w-[300px] h-[300px] -top-16 right-10" style={{ animationDelay: "-3s" }} />
      <div className="orb orb-cyan w-[240px] h-[240px] bottom-20 left-10 opacity-40" style={{ animationDelay: "-7s" }} />
      <div className="orb orb-pink w-[200px] h-[200px] top-1/2 -right-10 opacity-35" style={{ animationDelay: "-10s" }} />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Research Interests"
          subtitle="Exploring the frontiers of quantum computing, machine learning, and beyond"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {researchInterests.map((topic, i) => {
            const Icon = researchIcons[i];
            const accent = cardAccents[i % cardAccents.length];
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`glass-card rounded-xl p-5 ${accent.glow} ${accent.borderAccent} transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Colored corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${accent.cornerBg} to-transparent rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none`} />

                <div className={`w-10 h-10 rounded-lg ${accent.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${accent.iconText}`} />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {topic.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${accent.pill} border`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
