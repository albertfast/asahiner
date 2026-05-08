"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale-up" | "blur-in";
  delay?: number;
  className?: string;
}

export const SectionReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  className = ""
}: SectionRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getVariants = () => {
    const baseVariants = {
      hidden: {},
      visible: {
        transition: {
          duration: 0.6,
          delay,
          ease: "easeOut",
        },
      },
    };

    switch (variant) {
      case "fade-up":
        return {
          ...baseVariants,
          hidden: { opacity: 0, y: 30 },
          visible: { ...baseVariants.visible, opacity: 1, y: 0 },
        };
      case "fade-left":
        return {
          ...baseVariants,
          hidden: { opacity: 0, x: -30 },
          visible: { ...baseVariants.visible, opacity: 1, x: 0 },
        };
      case "fade-right":
        return {
          ...baseVariants,
          hidden: { opacity: 0, x: 30 },
          visible: { ...baseVariants.visible, opacity: 1, x: 0 },
        };
      case "scale-up":
        return {
          ...baseVariants,
          hidden: { opacity: 0, scale: 0.8 },
          visible: { ...baseVariants.visible, opacity: 1, scale: 1 },
        };
      case "blur-in":
        return {
          ...baseVariants,
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { ...baseVariants.visible, opacity: 1, filter: "blur(0px)" },
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};