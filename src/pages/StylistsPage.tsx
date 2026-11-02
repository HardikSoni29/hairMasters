import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Sparkles, Scissors, HeartHandshake } from 'lucide-react';
import { Stylist } from '../types';
import { getStylists } from '../lib/supabase';
import { StylistCard } from '../components/stylists/StylistCard';
import { useBooking } from '../context/BookingContext';

export const StylistsPage: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateBookingData, setStep } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStylists() {
      try {
        const data = await getStylists();
        setStylists(data);
      } finally {
        setLoading(false);
      }
    }
    loadStylists();
  }, []);

  const handleSelectStylist = (stylist: Stylist) => {
    updateBookingData({ stylistId: stylist.id });
    setStep(1); // will progress with stylist locked
    navigate('/book');
  };

  return (
    <div className="py-16 bg-luxury-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-2">
            The Creative Guild
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white tracking-tight">
            Our Master Stylists & Artists
          </h1>
          <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Internationally certified editorial artists, color alchemists, and aesthetic couturiers dedicated to bringing out your finest expression.
          </p>
          <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">Loading Creative Team...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylists.map((stylist) => (
              <StylistCard
                key={stylist.id}
                stylist={stylist}
                onSelect={handleSelectStylist}
              />
            ))}
          </div>
        )}

        {/* Philosophy Strip */}
        <div className="mt-20 p-8 sm:p-12 bg-luxury-dark border border-gold-500/20 text-center max-w-4xl mx-auto">
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-normal text-white mb-3">
            Continuous Haute Education
          </h3>
          <p className="text-xs text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Our stylists train semi-annually with global ambassadors from Paris, London, and Milan. From advanced balayage science to Japanese scalp ecology, we bring the frontiers of global beauty right here to Indore.
          </p>
        </div>
      </div>
    </div>
  );
};
