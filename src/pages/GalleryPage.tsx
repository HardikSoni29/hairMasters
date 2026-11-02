import React from 'react';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { Camera, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  return (
    <div className="py-16 bg-luxury-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-2">
            Haute Couture Lookbook
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white tracking-tight">
            The Portfolios of Transformation
          </h1>
          <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Real clients, authentic craftsmanship. Explore editorial hair balayage, royal brides of Central India, and sculpted razor lines.
          </p>
          <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
        </div>

        <GalleryGrid />
      </div>
    </div>
  );
};
