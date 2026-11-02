import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../../lib/mockData';
import { GalleryItem } from '../../types';
import { LightboxModal } from './LightboxModal';
import { useBooking } from '../../context/BookingContext';

export const GalleryGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const { setStep } = useBooking();
  const navigate = useNavigate();

  const categories = [
    'All',
    'Bridal',
    'Hair Transformations',
    'Men\'s Grooming',
    'Skin Radiance',
    'Nail Art',
  ];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const handleBookLook = (_item: GalleryItem) => {
    setStep(1);
    navigate('/book');
  };

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-3 scrollbar-none border-b border-noir-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-300 border-b-2 ${
              selectedFilter === cat
                ? 'border-gold-400 text-gold-champagne font-medium'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative cursor-pointer overflow-hidden bg-noir-800 border border-noir-border hover:border-gold-500/40 transition-all duration-500"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-caviar">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-85 contrast-[1.15] group-hover:brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Look Info Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="self-start text-[8px] uppercase tracking-widest px-2.5 py-1 bg-noir-900/85 backdrop-blur-md text-gold-300 border border-gold-500/30">
                  {item.category}
                </span>

                <div>
                  <h4 className="font-serif text-2xl font-light text-white group-hover:text-gold-champagne transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-gold-muted mt-1 font-light">
                    Artist: {item.stylistName}
                  </p>
                </div>
              </div>

              {/* Quick Eye View */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-noir-900/80 backdrop-blur-md border border-gold-500/40 flex items-center justify-center text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <LightboxModal
        item={activeItem}
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        onBookLook={handleBookLook}
      />
    </div>
  );
};
