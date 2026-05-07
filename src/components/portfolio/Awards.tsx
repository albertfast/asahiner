"use client";

import { motion } from "framer-motion";
import { Award, Rocket, Users, Code, Trophy, Medal, Crown, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { awards } from "@/lib/data";

const awardIcons: Record<string, typeof Award> = {
  award: Trophy,
  rocket: Rocket,
  users: Users,
  code: Code,
};

const awardAccents = [
  { gradient: "from-amber-accent to-yellow-400", iconBg: "bg-amber-accent/15", iconText: "text-amber-accent", glow: "hover-glow-amber", badge: "bg-amber-accent/10 text-amber-accent border-amber-accent/20" },
  { gradient: "from-cyan-accent to-cyan-light", iconBg: "bg-cyan-accent/15", iconText: "text-cyan-accent", glow: "hover-glow-cyan", badge: "bg-cyan-accent/10 text-cyan-accent border-cyan-accent/20" },
  { gradient: "from-purple-accent to-purple-light", iconBg: "bg-purple-accent/15", iconText: "text-purple-accent", glow: "hover-glow-purple", badge: "bg-purple-accent/10 text-purple-accent border-purple-accent/20" },
  { gradient: "from-emerald-accent to-emerald-accent/70", iconBg: "bg-emerald-accent/15", iconText: "text-emerald-accent", glow: "hover-glow-emerald", badge: "bg-emerald-accent/10 text-emerald-accent border-emerald-accent/20" },
];

const trophyDecorations = [Crown, Medal, Star];

export function Awards() {
  return (
    <section id="awards" className="py-20 md:py-28 px-4 section-gradient-amber relative overflow-hidden">
      {/* Floating orbs - VIVID */}
      <div className="orb orb-amber w-[300px] h-[300px] -top-16 right-0" style={{ animationDelay: "-3s" }} />
      <div className="orb orb-cyan w-[240px] h-[240px] bottom-20 left-10 opacity-40" style={{ animationDelay: "-7s" }} />
      <div className="orb orb-pink w-[220px] h-[220px] top-1/3 -left-16 opacity-35" style={{ animationDelay: "-10s" }} />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Awards & Honors"
          subtitle="Recognitions and achievements along my journey"
        />

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {awards.map((award, i) => {
            const Icon = awardIcons[award.icon] || Trophy;
            const accent = awardAccents[i % awardAccents.length];
            const DecoIcon = trophyDecorations[i % trophyDecorations.length];

            return (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className={`glass-card rounded-xl p-5 md:p-6 ${accent.glow} transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Trophy decoration in corner */}
                <motion.div
                  className={`absolute top-3 right-3 ${accent.iconText} opacity-10 group-hover:opacity-20 transition-opacity`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 0.5 }}
                >
                  <DecoIcon className="w-12 h-12" />
                </motion.div>

                {/* Colored glow behind icon */}
                <div className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br ${accent.gradient} rounded-full blur-2xl opacity-10 pointer-events-none`} />

                <div className="flex items-start gap-4 relative">
                  <motion.div
                    className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center shrink-0`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className={`w-6 h-6 ${accent.iconText}`} />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      {award.title}
                      <motion.span
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <Star className="w-3.5 h-3.5 text-amber-accent" />
                      </motion.span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {award.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
