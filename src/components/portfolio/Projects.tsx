"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Github, BookOpen, Sparkles, ChevronDown, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import { featuredProjects, type ProjectColor } from "@/lib/data";

const SectionAmbient3D = dynamic(
  () => import("./SectionAmbient3D").then((mod) => ({ default: mod.SectionAmbient3D })),
  { ssr: false }
);

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const filterOptions = ["All", "Python", "JavaScript", "TypeScript", "React", "Salesforce", "Java"];

const colorConfig: Record<ProjectColor, {
  text: string;
  bg: string;
  pill: string;
  border: string;
  glow: string;
  icon: string;
  highlight: string;
  accentGradient: string;
}> = {
  cyan: {
    text: "text-cyan-light",
    bg: "bg-cyan-accent/8",
    pill: "bg-cyan-accent/10 text-cyan-light border-cyan-accent/15",
    border: "border-t-color-cyan",
    glow: "hover-glow-cyan",
    icon: "text-cyan-accent",
    highlight: "bg-cyan-accent/15 text-cyan-light",
    accentGradient: "from-cyan-accent to-cyan-light",
  },
  purple: {
    text: "text-purple-light",
    bg: "bg-purple-accent/8",
    pill: "bg-purple-accent/10 text-purple-light border-purple-accent/15",
    border: "border-t-color-purple",
    glow: "hover-glow-purple",
    icon: "text-purple-accent",
    highlight: "bg-purple-accent/15 text-purple-light",
    accentGradient: "from-purple-accent to-purple-light",
  },
  emerald: {
    text: "text-emerald-accent",
    bg: "bg-emerald-accent/8",
    pill: "bg-emerald-accent/10 text-emerald-accent border-emerald-accent/15",
    border: "border-t-color-emerald",
    glow: "hover-glow-emerald",
    icon: "text-emerald-accent",
    highlight: "bg-emerald-accent/15 text-emerald-accent",
    accentGradient: "from-emerald-accent to-emerald-accent/70",
  },
  amber: {
    text: "text-amber-accent",
    bg: "bg-amber-accent/8",
    pill: "bg-amber-accent/10 text-amber-accent border-amber-accent/15",
    border: "border-t-color-amber",
    glow: "hover-glow-amber",
    icon: "text-amber-accent",
    highlight: "bg-amber-accent/15 text-amber-accent",
    accentGradient: "from-amber-accent to-amber-accent/70",
  },
  pink: {
    text: "text-pink-accent",
    bg: "bg-pink-accent/8",
    pill: "bg-pink-accent/10 text-pink-accent border-pink-accent/15",
    border: "border-t-color-pink",
    glow: "hover-glow-pink",
    icon: "text-pink-accent",
    highlight: "bg-pink-accent/15 text-pink-accent",
    accentGradient: "from-pink-accent to-pink-accent/70",
  },
  indigo: {
    text: "text-indigo-accent",
    bg: "bg-indigo-accent/8",
    pill: "bg-indigo-accent/10 text-indigo-accent border-indigo-accent/15",
    border: "border-t-color-indigo",
    glow: "hover-glow-indigo",
    icon: "text-indigo-accent",
    highlight: "bg-indigo-accent/15 text-indigo-accent",
    accentGradient: "from-indigo-accent to-indigo-accent/70",
  },
};

const ITEMS_PER_PAGE = 6;
const GITHUB_REPOS_URL =
  "https://api.github.com/users/albertfast/repos?sort=updated&per_page=6";

export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const fetchRepos = useCallback(async () => {
    try {
      const res = await fetch(GITHUB_REPOS_URL, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      }
    } catch {
      // Silently fail, featured projects still shown
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const allProjects = [
    ...featuredProjects.map((p) => ({
      title: p.title,
      description: p.description,
      tags: p.tags,
      stars: p.stars,
      url: p.url,
      colabUrl: (p as { colabUrl?: string }).colabUrl,
      issueUrl: (p as { issueUrl?: string }).issueUrl,
      media: (p as { media?: string }).media,
      mediaAlt: (p as { mediaAlt?: string }).mediaAlt,
      highlights: p.highlights,
      topics: p.topics,
      color: p.color as ProjectColor,
      isFeatured: true,
    })),
    ...repos
      .filter((r) => !featuredProjects.some((fp) => fp.url === r.html_url))
      .map((r) => ({
        title: r.name,
        description: r.description || "No description available",
        tags: [r.language, ...(r.topics || [])].filter(Boolean) as string[],
        stars: r.stargazers_count,
        url: r.html_url,
        colabUrl: undefined,
        issueUrl: undefined,
        media: undefined,
        mediaAlt: undefined,
        highlights: [] as string[],
        topics: r.topics,
        color: "cyan" as ProjectColor,
        isFeatured: false,
      })),
  ];

  const filteredProjects =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
        );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, ITEMS_PER_PAGE);
  const hasMore = filteredProjects.length > ITEMS_PER_PAGE;

  return (
    <section id="projects" className="py-20 md:py-28 px-4 section-gradient-mixed relative overflow-hidden">
      <SectionAmbient3D variant="projects" />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Projects"
          subtitle="Featured work and open source contributions"
        />

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {filterOptions.map((opt) => (
            <motion.button
              key={opt}
              onClick={() => { setFilter(opt); setShowAll(false); }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                filter === opt
                  ? "bg-gradient-to-r from-cyan-accent to-purple-accent text-white glow-cyan shadow-lg shadow-cyan-accent/10"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-cyan-accent/30 border-t-cyan-accent rounded-full mx-auto mb-3"
            />
            <p className="text-muted-foreground text-sm">Loading GitHub repos...</p>
          </div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {displayedProjects.map((project, i) => {
              const conf = colorConfig[project.color] || colorConfig.cyan;
              const isGitHubUrl = project.url?.includes("github.com");
              return (
                <motion.div
                  key={project.title + i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className={`glass-card rounded-xl p-5 ${conf.glow} ${conf.border} transition-all duration-300 group flex flex-col relative overflow-hidden`}
                >
                  {/* Colored accent glow in corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${conf.accentGradient} rounded-full blur-3xl opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity`} />

                  {project.media && (
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-border/30 bg-background/60">
                      <img
                        src={project.media}
                        alt={project.mediaAlt || `${project.title} preview`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className={`absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t ${conf.accentGradient} opacity-20`} />
                    </div>
                  )}

                  {/* Top row: title + stars */}
                  <div className="flex items-start justify-between mb-3 relative">
                    <h3 className={`text-sm font-semibold text-foreground group-hover:${conf.text} transition-colors line-clamp-1 flex items-center gap-2`}>
                      {project.isFeatured && (
                        <Sparkles className="w-3.5 h-3.5 text-amber-accent shrink-0" />
                      )}
                      {project.title}
                    </h3>
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1 text-xs text-amber-accent shrink-0 ml-2">
                        <Star className="w-3.5 h-3.5 fill-amber-accent" />
                        <span className="font-medium">{project.stars}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Highlight badges */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.highlights.map((h) => (
                        <span
                          key={h}
                          className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${conf.highlight}`}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Topics */}
                  {project.topics && project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${conf.pill} border`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom row: tags + action buttons */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${conf.pill} border`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.colabUrl && (
                        <a
                          href={project.colabUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-amber-accent transition-colors"
                          aria-label={`Open ${project.title} in Colab`}
                        >
                          <BookOpen className="w-4 h-4" />
                        </a>
                      )}
                      {project.issueUrl && (
                        <a
                          href={project.issueUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs ${conf.icon} hover:opacity-80 transition-colors`}
                          aria-label={`Open ${project.title} issue or pull request`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs ${conf.icon} hover:opacity-80 transition-colors`}
                          aria-label={`Open ${project.title}`}
                        >
                          {isGitHubUrl ? (
                            <Github className="w-4 h-4" />
                          ) : (
                            <ExternalLink className="w-4 h-4" />
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Show More / Less */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium glass-card text-cyan-accent hover:border-cyan-accent/30 transition-all duration-300"
            >
              {showAll ? "Show Less" : `Show All Projects (${filteredProjects.length})`}
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
