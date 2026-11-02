import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-caviar text-gray-400 border-t border-noir-border relative pt-20 pb-12 overflow-hidden">
      {/* Subtle candlelit radial aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 border border-gold-500/50 flex items-center justify-center bg-noir-800">
                <span className="font-cinzel text-xs font-bold text-gold-300">HM</span>
              </div>
              <div>
                <span className="font-cinzel text-base font-semibold tracking-[0.25em] text-white block">
                  HAIR MASTERS
                </span>
                <span className="text-[8px] tracking-[0.4em] text-gold-400 font-sans block mt-0.5">
                  LUXURY SALON • INDORE
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-gray-400 font-light">
              Indore’s premier sanctuary for bespoke hair architecture, medical-grade skin luminescence, and royal bridal couture. Designed for connoisseurs of timeless grace.
            </p>

            <div className="pt-1 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-noir-border flex items-center justify-center text-gold-muted hover:border-gold-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-noir-border flex items-center justify-center text-gold-muted hover:border-gold-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Signature Services */}
          <div>
            <h4 className="font-serif text-sm font-normal uppercase tracking-widest text-gold-champagne mb-5 flex items-center">
              <span className="w-2 h-[1px] bg-gold-400 mr-2" /> Signature Repertoire
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <Link to="/services" className="hover:text-gold-200 transition-colors">
                  Bespoke French Balayage & Glossing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-200 transition-colors">
                  Kérastase Chronologiste Caviar Ritual
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-200 transition-colors">
                  24K Gold Imperial Radiance Facial
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-200 transition-colors">
                  The Maharani Haute Bridal Package
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-200 transition-colors">
                  Gentlemen's Royal Razor Shave
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-200 transition-colors">
                  Russian Gel Manicure & Champagne Spa
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="font-serif text-sm font-normal uppercase tracking-widest text-gold-champagne mb-5 flex items-center">
              <span className="w-2 h-[1px] bg-gold-400 mr-2" /> Indore Sanctuary
            </h4>
            <ul className="space-y-3.5 text-xs font-light">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plot No. 12, Scheme No. 54, PU-4 Commercial, Behind C21 Mall, Vijay Nagar, Indore 452010
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 731 405 8888 / +91 98260 99999</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>concierge@hairmasters-indore.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  Monday – Sunday: 10:00 AM – 09:30 PM
                  <span className="block text-[10px] text-gold-400/90 tracking-wider">Private Valet at Entrance</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Luxury Distinctions */}
          <div>
            <h4 className="font-serif text-sm font-normal uppercase tracking-widest text-gold-champagne mb-5 flex items-center">
              <span className="w-2 h-[1px] bg-gold-400 mr-2" /> Excellence
            </h4>
            <div className="bg-noir-800 p-5 border border-noir-border space-y-3">
              <span className="font-serif text-base text-gold-200 block">
                The Luxury Benchmark
              </span>
              <p className="text-[11px] leading-relaxed text-gray-400 font-light">
                Official certified partners for Kérastase Paris, Olaplex Molecular Bond Science, and Dyson Pro Stylist Lounge.
              </p>
              <div className="flex items-center space-x-2 text-[10px] text-gray-500 pt-2 border-t border-noir-border">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Hospital-Grade Dual Autoclave Sterility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-noir-border pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4 font-light">
          <p>© {new Date().getFullYear()} Hair Masters Luxury Salon (Indore Vijay Nagar). All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase">
            <Link to="/services" className="hover:text-gold-300">Repertoire</Link>
            <Link to="/stylists" className="hover:text-gold-300">Artists</Link>
            <Link to="/lookbook" className="hover:text-gold-300">Lookbook</Link>
            <Link to="/admin" className="hover:text-gold-300">Director Suite</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
