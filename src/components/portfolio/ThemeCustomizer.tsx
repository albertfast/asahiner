"use client";

import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";

interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

const colorPresets: ColorPreset[] = [
  {
    name: "Default",
    primary: "#06b6d4", // cyan
    secondary: "#a855f7", // purple
    accent: "#06b6d4",
  },
  {
    name: "Warm",
    primary: "#f59e0b", // amber
    secondary: "#ef4444", // red
    accent: "#f59e0b",
  },
  {
    name: "Ocean",
    primary: "#06b6d4", // cyan
    secondary: "#0891b2", // cyan-600
    accent: "#06b6d4",
  },
  {
    name: "Sunset",
    primary: "#f97316", // orange
    secondary: "#dc2626", // red-600
    accent: "#f97316",
  },
  {
    name: "Monochrome",
    primary: "#6b7280", // gray
    secondary: "#374151", // gray-700
    accent: "#6b7280",
  },
];

export const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPreset, setCurrentPreset] = useState("Default");

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("theme-preset");
    if (saved) {
      setCurrentPreset(saved);
      applyPreset(saved);
    }
  }, []);

  const applyPreset = (presetName: string) => {
    const preset = colorPresets.find(p => p.name === presetName);
    if (!preset) return;

    // Update CSS variables
    document.documentElement.style.setProperty("--color-primary", preset.primary);
    document.documentElement.style.setProperty("--color-secondary", preset.secondary);
    document.documentElement.style.setProperty("--color-accent", preset.accent);

    // Update gradient classes if needed
    // This might require updating specific elements
  };

  const handlePresetSelect = (presetName: string) => {
    setCurrentPreset(presetName);
    applyPreset(presetName);
    localStorage.setItem("theme-preset", presetName);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center hover:bg-slate-700/80 transition-colors"
        aria-label="Theme customizer"
      >
        <Palette className="w-5 h-5 text-cyan-400" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 glass-card p-4 min-w-64">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Accent Colors</h3>
          <div className="space-y-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset.name)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.secondary }}
                    />
                  </div>
                  <span className="text-sm">{preset.name}</span>
                </div>
                {currentPreset === preset.name && (
                  <Check className="w-4 h-4 text-green-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};