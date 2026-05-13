"use client";

import { useEffect, useState, useRef } from "react";
import { Search, ExternalLink, Github, Navigation } from "lucide-react";
import { navLinks } from "@/lib/data";
import { featuredProjects } from "@/lib/data";

interface CommandItem {
  id: string;
  label: string;
  type: "navigation" | "project" | "link";
  href?: string;
  action?: () => void;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Navigation
    ...navLinks.map(link => ({
      id: `nav-${link.label}`,
      label: link.label,
      type: "navigation" as const,
      action: () => {
        const element = document.getElementById(link.href.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
      },
    })),
    // Projects
    ...featuredProjects.map(project => ({
      id: `project-${project.title}`,
      label: project.title,
      type: "project" as const,
      href: project.url || project.colabUrl || project.issueUrl,
    })),
    // Links
    {
      id: "github-profile",
      label: "GitHub Profile",
      type: "link" as const,
      href: "https://github.com/albertfast",
    },
    {
      id: "linkedin-profile",
      label: "LinkedIn Profile",
      type: "link" as const,
      href: "https://linkedin.com/in/ahmetsahiner",
    },
    {
      id: "email-contact",
      label: "Email Contact",
      type: "link" as const,
      href: "mailto:ahmetsahinersf@gmail.com",
    },
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
        setSearchTerm("");
        setSelectedIndex(0);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          if (selectedCommand.action) {
            selectedCommand.action();
          } else if (selectedCommand.href) {
            window.open(selectedCommand.href, "_blank");
            setIsOpen(false);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case "navigation":
        return <Navigation className="w-4 h-4" />;
      case "project":
        return <Github className="w-4 h-4" />;
      case "link":
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Palette */}
        <div className="glass-card relative z-10">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-700/50">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400"
            />
            <div className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
              ESC
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-4 text-center text-slate-400">
                No results found
              </div>
            ) : (
              filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  onClick={() => {
                    if (command.action) {
                      command.action();
                    } else if (command.href) {
                      window.open(command.href, "_blank");
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700/50 transition-colors ${
                    index === selectedIndex ? "bg-slate-700/50" : ""
                  }`}
                >
                  {getIcon(command.type)}
                  <span className="flex-1">{command.label}</span>
                  <span className="text-xs text-slate-500 capitalize">
                    {command.type}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};