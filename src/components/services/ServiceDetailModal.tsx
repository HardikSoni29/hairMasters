import React from 'react';
import { X, Clock, CheckCircle2, Heart, Calendar } from 'lucide-react';
import { Service } from '../../types';
import { Button } from '../common/Button';
import { useFavorites } from '../../hooks/useFavorites';

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (service: Service) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onBook,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!isOpen || !service) return null;

  const favorited = isFavorite(service.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-noir-800 border border-gold-500/40 shadow-luxury-elevation overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top gold accent line */}
        <div className="h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 bg-noir-900/80 rounded-full border border-noir-border text-gray-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto">
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full bg-caviar">
            <img
              src={service.image_url}
              alt={service.name}
              className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-800 via-transparent to-transparent opacity-95" />
            <div className="absolute bottom-5 left-6 flex items-center space-x-3">
              <span className="px-3 py-1 bg-noir-900/85 backdrop-blur-md border border-gold-500/30 text-[9px] uppercase tracking-widest text-gold-300 font-medium">
                {service.category}
              </span>
              <div className="flex items-center text-[10px] uppercase tracking-widest text-gray-300 bg-noir-900/85 px-3 py-1 backdrop-blur-md border border-noir-border">
                <Clock className="w-3 h-3 text-gold-400 mr-1.5" />
                <span>{service.duration_mins} Minutes Duration</span>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-7 sm:p-9 space-y-7">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-3xl font-light text-white">
                  {service.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 block mt-1.5">
                  Hair Masters Signature Sanctuary Treatment • Indore
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 block">
                  Investment
                </span>
                <span className="font-serif text-3xl font-light text-gold-300">
                  ₹ {Number(service.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-medium mb-2.5">
                Ritual Philosophy
              </h4>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Suitable For */}
            {service.suitable_for && (
              <div className="bg-noir-900 p-4 border-l-2 border-gold-400 text-xs">
                <span className="font-medium text-gold-champagne block uppercase tracking-wider mb-1 text-[10px]">
                  Optimal Hair & Biological Condition:
                </span>
                <p className="text-gray-300 font-light">{service.suitable_for}</p>
              </div>
            )}

            {/* Inclusions */}
            {service.includes && service.includes.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-medium mb-3">
                  This Protocol Encompasses
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includes.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 text-xs text-gray-300 bg-noir-900 p-3 border border-noir-border"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="font-light">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 border-t border-noir-border flex items-center justify-between gap-4">
              <button
                onClick={() => toggleFavorite(service.id)}
                className={`flex items-center space-x-2 px-5 py-3 text-[10px] tracking-widest uppercase border transition-colors ${
                  favorited
                    ? 'border-rose-500/50 text-rose-300 bg-rose-950/40'
                    : 'border-noir-border text-gray-400 hover:text-white hover:border-gold-500/40'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-300' : ''}`} />
                <span>{favorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <Button
                variant="gold"
                size="md"
                onClick={() => {
                  onClose();
                  onBook(service);
                }}
                leftIcon={<Calendar className="w-3.5 h-3.5" />}
                className="flex-1 sm:flex-initial"
              >
                Reserve Ritual
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
