import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../../types';
import { ServiceCard } from '../services/ServiceCard';
import { ServiceDetailModal } from '../services/ServiceDetailModal';
import { useBooking } from '../../context/BookingContext';

interface FeaturedServicesProps {
  services: Service[];
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ services }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);
  const { selectServiceAndStart } = useBooking();
  const navigate = useNavigate();

  const categories = [
    'All',
    'Hair Styling',
    'Hair Spa & Treatments',
    'Skin & Facials',
    'Bridal & Makeup',
    'Groom Grooming',
    'Nail Art',
  ];

  const filteredServices = selectedCategory === 'All'
    ? services.slice(0, 6)
    : services.filter((s) => s.category === selectedCategory).slice(0, 6);

  const handleBook = (service: Service) => {
    selectServiceAndStart(service);
    navigate('/book');
  };

  return (
    <section className="py-28 bg-caviar relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[10px] tracking-widest-2xl uppercase text-gold-muted font-medium block mb-3">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
              Signature <span className="italic font-normal gold-text-champagne">Couture Rituals</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-gold-300 hover:text-gold-200 group transition-all"
          >
            <span>Explore Complete Repertoire</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Minimalist Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-noir-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-300 border-b-2 ${
                selectedCategory === cat
                  ? 'border-gold-400 text-gold-champagne font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpenModal={(s) => setActiveModalService(s)}
              onBookNow={handleBook}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        onBook={handleBook}
      />
    </section>
  );
};
