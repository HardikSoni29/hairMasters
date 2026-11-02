import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingFormData, Service, Stylist, ServiceCategory } from '../types';
import { getServices, getStylists } from '../lib/supabase';

interface BookingContextType {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  bookingData: BookingFormData;
  updateBookingData: (fields: Partial<BookingFormData>) => void;
  services: Service[];
  stylists: Stylist[];
  loadingData: boolean;
  selectedService: Service | undefined;
  selectedStylist: Stylist | undefined;
  totalPrice: number;
  totalDuration: number;
  resetBooking: () => void;
  selectServiceAndStart: (service: Service) => void;
}

const initialBookingData: BookingFormData = {
  category: 'Hair Styling',
  serviceId: '',
  addOnIds: [],
  stylistId: 'any',
  date: '',
  timeSlot: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  notes: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingFormData>(initialBookingData);
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, stylistsRes] = await Promise.all([
          getServices(),
          getStylists(),
        ]);
        setServices(servicesRes);
        setStylists(stylistsRes);
      } catch (err) {
        console.error('Failed to load services/stylists for booking:', err);
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, []);

  const updateBookingData = (fields: Partial<BookingFormData>) => {
    setBookingData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetBooking = () => {
    setBookingData(initialBookingData);
    setStep(1);
  };

  const selectServiceAndStart = (service: Service) => {
    setBookingData((prev) => ({
      ...prev,
      category: service.category,
      serviceId: service.id,
      addOnIds: [],
    }));
    setStep(3); // jump directly to stylist selection
  };

  const selectedService = services.find((s) => s.id === bookingData.serviceId);
  const selectedStylist = stylists.find((st) => st.id === bookingData.stylistId);

  // Calculate pricing & duration
  const basePrice = selectedService ? Number(selectedService.price) : 0;
  const baseDuration = selectedService ? Number(selectedService.duration_mins) : 0;

  // Add-ons can be selected services in the same category or related items
  const addOns = services.filter((s) => bookingData.addOnIds.includes(s.id));
  const addOnsPrice = addOns.reduce((sum, item) => sum + Number(item.price), 0);
  const addOnsDuration = addOns.reduce((sum, item) => sum + Number(item.duration_mins), 0);

  const totalPrice = basePrice + addOnsPrice;
  const totalDuration = baseDuration + addOnsDuration;

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        prevStep,
        bookingData,
        updateBookingData,
        services,
        stylists,
        loadingData,
        selectedService,
        selectedStylist,
        totalPrice,
        totalDuration,
        resetBooking,
        selectServiceAndStart,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
