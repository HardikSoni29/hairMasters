import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Trash2 } from 'lucide-react';
import { Service } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';

interface FavoritesListProps {
  services: Service[];
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ services }) => {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { selectServiceAndStart } = useBooking();
  const navigate = useNavigate();

  const savedServices = services.filter((s) => favoriteIds.includes(s.id));

  const handleBook = (service: Service) => {
    selectServiceAndStart(service);
    navigate('/book');
  };

  if (savedServices.length === 0) {
    return (
      <div className="bg-luxury-card border border-luxury-subtle p-12 text-center">
        <Heart className="w-10 h-10 text-rose-500/30 mx-auto mb-3" />
        <h4 className="font-cinzel text-lg font-semibold text-white mb-2">No Saved Rituals</h4>
        <p className="text-xs text-gray-400 font-light max-w-sm mx-auto mb-6">
          You haven't bookmarked any services yet. Click the heart icon on any treatment to curate your wish list.
        </p>
        <Button variant="outline" size="sm" onClick={() => navigate('/services')}>
          Browse Services
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {savedServices.map((service) => (
        <div
          key={service.id}
          className="bg-luxury-card border border-luxury-subtle p-5 flex items-center justify-between gap-4 hover:border-gold-500/30 transition-all"
        >
          <div className="flex items-center space-x-4">
            <img
              src={service.image_url}
              alt={service.name}
              className="w-16 h-16 object-cover border border-gold-500/20 shrink-0"
            />
            <div>
              <span className="text-[10px] uppercase text-gold-400 font-medium block">
                {service.category}
              </span>
              <h5 className="font-cinzel text-sm font-semibold text-white line-clamp-1">
                {service.name}
              </h5>
              <span className="font-cinzel text-sm font-bold text-gold-300 block mt-1">
                ₹{Number(service.price).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(service.id)}
              className="p-2 text-gray-500 hover:text-rose-400 transition-colors"
              title="Remove from saved"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Button variant="gold" size="sm" onClick={() => handleBook(service)}>
              Book
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
