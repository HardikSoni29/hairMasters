import React from 'react';
import { Clock, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';

export const StepService: React.FC = () => {
  const {
    bookingData,
    updateBookingData,
    services,
    nextStep,
    prevStep,
    totalPrice,
    totalDuration,
  } = useBooking();

  const categoryServices = services.filter((s) => s.category === bookingData.category);
  const addOnCandidates = services.filter((s) => s.id !== bookingData.serviceId);

  const handleSelectService = (id: string) => {
    updateBookingData({ serviceId: id });
  };

  const handleToggleAddOn = (id: string) => {
    const current = bookingData.addOnIds || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    updateBookingData({ addOnIds: updated });
  };

  return (
    <div className="space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest-2xl text-gold-muted font-medium block mb-2">
          Phase II of V
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Select <span className="italic font-normal gold-text-champagne">Primary Ritual & Add-Ons</span>
        </h3>
        <p className="text-xs text-gray-400 mt-2 font-light">
          Discipline: <span className="text-gold-champagne font-medium">{bookingData.category}</span>
        </p>
      </div>

      {/* Primary Rituals */}
      <div className="space-y-4">
        <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-medium mb-3">
          1. Mandatory Primary Ritual
        </h4>

        {categoryServices.map((service) => {
          const isSelected = bookingData.serviceId === service.id;
          return (
            <div
              key={service.id}
              onClick={() => handleSelectService(service.id)}
              className={`cursor-pointer p-6 border transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                isSelected
                  ? 'bg-noir-700 border-gold-400 ring-1 ring-gold-400/50 shadow-gold-subtle'
                  : 'bg-noir-800 border-noir-border hover:border-gold-500/40 hover:bg-noir-700/50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-5 h-5 rounded-full border border-gold-400/60 mt-1 flex items-center justify-center shrink-0">
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />}
                </div>
                <div>
                  <h5 className="font-serif text-xl font-normal text-white">
                    {service.name}
                  </h5>
                  <p className="text-xs text-gray-400 font-light mt-1 max-w-2xl leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2.5 text-[10px] text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center text-gold-300">
                      <Clock className="w-3 h-3 mr-1 text-gold-400" />
                      {service.duration_mins} Minutes
                    </span>
                    {service.suitable_for && (
                      <span className="hidden sm:inline text-gray-500">• {service.suitable_for}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right sm:shrink-0 pl-9 sm:pl-0">
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Investment</span>
                <span className="font-serif text-2xl font-light text-gold-300">
                  ₹ {Number(service.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Luxury Add-Ons */}
      {bookingData.serviceId && (
        <div className="space-y-4 pt-6 border-t border-noir-border">
          <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-medium mb-3">
            2. Recommended Atelier Add-Ons (Optional)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {addOnCandidates.slice(0, 4).map((addon) => {
              const isChecked = bookingData.addOnIds?.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => handleToggleAddOn(addon.id)}
                  className={`cursor-pointer p-4 border transition-all duration-300 flex items-center justify-between text-xs ${
                    isChecked
                      ? 'bg-gold-500/10 border-gold-400 text-white'
                      : 'bg-noir-800 border-noir-border hover:border-gold-500/30 text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                        isChecked ? 'border-gold-400 bg-gold-400 text-black' : 'border-noir-border'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="font-serif text-sm block font-normal">{addon.name}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">+{addon.duration_mins} mins</span>
                    </div>
                  </div>
                  <span className="font-serif text-base text-gold-300 ml-2">
                    +₹ {Number(addon.price).toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sticky Bottom Concierge Bar */}
      <div className="p-5 bg-noir-800 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-gray-400 block">
            Estimated Investment & Time
          </span>
          <div className="flex items-baseline space-x-3">
            <span className="font-serif text-3xl font-light text-gold-300">
              ₹ {totalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-400 tracking-wider">
              • ~{totalDuration} Minutes Total
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={prevStep} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Back
          </Button>
          <Button
            variant="gold"
            size="md"
            disabled={!bookingData.serviceId}
            onClick={nextStep}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Select Artist
          </Button>
        </div>
      </div>
    </div>
  );
};
