import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../../lib/mockData';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-24 bg-obsidian border-t border-noir-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest-2xl text-gold-muted mb-2 font-medium">
          <Instagram className="w-3.5 h-3.5 text-gold-400" />
          <span>@hairmasters_indore</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
          The Living <span className="italic font-normal gold-text-champagne">Lookbook</span>
        </h2>
        <div className="w-12 h-[1px] bg-gold-400/60 mx-auto mt-5" />
      </div>

      {/* Grid of gallery squares */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 px-4 max-w-[1600px] mx-auto">
        {GALLERY_ITEMS.slice(0, 6).map((item) => (
          <a
            key={item.id}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden bg-caviar block border border-noir-border hover:border-gold-500/50 transition-all duration-500"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-85 contrast-[1.1] group-hover:brightness-95"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-noir-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
              <Instagram className="w-5 h-5 text-gold-400 mb-2" />
              <span className="font-serif text-sm text-white font-light line-clamp-1">
                {item.title}
              </span>
              <span className="text-[8px] text-gold-muted uppercase tracking-widest mt-1">
                {item.category}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 mt-2" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
