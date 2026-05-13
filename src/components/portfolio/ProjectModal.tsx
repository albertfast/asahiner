"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, Star } from "lucide-react";
import { ProjectColor } from "@/lib/data";

interface Project {
  title: string;
  description: string;
  tags: string[];
  stars: number;
  url: string;
  topics: string[];
  highlights: string[];
  color: ProjectColor;
  media?: string;
  mediaAlt?: string;
  issueUrl?: string;
  colabUrl?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  if (!project) return null;

  const getColorClasses = (color: ProjectColor) => {
    const classes = {
      cyan: "border-cyan-400/50 bg-cyan-400/10 text-cyan-400",
      purple: "border-purple-400/50 bg-purple-400/10 text-purple-400",
      emerald: "border-emerald-400/50 bg-emerald-400/10 text-emerald-400",
      amber: "border-amber-400/50 bg-amber-400/10 text-amber-400",
      pink: "border-pink-400/50 bg-pink-400/10 text-pink-400",
      indigo: "border-indigo-400/50 bg-indigo-400/10 text-indigo-400",
    };
    return classes[color] || classes.cyan;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card w-full max-w-4xl max-h-full overflow-y-auto">
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>2024</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Media */}
                {project.media && (
                  <div className="mb-6">
                    <img
                      src={project.media}
                      alt={project.mediaAlt}
                      className="w-full rounded-lg border border-slate-700/50"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 gradient-text">Key Highlights</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-slate-300">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getColorClasses(project.color).split(' ')[2]}`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 gradient-text">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm border ${getColorClasses(project.color)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {project.url && project.url !== "" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.colabUrl && (
                    <a
                      href={project.colabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Colab Notebook
                    </a>
                  )}
                  {project.issueUrl && (
                    <a
                      href={project.issueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Issue
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};