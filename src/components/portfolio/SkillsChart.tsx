"use client";

import { useEffect, useState } from "react";

interface SkillData {
  category: string;
  skills: string[];
  level: number; // 0-100
}

interface SkillsChartProps {
  skillsData: SkillData[];
}

export const SkillsChart = ({ skillsData }: SkillsChartProps) => {
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skillsData.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevels(skillsData.map(skill => skill.level));
    }, 500);
    return () => clearTimeout(timer);
  }, [skillsData]);

  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (2 * Math.PI) / skillsData.length;

  const getPoint = (index: number, level: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (level / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getPath = (levels: number[]) => {
    const points = levels.map((level, index) => getPoint(index, level));
    const pathData = points.map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
    return pathData;
  };

  const gridLevels = [20, 40, 60, 80, 100];
  const gridPaths = gridLevels.map(level =>
    getPath(new Array(skillsData.length).fill(level))
  );

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Grid circles */}
        {gridPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {skillsData.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={getPath(animatedLevels)}
          fill="url(#radarGradient)"
          stroke="url(#radarStroke)"
          strokeWidth="2"
          className="transition-all duration-1000 ease-out"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.3)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.3)" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Labels */}
        {skillsData.map((skill, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const labelRadius = radius + 30;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          const textAnchor = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'end' : 'start';
          const dominantBaseline = angle > 0 && angle < Math.PI ? 'hanging' : 'middle';

          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
              className="text-xs font-medium fill-slate-300"
            >
              {skill.category}
            </text>
          );
        })}
      </svg>
    </div>
  );
};