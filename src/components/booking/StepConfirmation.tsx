import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, User, ArrowLeft, ShieldCheck, Calendar, Clock, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { createAppointment } from '../../lib/supabase';
import { Button } from '../common/Button';

export const StepConfirmation: React.FC = () => {
  const {
    bookingData,
    selectedService,
    selectedStylist,
    totalPrice,
    totalDuration,
    prevStep,
    resetBooking,
    services,
  } = useBooking();

  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState(bookingData.clientName || profile?.full_name || '');
  const [clientEmail, setClientEmail] = useState(bookingData.clientEmail || user?.email || '');
  const [clientPhone, setClientPhone] = useState(bookingData.clientPhone || profile?.phone || '');
  const [notes, setNotes] = useState(bookingData.notes || '');

  const [loading, setLoading] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.full_name && !clientName) setClientName(profile.full_name);
    if (user?.email && !clientEmail) setClientEmail(user.email);
    if (profile?.phone && !clientPhone) setClientPhone(profile.phone);
  }, [profile, user]);

  const addOnServices = services.filter((s) => bookingData.addOnIds?.includes(s.id));

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      setErrorMessage('Please provide your name, email, and contact phone number.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const appointmentDateStr = `${bookingData.date}T12:00:00Z`;

      const newAppointment = await createAppointment({
        user_id: user?.id || 'demo-client-user-id-12345',
        service_id: bookingData.serviceId,
        stylist_id: bookingData.stylistId === 'any' ? null : bookingData.stylistId,
        appointment_date: appointmentDateStr,
        status: 'pending',
        notes: `Slot: ${bookingData.timeSlot} | Client: ${clientName} (${clientPhone}, ${clientEmail}) | Notes: ${notes}`,
      });

      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5E6CA', '#FFFFFF', '#ECC880'],
      });

      setConfirmedId(newAppointment.id);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (confirmedId) {
    return (
      <div className="max-w-2xl mx-auto bg-noir-800 border border-gold-500/40 p-8 sm:p-14 text-center shadow-luxury-elevation relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        <div className="w-16 h-16 border border-gold-400/80 bg-noir-900 flex items-center justify-center mx-auto mb-6 text-gold-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[10px] uppercase tracking-widest-2xl text-gold-muted font-medium block mb-2">
          Sanctuary Reservation Confirmed
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-white mb-4">
          We Await Your Presence
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed font-light max-w-lg mx-auto mb-10">
          Thank you, <strong className="text-white font-medium">{clientName}</strong>. Your luxury appointment at Hair Masters Luxury Salon (Indore Vijay Nagar) has been registered with our executive concierge.
        </p>

        {/* Embossed Luxury Folio */}
        <div className="bg-noir-900 border border-noir-border p-7 text-left mb-10 space-y-3.5">
          <div className="flex justify-between items-center pb-3.5 border-b border-noir-border text-xs">
            <span className="text-gray-400 uppercase tracking-widest text-[10px]">Reference Number</span>
            <span className="font-mono text-gold-300 font-semibold tracking-wider uppercase">{confirmedId.slice(0, 8)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Primary Ritual</span>
            <span className="text-white font-serif text-sm">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Master Artist</span>
            <span className="text-gold-200">{selectedStylist ? selectedStylist.name : 'Premier Available Expert'}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Arrival Schedule</span>
            <span className="text-white">{bookingData.date} at {bookingData.timeSlot}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Estimated Duration</span>
            <span className="text-gray-300">~{totalDuration} Minutes</span>
          </div>
          <div className="flex justify-between items-center pt-3.5 border-t border-noir-border text-sm">
            <span className="font-light text-white uppercase tracking-wider text-xs">Total Investment</span>
            <span className="font-serif text-2xl font-light text-gold-300">₹ {totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="gold"
            size="md"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto"
          >
            Access Client Portal
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => resetBooking()}
            className="w-full sm:w-auto"
          >
            Book Another Ritual
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest-2xl text-gold-muted font-medium block mb-2">
          Phase V of V
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Client Particulars & <span className="italic font-normal gold-text-champagne">Folio Summary</span>
        </h3>
        <p className="text-xs text-gray-400 mt-2 font-light">
          Please confirm your details for our Vijay Nagar concierge reception desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-noir-800 border border-noir-border p-7 sm:p-9">
          <h4 className="font-serif text-xl font-normal text-white mb-6 flex items-center">
            <User className="w-4 h-4 text-gold-400 mr-2" />
            Guest Credentials
          </h4>

          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleConfirmBooking} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Princess Radhika Holkar"
                className="w-full bg-noir-900 border border-noir-border px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+91 98260 12345"
                  className="w-full bg-noir-900 border border-noir-border px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full bg-noir-900 border border-noir-border px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                Personal Wishes & Occasion Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Sensitivities, destination wedding dates, or champagne espresso preferences..."
                className="w-full bg-noir-900 border border-noir-border p-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="pt-2 text-[10px] text-gray-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Complimentary cancellation or schedule adjustments up to 4 hours prior.</span>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-noir-border">
              <Button type="button" variant="ghost" size="sm" onClick={prevStep} leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Back
              </Button>
              <Button type="submit" variant="gold" size="lg" isLoading={loading}>
                Confirm Reservation
              </Button>
            </div>
          </form>
        </div>

        {/* Right Col: Folio Card */}
        <div className="bg-noir-900 border border-gold-500/30 p-7 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-lg font-normal text-gold-champagne tracking-wider pb-3.5 border-b border-noir-border mb-5">
              Ritual Folio
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Discipline</span>
                <span className="text-white font-medium">{bookingData.category}</span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Selected Treatment</span>
                <span className="text-white font-serif text-base">{selectedService?.name}</span>
                <span className="text-gold-300 font-serif text-lg block mt-0.5">
                  ₹ {Number(selectedService?.price || 0).toLocaleString('en-IN')}
                </span>
              </div>

              {addOnServices.length > 0 && (
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Enhancements</span>
                  <ul className="mt-1 space-y-1">
                    {addOnServices.map((addon) => (
                      <li key={addon.id} className="text-gray-300 flex justify-between text-[11px]">
                        <span>• {addon.name}</span>
                        <span className="text-gold-300">₹ {Number(addon.price).toLocaleString('en-IN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Master Artist</span>
                <span className="text-white font-serif">
                  {selectedStylist ? selectedStylist.name : 'Premier Available Expert'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-noir-border">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Date</span>
                  <span className="text-white font-medium">{bookingData.date}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block">Time Window</span>
                  <span className="text-white font-medium">{bookingData.timeSlot}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-noir-border mt-8">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Total Investment</span>
              <span className="font-serif text-3xl font-light text-gold-300">
                ₹ {totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 block text-right tracking-widest">
              Total Duration: ~{totalDuration} Mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
