import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../lib/mockData';

export const Testimonials: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev === 0 ? INITIAL_TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIdx((prev) => (prev === INITIAL_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = INITIAL_TESTIMONIALS[currentIdx];

  return (
    <section className="py-28 bg-caviar border-t border-noir-border relative overflow-hidden">
      {/* Candlelight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="text-[10px] tracking-widest-2xl uppercase text-gold-muted font-medium block mb-3">
          Patron Testimonies
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-16">
          Words of <span className="italic font-normal gold-text-champagne">Royal Distinction</span>
        </h2>

        {/* Guestbook Card */}
        <div className="gilded-box bg-noir-800 border border-noir-border p-10 sm:p-16 relative shadow-luxury-elevation">
          {/* Stars */}
          <div className="flex items-center justify-center space-x-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            ))}
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-gray-200 italic leading-relaxed mb-10 max-w-2xl mx-auto">
            "{current.comment}"
          </blockquote>

          <div className="flex flex-col items-center">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-16 h-16 rounded-full object-cover border border-gold-400/80 p-0.5 mb-3"
            />
            <h4 className="font-serif text-lg font-normal text-white tracking-wide">
              {current.name}
            </h4>
            <span className="text-xs text-gold-muted tracking-wider font-light mt-0.5">
              {current.role}
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">
              Experienced: {current.service}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-6 mt-10 pt-8 border-t border-noir-border">
            <button
              onClick={prev}
              className="w-9 h-9 border border-noir-border hover:border-gold-400/60 flex items-center justify-center text-gold-muted hover:text-gold-200 transition-colors"
              aria-label="Previous testimony"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] tracking-widest uppercase text-gray-500">
              0{currentIdx + 1} / 0{INITIAL_TESTIMONIALS.length}
            </span>
            <button
              onClick={next}
              className="w-9 h-9 border border-noir-border hover:border-gold-400/60 flex items-center justify-center text-gold-muted hover:text-gold-200 transition-colors"
              aria-label="Next testimony"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
