import React from 'react';
import { Heart, Clock, ArrowRight, Eye } from 'lucide-react';
import { Service } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { Button } from '../common/Button';

interface ServiceCardProps {
  service: Service;
  onOpenModal: (service: Service) => void;
  onBookNow: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onOpenModal,
  onBookNow,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(service.id);

  return (
    <div className="bg-noir-800 border border-noir-border hover:border-gold-500/40 transition-all duration-500 flex flex-col group overflow-hidden relative">
      {/* Top delicate gold hairline indicator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Editorial Image container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-caviar">
        <img
          src={service.image_url}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.85] contrast-[1.1]"
          loading="lazy"
        />
        {/* Cinematic gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-800 via-transparent to-transparent opacity-90" />

        {/* Category Tag */}
        <div className="absolute top-3.5 left-3.5">
          <span className="px-2.5 py-1 bg-noir-900/85 backdrop-blur-md border border-gold-500/30 text-[9px] uppercase tracking-widest text-gold-300 font-medium">
            {service.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(service.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2 backdrop-blur-md border transition-all ${
            favorited
              ? 'bg-rose-950/60 border-rose-500/60 text-rose-300'
              : 'bg-noir-900/70 border-white/10 text-gray-400 hover:text-white hover:border-gold-400/40'
          }`}
          aria-label={favorited ? 'Remove from saved' : 'Save to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-300' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onOpenModal(service)}
          className="absolute bottom-3 right-3 px-3 py-1 bg-noir-900/90 hover:bg-gold-500 hover:text-black text-gray-300 border border-gold-500/30 text-[9px] uppercase tracking-widest flex items-center space-x-1 backdrop-blur-md transition-all duration-300"
        >
          <Eye className="w-3 h-3" />
          <span>Overview</span>
        </button>
      </div>

      {/* Body content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gold-muted mb-2">
            <Clock className="w-3 h-3 text-gold-400" />
            <span>{service.duration_mins} Minutes Duration</span>
          </div>

          <h3
            onClick={() => onOpenModal(service)}
            className="font-serif text-xl font-normal text-white group-hover:text-gold-champagne transition-colors line-clamp-1 cursor-pointer mb-2"
          >
            {service.name}
          </h3>

          <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-noir-border flex items-baseline justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gray-500 block">
              Investment
            </span>
            <span className="font-serif text-2xl font-light text-gold-300">
              ₹ {Number(service.price).toLocaleString('en-IN')}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onBookNow(service)}
            rightIcon={<ArrowRight className="w-3 h-3" />}
          >
            Reserve
          </Button>
        </div>
      </div>
    </div>
  );
};
