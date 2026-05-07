"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "cyan-purple" | "purple-pink" | "emerald-cyan" | "amber-pink";
}

const variantStyles: Record<
  NonNullable<SectionDividerProps["variant"]>,
  {
    gradient: string;
    glowColor: string;
    dotColor: string;
    sparkleColor: string;
  }
> = {
  "cyan-purple": {
    gradient: "from-cyan-accent via-purple-accent to-cyan-accent",
    glowColor: "rgba(6, 182, 212, 0.3)",
    dotColor: "bg-cyan-accent",
    sparkleColor: "bg-cyan-accent",
  },
  "purple-pink": {
    gradient: "from-purple-accent via-pink-accent to-purple-accent",
    glowColor: "rgba(168, 85, 247, 0.3)",
    dotColor: "bg-purple-accent",
    sparkleColor: "bg-purple-accent",
  },
  "emerald-cyan": {
    gradient: "from-emerald-accent via-cyan-accent to-emerald-accent",
    glowColor: "rgba(16, 185, 129, 0.3)",
    dotColor: "bg-emerald-accent",
    sparkleColor: "bg-emerald-accent",
  },
  "amber-pink": {
    gradient: "from-amber-accent via-pink-accent to-amber-accent",
    glowColor: "rgba(245, 158, 11, 0.3)",
    dotColor: "bg-amber-accent",
    sparkleColor: "bg-amber-accent",
  },
};

/* Small sparkle particles that float on either side */
function Sparkle({
  delay,
  x,
  style,
}: {
  delay: number;
  x: string;
  style: { sparkleColor: string };
}) {
  return (
    <motion.span
      className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${style.sparkleColor} opacity-0`}
      style={{ left: x }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      }}
    />
  );
}

export function SectionDivider({ variant = "cyan-purple" }: SectionDividerProps) {
  const style = variantStyles[variant];

  /* Generate sparkle positions */
  const sparklesLeft = [
    { x: "20%", delay: 0 },
    { x: "30%", delay: 0.4 },
    { x: "38%", delay: 0.8 },
  ];
  const sparklesRight = [
    { x: "62%", delay: 0.2 },
    { x: "70%", delay: 0.6 },
    { x: "80%", delay: 1.0 },
  ];

  return (
    <motion.div
      className="relative w-full h-[50px] flex items-center justify-center select-none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden="true"
    >
      {/* Gradient line */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r ${style.gradient} rounded-full`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />

      {/* Glow behind line */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-[15%] right-[15%] h-[6px] rounded-full blur-sm opacity-40"
        style={{ background: `linear-gradient(90deg, ${style.glowColor}, transparent 30%, transparent 70%, ${style.glowColor})` }}
      />

      {/* Center diamond that pulses */}
      <motion.div
        className={`relative z-10 w-2.5 h-2.5 ${style.dotColor} rotate-45 rounded-[2px]`}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* Pulse ring */}
        <motion.div
          className={`absolute inset-0 ${style.dotColor} rotate-0 rounded-full opacity-30`}
          animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Sparkle particles */}
      {sparklesLeft.map((s, i) => (
        <Sparkle key={`l${i}`} delay={s.delay} x={s.x} style={style} />
      ))}
      {sparklesRight.map((s, i) => (
        <Sparkle key={`r${i}`} delay={s.delay} x={s.x} style={style} />
      ))}
    </motion.div>
  );
}
