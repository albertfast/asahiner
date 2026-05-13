"use client";

import { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowUp } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const checkScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 50);
    setShowBackToTop(scrollY > window.innerHeight * 0.5);

    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-card navbar-scrolled-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-lg font-bold tracking-tight gradient-text"
            >
              {personalInfo.name}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                      isActive
                        ? "text-cyan-accent"
                        : "text-muted-foreground hover:text-foreground"
                    } hover:bg-cyan-accent/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-cyan-accent via-purple-accent to-cyan-accent"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden glass-card border-t border-cyan-accent/10 overflow-hidden relative z-[60]"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === link.href.replace("#", "")
                        ? "text-cyan-accent bg-cyan-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-accent/20 hover:shadow-purple-accent/30 transition-shadow duration-300 mb-safe"
            style={{
              backgroundImage: "linear-gradient(135deg, #06b6d4, #a855f7)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
