"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 md:mb-16 heading-pattern relative"
    >
      {/* Decorative floating dots */}
      <motion.div
        className="absolute -top-6 -left-4 w-2 h-2 rounded-full bg-cyan-accent/40"
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-2 -right-8 w-1.5 h-1.5 rounded-full bg-purple-accent/50"
        animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute -bottom-4 left-8 w-2.5 h-2.5 rounded-full bg-pink-accent/30"
        animate={{ y: [0, 6, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3 relative">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-accent to-purple-accent mx-auto rounded-full animated-underline" />
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
