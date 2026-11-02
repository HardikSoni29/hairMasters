import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Stylist } from '../../types';
import { StylistCard } from '../stylists/StylistCard';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

interface StylistPreviewProps {
  stylists: Stylist[];
}

export const StylistPreview: React.FC<StylistPreviewProps> = ({ stylists }) => {
  const { updateBookingData, setStep } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (stylist: Stylist) => {
    updateBookingData({ stylistId: stylist.id });
    setStep(1);
    navigate('/book');
  };

  return (
    <section className="py-28 bg-obsidian border-t border-noir-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[10px] tracking-widest-2xl uppercase text-gold-muted font-medium block mb-3">
              The Creative Guild
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
              Master <span className="italic font-normal gold-text-champagne">Artists & Couturiers</span>
            </h2>
          </div>
          <Link
            to="/stylists"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-gold-300 hover:text-gold-200 group transition-all"
          >
            <span>View Full Atelier Guild</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylists.slice(0, 3).map((stylist) => (
            <StylistCard
              key={stylist.id}
              stylist={stylist}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
