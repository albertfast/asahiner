"use client";

import { useEffect, useState } from "react";
import { Github, Users, UserPlus, Star } from "lucide-react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
}

export const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/albertfast');
        const userData = await userResponse.json();

        // Fetch repos to calculate total stars
        const reposResponse = await fetch('https://api.github.com/users/albertfast/repos?per_page=100');
        const reposData = await reposResponse.json();
        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);

        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          totalStars,
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        // Fallback data
        setStats({
          publicRepos: 15,
          followers: 42,
          following: 38,
          totalStars: 25,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-4 shimmer-placeholder">
            <div className="h-8 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    {
      icon: Github,
      label: "Public Repos",
      value: stats.publicRepos,
      color: "text-cyan-400",
    },
    {
      icon: Users,
      label: "Followers",
      value: stats.followers,
      color: "text-purple-400",
    },
    {
      icon: UserPlus,
      label: "Following",
      value: stats.following,
      color: "text-emerald-400",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: stats.totalStars,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="glass-card p-4 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <div>
              <div className="text-2xl font-bold gradient-text">{item.value}</div>
              <div className="text-sm text-slate-400">{item.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};