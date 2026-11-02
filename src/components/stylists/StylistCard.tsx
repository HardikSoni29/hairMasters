import React from 'react';
import { Star, Instagram, Calendar } from 'lucide-react';
import { Stylist } from '../../types';
import { Button } from '../common/Button';

interface StylistCardProps {
  stylist: Stylist;
  onSelect: (stylist: Stylist) => void;
}

export const StylistCard: React.FC<StylistCardProps> = ({ stylist, onSelect }) => {
  return (
    <div className="bg-noir-800 border border-noir-border hover:border-gold-500/40 transition-all duration-500 flex flex-col group overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-caviar">
        <img
          src={stylist.image_url}
          alt={stylist.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[35%] group-hover:grayscale-0 brightness-[0.9]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-800 via-transparent to-transparent opacity-95" />
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-noir-900/85 backdrop-blur-md px-2.5 py-1 border border-gold-500/30 flex items-center space-x-1.5">
          <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
          <span className="text-[11px] font-medium text-white">{stylist.rating}</span>
        </div>

        {/* Experience badge */}
        {stylist.experience_years && (
          <div className="absolute top-4 left-4 bg-noir-900/85 backdrop-blur-md px-2.5 py-1 border border-noir-border text-[9px] uppercase tracking-widest text-gold-muted">
            {stylist.experience_years} Years Haute Craft
          </div>
        )}
      </div>

      <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[9px] uppercase tracking-widest-xl text-gold-400 font-medium block mb-1.5">
            {stylist.role}
          </span>
          <h3 className="font-serif text-2xl font-normal text-white group-hover:text-gold-champagne transition-colors mb-3">
            {stylist.name}
          </h3>
          <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
            {stylist.bio}
          </p>

          {stylist.specialties && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[9px] uppercase tracking-widest text-gray-500 block font-light">
                Artistic Signatures
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stylist.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] uppercase tracking-wider px-2.5 py-1 bg-noir-900 text-gold-muted border border-noir-border"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-noir-border flex items-center justify-between">
          {stylist.instagram ? (
            <span className="text-[10px] text-gray-500 hover:text-gold-300 transition-colors flex items-center tracking-wider">
              <Instagram className="w-3 h-3 mr-1 text-gold-400" />
              {stylist.instagram}
            </span>
          ) : <span />}

          <Button
            variant="gold"
            size="sm"
            onClick={() => onSelect(stylist)}
            leftIcon={<Calendar className="w-3 h-3" />}
          >
            Reserve Artist
          </Button>
        </div>
      </div>
    </div>
  );
};
