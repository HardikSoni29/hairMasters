import React from 'react';
import { Crown, Sparkles, ShieldCheck, HeartHandshake, Coffee, Gem, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExperienceHighlights: React.FC = () => {
  const highlights = [
    {
      num: 'I',
      icon: <Crown className="w-5 h-5 text-gold-400 stroke-[1.5]" />,
      title: 'Private Bridal & VIP Executive Suites',
      desc: 'Exclusive, discreet suites for pre-wedding celebrations, high-profile dignitaries, and private restorative appointments.',
    },
    {
      num: 'II',
      icon: <Gem className="w-5 h-5 text-gold-400 stroke-[1.5]" />,
      title: 'Global Haute Formulations',
      desc: 'Direct partnerships with Kérastase Paris, Olaplex Molecular, Dyson Supersonic Pro, and 24K pure dermal gold leaf.',
    },
    {
      num: 'III',
      icon: <Sparkles className="w-5 h-5 text-gold-400 stroke-[1.5]" />,
      title: 'Microscopic Scalp & Skin Derma-Scan',
      desc: 'High-definition biological diagnostic imaging prior to every session to formulate active treatments tailored to your exact profile.',
    },
    {
      num: 'IV',
      icon: <Coffee className="w-5 h-5 text-gold-400 stroke-[1.5]" />,
      title: 'Vintage Champagne & Single-Origin Lounge',
      desc: 'Indulge in complimentary chilled vintage champagne, roasted single-origin coffees, and artisanal pastries during your ritual.',
    },
    {
      num: 'V',
      icon: <ShieldCheck className="w-5 h-5 text-gold-400 stroke-[1.5]" />,
      title: 'Autoclave Hospital-Grade Sterilization',
      desc: 'Every scissor, cut-throat blade, and titanium tool undergoes dual-chamber autoclaving, vacuum-sealed until your service.',
    },
    {
      num: 'VI',
      icon: <HeartHandshake className="w-5 h-5 text-gold-400 stroke-[1.5]" />,
      title: 'Valet Concierge & Discrete Arrival',
      desc: 'Private valet parking on PU-4 scheme arrival with a personalized ritual concierge attending to every detail.',
    },
  ];

  return (
    <section className="py-28 bg-obsidian relative border-y border-noir-border">
      {/* Background radial shimmer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-widest-2xl uppercase text-gold-muted font-medium block mb-3">
            The Hair Masters Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
            Hallmarks of <span className="italic font-normal gold-text-champagne">Distinction</span>
          </h2>
          <div className="w-12 h-[1px] bg-gold-400/60 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.num}
              className="gilded-box bg-noir-800 p-8 border border-noir-border hover:border-gold-500/40 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-noir-border">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center bg-noir-900 group-hover:border-gold-400 transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-serif text-xs italic text-gold-400/80 tracking-widest">
                    {item.num}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-normal text-white group-hover:text-gold-200 transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-noir-border flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-muted group-hover:text-gold-300 transition-colors">
                <span>Indore Sanctuary Experience</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
