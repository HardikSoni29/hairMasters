import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, MapPin, ShieldCheck, Gem } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-caviar pt-20">
      {/* Background High-Fashion Editorial Imagery with Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2200&q=85"
          alt="Hair Masters Luxury Salon Indore"
          className="w-full h-full object-cover object-center scale-100 opacity-40 filter contrast-[1.2] brightness-[0.65]"
        />
        {/* Soft Radial Candlelight & Obsidian Edge Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-caviar via-caviar/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-caviar via-transparent to-caviar opacity-90" />
      </div>

      {/* Gentle Gold Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-28">
        {/* Monogram Seal & Location Tag */}
        <div className="inline-flex items-center space-x-3 px-5 py-1.5 border border-gold-500/30 bg-noir-800/80 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] tracking-widest-xl uppercase text-gold-champagne font-light">
            Indore Sanctuary • Scheme 54, Vijay Nagar
          </span>
          <span className="text-noir-border">|</span>
          <span className="text-[10px] tracking-widest uppercase text-gray-400 flex items-center">
            <Star className="w-3 h-3 text-gold-400 fill-gold-400 inline mr-1" />
            4.98 Haute Score
          </span>
        </div>

        {/* Master Headline: Cormorant Garamond + Italiana Serif */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.08]">
          The Art of <span className="italic font-normal gold-text-metallic">Haute Coiffure</span> <br />
          <span className="font-light tracking-tight text-white">& Imperial Radiance</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed mb-12 tracking-wide">
          An intimate sanctuary in the heart of Vijay Nagar. Where bespoke French balayage, cellular caviar scalp therapies, and royal bridal couture unite for Central India’s most discerning patrons.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <Link to="/book" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto shadow-gold-subtle"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Reserve An Experience
            </Button>
          </Link>
          <Link to="/services" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              The Couture Repertoire
            </Button>
          </Link>
        </div>

        {/* Elegant Four Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-gold-500/20 text-left">
          <div className="p-4 border-l border-gold-500/30">
            <span className="text-[10px] uppercase tracking-widest text-gold-muted block mb-1">
              HAUTE ATELIER
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-light text-white">14+</div>
            <p className="text-[10px] text-gray-400 mt-0.5 tracking-wider">Master Stylists & Colorists</p>
          </div>

          <div className="p-4 border-l border-gold-500/30">
            <span className="text-[10px] uppercase tracking-widest text-gold-muted block mb-1">
              CELEBRITY & BRIDAL
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-light text-white">600+</div>
            <p className="text-[10px] text-gray-400 mt-0.5 tracking-wider">Royal Brides Adorned</p>
          </div>

          <div className="p-4 border-l border-gold-500/30">
            <span className="text-[10px] uppercase tracking-widest text-gold-muted block mb-1">
              EXCLUSIVE FORMULAS
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-light text-white">100%</div>
            <p className="text-[10px] text-gray-400 mt-0.5 tracking-wider">Kérastase & Olaplex Paris</p>
          </div>

          <div className="p-4 border-l border-gold-500/30">
            <span className="text-[10px] uppercase tracking-widest text-gold-muted block mb-1">
              SANCTUARY STATUS
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-light text-white">VIP</div>
            <p className="text-[10px] text-gray-400 mt-0.5 tracking-wider">Private Suites & Valet</p>
          </div>
        </div>
      </div>
    </section>
  );
};
