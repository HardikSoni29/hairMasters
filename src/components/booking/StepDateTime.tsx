import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft, Sun, Sunset, Moon } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';

export const StepDateTime: React.FC = () => {
  const { bookingData, updateBookingData, nextStep, prevStep } = useBooking();

  const availableDates = Array.from({ length: 14 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index);
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: index === 0,
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(
    bookingData.date || availableDates[0].dateString
  );
  const [selectedSlot, setSelectedSlot] = useState<string>(bookingData.timeSlot || '');

  const morningSlots = ['10:30 AM', '11:15 AM', '12:00 PM', '12:45 PM'];
  const afternoonSlots = ['02:00 PM', '03:00 PM', '03:45 PM', '04:30 PM'];
  const eveningSlots = ['05:30 PM', '06:15 PM', '07:00 PM', '07:45 PM'];

  const isSlotBooked = (slot: string) => {
    if (selectedDate === availableDates[0].dateString && (slot === '11:15 AM' || slot === '03:00 PM')) {
      return true;
    }
    return false;
  };

  const handleProceed = () => {
    updateBookingData({ date: selectedDate, timeSlot: selectedSlot });
    nextStep();
  };

  return (
    <div className="space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest-2xl text-gold-muted font-medium block mb-2">
          Phase IV of V
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Reserve <span className="italic font-normal gold-text-champagne">Date & Sacred Time</span>
        </h3>
        <p className="text-xs text-gray-400 mt-2 font-light">
          Salon hours: 10:00 AM – 09:30 PM daily. Scheme No. 54, Vijay Nagar, Indore.
        </p>
      </div>

      {/* Date Carousel */}
      <div>
        <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-medium mb-3 flex items-center">
          <CalendarIcon className="w-3.5 h-3.5 text-gold-400 mr-2" />
          1. Select Calendar Date
        </h4>

        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-thin">
          {availableDates.map((item) => {
            const isSelected = selectedDate === item.dateString;
            return (
              <button
                key={item.dateString}
                type="button"
                onClick={() => setSelectedDate(item.dateString)}
                className={`flex-shrink-0 w-20 py-4 px-2 border text-center transition-all duration-500 ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black border-gold-300 font-semibold shadow-gold-subtle scale-105'
                    : 'bg-noir-800 text-gray-300 border-noir-border hover:border-gold-500/40 hover:bg-noir-700'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider block opacity-75">
                  {item.isToday ? 'Today' : item.dayName}
                </span>
                <span className="font-serif text-2xl font-normal block my-1">
                  {item.dayNumber}
                </span>
                <span className="text-[9px] uppercase tracking-wider block opacity-75">
                  {item.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-6 pt-4 border-t border-noir-border">
        <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-medium mb-3 flex items-center">
          <Clock className="w-3.5 h-3.5 text-gold-400 mr-2" />
          2. Select Exclusive Arrival Window
        </h4>

        {/* Morning */}
        <div className="bg-noir-800 p-5 border border-noir-border">
          <div className="flex items-center space-x-2 text-xs font-light text-gold-300 uppercase tracking-widest mb-3.5">
            <Sun className="w-3.5 h-3.5 text-gold-400" />
            <span>Morning Serenity (10:00 AM – 01:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {morningSlots.map((slot) => {
              const booked = isSlotBooked(slot);
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-3 text-xs tracking-widest transition-all border ${
                    booked
                      ? 'opacity-30 line-through cursor-not-allowed border-noir-border bg-caviar text-gray-600'
                      : isSelected
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black font-semibold border-gold-300 shadow-gold-subtle'
                      : 'bg-noir-900 text-gray-300 border-noir-border hover:border-gold-500/40 hover:text-white'
                  }`}
                >
                  {slot} {booked && '(Full)'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Afternoon */}
        <div className="bg-noir-800 p-5 border border-noir-border">
          <div className="flex items-center space-x-2 text-xs font-light text-gold-300 uppercase tracking-widest mb-3.5">
            <Sunset className="w-3.5 h-3.5 text-gold-400" />
            <span>Afternoon Indulgence (01:00 PM – 05:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {afternoonSlots.map((slot) => {
              const booked = isSlotBooked(slot);
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-3 text-xs tracking-widest transition-all border ${
                    booked
                      ? 'opacity-30 line-through cursor-not-allowed border-noir-border bg-caviar text-gray-600'
                      : isSelected
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black font-semibold border-gold-300 shadow-gold-subtle'
                      : 'bg-noir-900 text-gray-300 border-noir-border hover:border-gold-500/40 hover:text-white'
                  }`}
                >
                  {slot} {booked && '(Full)'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening */}
        <div className="bg-noir-800 p-5 border border-noir-border">
          <div className="flex items-center space-x-2 text-xs font-light text-gold-300 uppercase tracking-widest mb-3.5">
            <Moon className="w-3.5 h-3.5 text-gold-400" />
            <span>Twilight Radiance (05:00 PM – 08:30 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {eveningSlots.map((slot) => {
              const booked = isSlotBooked(slot);
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-3 text-xs tracking-widest transition-all border ${
                    booked
                      ? 'opacity-30 line-through cursor-not-allowed border-noir-border bg-caviar text-gray-600'
                      : isSelected
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black font-semibold border-gold-300 shadow-gold-subtle'
                      : 'bg-noir-900 text-gray-300 border-noir-border hover:border-gold-500/40 hover:text-white'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Slot Banner */}
      {selectedSlot && (
        <div className="p-4 bg-gold-500/10 border border-gold-500/30 text-center">
          <span className="text-xs text-gold-200 tracking-wider font-light">
            Selected Schedule: <strong className="text-white font-serif text-sm">{selectedDate}</strong> at{' '}
            <strong className="text-white font-serif text-sm">{selectedSlot}</strong>
          </span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-noir-border">
        <Button variant="ghost" size="sm" onClick={prevStep} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
          Back
        </Button>
        <Button
          variant="gold"
          size="md"
          disabled={!selectedSlot}
          onClick={handleProceed}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Review & Client Particulars
        </Button>
      </div>
    </div>
  );
};
