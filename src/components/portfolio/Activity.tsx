"use client";

import { Target, CheckCircle, BookOpen, Calendar, TrendingUp } from "lucide-react";

export const Activity = () => {
  const currentFocus = [
    "Building full-stack applications with modern web technologies",
    "Exploring AI and machine learning applications in software development",
    "Contributing to open-source projects and technical writing",
  ];

  const recentlyCompleted = [
    {
      title: "Completed Advanced Web Development Certificate",
      date: "December 2025",
      description: "Mastered modern web development techniques and frameworks",
    },
    {
      title: "Open Source Contribution to Dagster",
      date: "September 2025",
      description: "Fixed logging integration issue and improved documentation",
    },
    {
      title: "Salesforce Platform Developer I Certification",
      date: "January 2023",
      description: "Achieved professional certification in Salesforce development",
    },
  ];

  const currentlyLearning = [
    "Advanced React patterns and performance optimization",
    "Machine learning model deployment and MLOps",
    "Quantum computing fundamentals and Cirq framework",
    "Advanced TypeScript and Next.js 16 features",
  ];

  const upcomingGoals = [
    "Complete Associate of Science in Computer Science (May 2027)",
    "Launch personal AI/ML project portfolio",
    "Contribute to major open-source projects",
    "Attend tech conferences and networking events",
  ];

  return (
    <section id="activity" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            What I'm Up To
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            My current activities, recent achievements, and future aspirations in tech and development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Focus */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold gradient-text">Current Focus</h3>
            </div>
            <ul className="space-y-3">
              {currentFocus.map((focus, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <TrendingUp className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                  {focus}
                </li>
              ))}
            </ul>
          </div>

          {/* Currently Learning */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold gradient-text">Currently Learning</h3>
            </div>
            <ul className="space-y-3">
              {currentlyLearning.map((learning, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  {learning}
                </li>
              ))}
            </ul>
          </div>

          {/* Recently Completed */}
          <div className="glass-card p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold gradient-text">Recently Completed</h3>
            </div>
            <div className="space-y-6">
              {recentlyCompleted.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                    {index < recentlyCompleted.length - 1 && (
                      <div className="w-px h-16 bg-gradient-to-b from-cyan-400 to-purple-400 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <span className="text-sm text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Goals */}
          <div className="glass-card p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-semibold gradient-text">Upcoming Goals</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingGoals.map((goal, index) => (
                <div key={index} className="flex items-start gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                  {goal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};