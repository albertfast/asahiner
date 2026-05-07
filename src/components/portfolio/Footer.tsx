"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { personalInfo, navLinks } from "@/lib/data";

export function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-accent via-purple-accent to-pink-accent" />

      {/* Background orbs */}
      <div className="absolute -top-20 left-1/4 w-[300px] h-[200px] bg-cyan-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-[250px] h-[180px] bg-purple-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
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
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-cyan-accent hover:border-cyan-accent/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-purple-accent hover:border-purple-accent/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-pink-accent hover:border-pink-accent/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gradient-to-r from-transparent via-border to-transparent flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
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
