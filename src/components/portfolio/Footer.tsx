"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, Sparkles } from "lucide-react";
import { personalInfo, navLinks } from "@/lib/data";

const socialLinks = [
  {
    icon: Github,
    href: personalInfo.githubUrl,
    label: "GitHub",
    hoverColor: "hover:text-cyan-accent hover:border-cyan-accent/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  {
    icon: Linkedin,
    href: personalInfo.linkedinUrl,
    label: "LinkedIn",
    hoverColor: "hover:text-purple-accent hover:border-purple-accent/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
  },
  {
    icon: Mail,
    href: `mailto:${personalInfo.email}`,
    label: "Email",
    hoverColor: "hover:text-pink-accent hover:border-pink-accent/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.25)]",
  },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <footer className="relative py-12 px-4 overflow-hidden">
      {/* Animated shimmer gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] footer-shimmer-border" />

      {/* Background orbs */}
      <div className="absolute -top-20 left-1/4 w-[300px] h-[200px] bg-cyan-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-[250px] h-[180px] bg-purple-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Let's Connect CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-accent" />
            <h3 className="text-base font-semibold gradient-text">Let&apos;s Connect</h3>
            <Sparkles className="w-4 h-4 text-purple-accent" />
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Whether you have an exciting project, a research idea, or just want to say hi — I&apos;d love to hear from you. Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-bold gradient-text mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold mb-3 gradient-text-warm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs text-muted-foreground hover:text-cyan-accent transition-colors text-left py-0.5"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold mb-3 gradient-text-cool">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground ${social.hoverColor} transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <SocialIcon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gradient-to-r from-transparent via-border to-transparent flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-xs text-muted-foreground/40">·</span>
            <p className="text-xs text-muted-foreground/60">
              Last updated: {lastUpdated}
            </p>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-accent" /> using
            <span className="text-cyan-accent"> Next.js</span>,{" "}
            <span className="text-purple-accent">Three.js</span> &{" "}
            <span className="text-pink-accent">Framer Motion</span>
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-accent/20 to-purple-accent/20 border border-cyan-accent/20 flex items-center justify-center text-cyan-accent hover:border-cyan-accent/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
