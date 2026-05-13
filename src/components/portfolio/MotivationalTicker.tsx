const quotes = [
  "Code is poetry written in logic.",
  "Every bug is a feature waiting to be discovered.",
  "Innovation happens at the intersection of disciplines.",
  "The best code is the one that explains itself.",
  "Learning never stops in technology.",
  "Build what you love, love what you build.",
  "Debugging is twice as hard as writing code.",
  "Simplicity is the ultimate sophistication.",
  "Fail fast, learn faster.",
  "Technology connects us all.",
];

export const MotivationalTicker = () => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-4 overflow-hidden">
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />

        {/* Scrolling content */}
        <div className="flex animate-scroll">
          {/* Duplicate for seamless loop */}
          {[...quotes, ...quotes].map((quote, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 text-slate-300 text-lg font-medium whitespace-nowrap"
            >
              {quote}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};