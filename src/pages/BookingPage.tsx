import React from 'react';
import { BookingWizard } from '../components/booking/BookingWizard';
import { Sparkles, ShieldCheck, MapPin } from 'lucide-react';

export const BookingPage: React.FC = () => {
  return (
    <div className="py-12 bg-luxury-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gold-400 mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>Vijay Nagar, Indore Sanctuary</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Reserve Your Ritual
          </h1>
          <p className="text-xs text-gray-400 font-light mt-2">
            Seamless multi-step reservation. Instant concierge confirmation stored in our register.
          </p>
        </div>

        <BookingWizard />
      </div>
    </div>
  );
};
