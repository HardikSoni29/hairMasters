import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { Service } from '../types';
import { getServices } from '../lib/supabase';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceDetailModal } from '../components/services/ServiceDetailModal';
import { useBooking } from '../context/BookingContext';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const { selectServiceAndStart } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const categories = [
    'All',
    'Hair Styling',
    'Hair Spa & Treatments',
    'Skin & Facials',
    'Bridal & Makeup',
    'Groom Grooming',
    'Nail Art',
  ];

  const filtered = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleBook = (service: Service) => {
    selectServiceAndStart(service);
    navigate('/book');
  };

  return (
    <div className="py-20 bg-caviar min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-widest-2xl uppercase text-gold-muted font-medium block mb-3">
            Haute Catalog & Pricing
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
            The Service <span className="italic font-normal gold-text-champagne">Repertoire</span>
          </h1>
          <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Every ritual is a harmonious synthesis of French botanical science, Italian scissor architecture, and imperial hospitality at Vijay Nagar, Indore.
          </p>
          <div className="w-12 h-[1px] bg-gold-400/60 mx-auto mt-6" />
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-noir-800 border border-noir-border p-5 sm:p-7 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 border-b-2 ${
                  selectedCategory === cat
                    ? 'border-gold-400 text-gold-champagne font-medium'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rituals or active elixir..."
              className="w-full bg-noir-900 border border-noir-border px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-light">Loading Repertoire...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center bg-noir-800 border border-noir-border p-8">
            <Sparkles className="w-8 h-8 text-gold-500/30 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-light text-white mb-2">No Rituals Match Your Search</h3>
            <p className="text-xs text-gray-400 font-light">Try modifying your query or select another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onOpenModal={(s) => setActiveModalService(s)}
                onBookNow={handleBook}
              />
            ))}
          </div>
        )}
      </div>

      <ServiceDetailModal
        service={activeModalService}
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        onBook={handleBook}
      />
    </div>
  );
};
