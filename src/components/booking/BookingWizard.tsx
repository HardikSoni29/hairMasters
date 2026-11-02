import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { StepCategory } from './StepCategory';
import { StepService } from './StepService';
import { StepStylist } from './StepStylist';
import { StepDateTime } from './StepDateTime';
import { StepConfirmation } from './StepConfirmation';

export const BookingWizard: React.FC = () => {
  const { step, setStep } = useBooking();

  const stepsList = [
    { num: 1, roman: 'I', label: 'Discipline' },
    { num: 2, roman: 'II', label: 'Haute Ritual' },
    { num: 3, roman: 'III', label: 'Master Artist' },
    { num: 4, roman: 'IV', label: 'Schedule' },
    { num: 5, roman: 'V', label: 'Concierge' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Editorial Roman Numeral Stepper */}
      <div className="mb-14">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto">
          {/* Subtle connecting golden wire */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-noir-border -z-0" />
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-[1px] bg-gold-400 transition-all duration-700 -z-0"
            style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
          />

          {stepsList.map((item) => {
            const isCompleted = step > item.num;
            const isCurrent = step === item.num;
            return (
              <div
                key={item.num}
                onClick={() => {
                  if (item.num <= step) setStep(item.num);
                }}
                className={`relative z-10 flex flex-col items-center cursor-pointer group select-none ${
                  item.num > step ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 flex items-center justify-center font-serif text-xs italic tracking-widest border transition-all duration-500 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black border-gold-300 font-bold shadow-gold-subtle scale-110'
                      : isCompleted
                      ? 'bg-noir-900 border-gold-400/80 text-gold-300'
                      : 'bg-noir-900 border-noir-border text-gray-500'
                  }`}
                >
                  {item.roman}
                </div>
                <span
                  className={`text-[9px] uppercase tracking-widest mt-2 hidden sm:block ${
                    isCurrent ? 'text-gold-champagne font-medium' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step View Content */}
      <div className="animate-in fade-in duration-500">
        {step === 1 && <StepCategory />}
        {step === 2 && <StepService />}
        {step === 3 && <StepStylist />}
        {step === 4 && <StepDateTime />}
        {step === 5 && <StepConfirmation />}
      </div>
    </div>
  );
};
