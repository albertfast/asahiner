"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Engineering Manager",
    company: "TechCorp",
    content: "Ahmet's work on our mobile application exceeded expectations. His attention to detail and problem-solving skills are exceptional.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    content: "Outstanding developer with a strong foundation in both frontend and backend technologies. Highly recommended for any technical role.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Testimonials
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            What colleagues and mentors say about working with me.
          </p>
        </div>

        <div
          className="relative glass-card p-8 md:p-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Quote watermark */}
          <div className="absolute top-4 right-4 text-slate-600/20">
            <Quote className="w-16 h-16" />
          </div>

          {/* Testimonial content */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < testimonials[currentIndex].rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-600"
                  }`}
                />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-slate-300 mb-8 italic leading-relaxed">
              "{testimonials[currentIndex].content}"
            </blockquote>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-slate-400">
                {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevious}
              className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-cyan-400" : "bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};