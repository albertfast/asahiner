interface SectionDividerProps {
  variant?: "gradient" | "dots" | "line";
  className?: string;
}

export const SectionDivider = ({ variant = "gradient", className = "" }: SectionDividerProps) => {
  const renderDivider = () => {
    switch (variant) {
      case "gradient":
        return (
          <div className="relative py-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </div>
        );

      case "dots":
        return (
          <div className="py-16 flex justify-center">
            <div className="flex items-center gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        );

      case "line":
        return (
          <div className="py-16">
            <div className="w-full h-px bg-slate-700/50" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {renderDivider()}
    </div>
  );
};