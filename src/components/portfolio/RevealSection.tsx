"use client";

import { motion } from "framer-motion";

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function RevealSection({ children, delay = 0, className }: RevealSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
