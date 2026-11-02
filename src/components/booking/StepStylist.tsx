import React from 'react';
import { Star, Sparkles, UserCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';

export const StepStylist: React.FC = () => {
  const { bookingData, updateBookingData, stylists, nextStep, prevStep } = useBooking();

  const handleSelectStylist = (id: string | 'any') => {
    updateBookingData({ stylistId: id });
  };

  return (
    <div className="space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest-2xl text-gold-muted font-medium block mb-2">
          Phase III of V
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Choose Your <span className="italic font-normal gold-text-champagne">Master Artist</span>
        </h3>
        <p className="text-xs text-gray-400 mt-2 font-light">
          Entrust your hair or skin to a dedicated specialist or select our premier available talent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Any Available Expert Option */}
        <div
          onClick={() => handleSelectStylist('any')}
          className={`cursor-pointer p-7 border transition-all duration-500 flex flex-col justify-between ${
            bookingData.stylistId === 'any'
              ? 'bg-noir-700 border-gold-400 ring-1 ring-gold-400/50 shadow-gold-subtle'
              : 'bg-noir-800 border-noir-border hover:border-gold-500/40 hover:bg-noir-700/50'
          }`}
        >
          <div>
            <div className="w-12 h-12 border border-gold-400/60 bg-noir-900 flex items-center justify-center mb-6 text-gold-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-2xl font-normal text-white mb-1">
              Any Available Master Expert
            </h4>
            <span className="text-[9px] text-gold-400 uppercase tracking-widest block mb-4 font-medium">
              Maximum Schedule Flexibility
            </span>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Our salon director will match you with the highest-rated available specialist on your preferred date and time.
            </p>
          </div>

          <div className="pt-6 border-t border-noir-border mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-300">
            <span>Instant Slot Allocation</span>
            <UserCheck className="w-4 h-4 text-gold-400" />
          </div>
        </div>

        {/* Individual Stylists */}
        {stylists.map((stylist) => {
          const isSelected = bookingData.stylistId === stylist.id;
          return (
            <div
              key={stylist.id}
              onClick={() => handleSelectStylist(stylist.id)}
              className={`cursor-pointer border transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-noir-700 border-gold-400 ring-1 ring-gold-400/50 shadow-gold-subtle'
                  : 'bg-noir-800 border-noir-border hover:border-gold-500/40 hover:bg-noir-700/50'
              }`}
            >
              <div className="relative aspect-[16/11] w-full bg-caviar overflow-hidden">
                <img
                  src={stylist.image_url}
                  alt={stylist.name}
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-800 via-transparent to-transparent opacity-90" />
                <div className="absolute top-3 right-3 bg-noir-900/85 backdrop-blur-md px-2.5 py-0.5 border border-gold-500/30 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                  <span className="text-[10px] font-medium text-white">{stylist.rating}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gold-400 block mb-1">
                    {stylist.role}
                  </span>
                  <h4 className="font-serif text-xl font-normal text-white mb-2">
                    {stylist.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                    {stylist.bio}
                  </p>
                </div>

                {stylist.specialties && stylist.specialties.length > 0 && (
                  <div className="pt-4 border-t border-noir-border flex flex-wrap gap-1">
                    {stylist.specialties.slice(0, 2).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-noir-900 text-gold-muted border border-noir-border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-noir-border">
        <Button variant="ghost" size="sm" onClick={prevStep} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
          Back
        </Button>
        <Button
          variant="gold"
          size="md"
          disabled={!bookingData.stylistId}
          onClick={nextStep}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Select Schedule
        </Button>
      </div>
    </div>
  );
};
