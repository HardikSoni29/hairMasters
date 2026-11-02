import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../../types';
import { useBooking } from '../../context/BookingContext';

interface CategoryOption {
  id: ServiceCategory;
  num: string;
  name: string;
  tagline: string;
  imageUrl: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'Hair Styling',
    num: 'I',
    name: 'Haute Coiffure & Styling',
    tagline: 'Runway precision sculpture, French balayage, and diamond smoothing therapies',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'Hair Spa & Treatments',
    num: 'II',
    name: 'Scalp Ecology & Caviar Rituals',
    tagline: 'Kérastase Chronologiste caviar immersion and Olaplex bond repair',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'Skin & Facials',
    num: 'III',
    name: 'Clinical Skin & 24K Radiance',
    tagline: 'Pure 24K dermal gold foil, HydraFacial Elite MD, and micro-current lifts',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'Bridal & Makeup',
    num: 'IV',
    name: 'Royal Bridal & Red Carpet Couturier',
    tagline: 'The Maharani royal suites, HD airbrush beauty, and heritage veil drapery',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'Groom Grooming',
    num: 'V',
    name: 'Gentlemen’s Royal Shave & Grooming',
    tagline: 'Ozone steam straight-razor detailing, beard sculpture, and executive styling',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'Nail Art',
    num: 'VI',
    name: 'Russian Gel & Champagne Pedicure Spa',
    tagline: 'Dry e-file diamond bit cuticle refinement, mirror chrome, and rose milk foot baths',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80',
  },
];

export const StepCategory: React.FC = () => {
  const { bookingData, updateBookingData, nextStep } = useBooking();

  const handleSelect = (category: ServiceCategory) => {
    updateBookingData({ category, serviceId: '', addOnIds: [] });
    nextStep();
  };

  return (
    <div className="space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest-2xl text-gold-muted font-medium block mb-2">
          Phase I of V
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Select <span className="italic font-normal gold-text-champagne">Sanctuary Discipline</span>
        </h3>
        <p className="text-xs text-gray-400 mt-2 font-light">
          Choose your desired department at our Vijay Nagar, Indore salon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => {
          const isSelected = bookingData.category === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`cursor-pointer group relative overflow-hidden bg-noir-800 border transition-all duration-500 p-6 flex flex-col justify-between ${
                isSelected
                  ? 'border-gold-400 bg-noir-700 shadow-gold-subtle ring-1 ring-gold-400/50'
                  : 'border-noir-border hover:border-gold-500/40 hover:bg-noir-700/60'
              }`}
            >
              {/* Image Preview with Roman Numeral */}
              <div className="relative h-44 w-full mb-5 overflow-hidden bg-caviar">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-80 contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-800 via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-noir-900/85 backdrop-blur-md border border-gold-500/30 text-[10px] font-serif italic text-gold-300">
                  {cat.num}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-normal text-white group-hover:text-gold-champagne transition-colors mb-2">
                  {cat.name}
                </h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                  {cat.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-noir-border flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-muted group-hover:text-gold-200 transition-colors">
                <span>View Rituals</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
