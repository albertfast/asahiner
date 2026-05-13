"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export const TimezoneClock = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const sfTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(sfTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeOfDay = () => {
    const hour = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      hour12: false,
    });
    const hourNum = parseInt(hour);

    if (hourNum >= 6 && hourNum < 12) return "morning";
    if (hourNum >= 12 && hourNum < 17) return "afternoon";
    if (hourNum >= 17 && hourNum < 21) return "evening";
    return "night";
  };

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Clock className="w-5 h-5 text-cyan-400" />
        <span className="text-sm font-medium text-slate-300">San Francisco</span>
      </div>
      <div className="text-2xl font-bold gradient-text mb-1">
        {currentTime}
      </div>
      <div className="text-sm text-slate-400 capitalize">
        Good {getTimeOfDay()}!
      </div>
    </div>
  );
};