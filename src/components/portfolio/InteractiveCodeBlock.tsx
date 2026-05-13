"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Code } from "lucide-react";

interface CodeSnippet {
  language: string;
  code: string;
  title: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    language: "python",
    title: "Reinforcement Learning Agent",
    code: `import torch
import gymnasium as gym
from dqn_agent import DQNAgent

def train_lunar_lander():
    env = gym.make("LunarLander-v3")
    agent = DQNAgent(state_size=8, action_size=4)

    for episode in range(1000):
        state, _ = env.reset()
        done = False
        total_reward = 0

        while not done:
            action = agent.act(state)
            next_state, reward, done, _, _ = env.step(action)
            agent.remember(state, action, reward, next_state, done)
            agent.replay()
            state = next_state
            total_reward += reward

        print(f"Episode {episode}: Reward = {total_reward}")

    env.close()

if __name__ == "__main__":
    train_lunar_lander()`,
  },
  {
    language: "typescript",
    title: "Next.js API Route",
    code: `import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, message } = await request.json();

    // Validate input
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Here you would typically send the email
    // For demo purposes, we'll just log it
    console.log('Contact form submission:', { email, message });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
  },
  {
    language: "sql",
    title: "Database Query",
    code: `SELECT
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
    AND o.status = 'completed'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
  },
];

export const InteractiveCodeBlock = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentCode = codeSnippets[activeTab].code;
    setDisplayedCode("");
    setIsTyping(true);

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < currentCode.length) {
        setDisplayedCode(currentCode.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [activeTab]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <section id="code" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Interactive Code
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore code samples with syntax highlighting and interactive features.
          </p>
        </div>

        <div className="glass-card">
          {/* Tabs */}
          <div className="flex border-b border-slate-700/50">
            {codeSnippets.map((snippet, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="relative">
            <pre className="p-6 text-sm overflow-x-auto bg-slate-900/50 rounded-b-lg">
              <code className={`language-${codeSnippets[activeTab].language.toLowerCase()}`}>
                {displayedCode}
                {isTyping && <span className="animate-pulse">|</span>}
              </code>
            </pre>

            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};