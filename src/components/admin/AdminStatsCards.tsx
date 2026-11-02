import React from 'react';
import { Calendar, DollarSign, Clock, Users, Sparkles, TrendingUp } from 'lucide-react';
import { Appointment, Service, Stylist } from '../../types';

interface AdminStatsCardsProps {
  appointments: Appointment[];
  services: Service[];
  stylists: Stylist[];
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({
  appointments,
  services,
  stylists,
}) => {
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;

  // Approximate revenue calculation
  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + (Number(a.service?.price) || 2500), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Booked Revenue */}
      <div className="bg-luxury-card p-5 border border-luxury-subtle border-l-2 border-l-gold-400">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-[10px] uppercase tracking-wider font-medium">Pipeline Revenue</span>
          <TrendingUp className="w-4 h-4 text-gold-400" />
        </div>
        <div className="font-cinzel text-2xl font-bold text-white">
          ₹{totalRevenue.toLocaleString('en-IN')}
        </div>
        <span className="text-[11px] text-gold-300/80 mt-1 block">Active Salon Bookings</span>
      </div>

      {/* Pending Appointments */}
      <div className="bg-luxury-card p-5 border border-luxury-subtle border-l-2 border-l-amber-400">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-[10px] uppercase tracking-wider font-medium">Pending Review</span>
          <Clock className="w-4 h-4 text-amber-400" />
        </div>
        <div className="font-cinzel text-2xl font-bold text-amber-300">
          {pendingCount}
        </div>
        <span className="text-[11px] text-gray-400 mt-1 block">Requires Concierge Approval</span>
      </div>

      {/* Confirmed Appointments */}
      <div className="bg-luxury-card p-5 border border-luxury-subtle border-l-2 border-l-emerald-400">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-[10px] uppercase tracking-wider font-medium">Confirmed Rituals</span>
          <Calendar className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="font-cinzel text-2xl font-bold text-emerald-300">
          {confirmedCount}
        </div>
        <span className="text-[11px] text-gray-400 mt-1 block">Scheduled on Calendar</span>
      </div>

      {/* Active Specialists */}
      <div className="bg-luxury-card p-5 border border-luxury-subtle border-l-2 border-l-gold-500">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-[10px] uppercase tracking-wider font-medium">Master Stylists</span>
          <Users className="w-4 h-4 text-gold-400" />
        </div>
        <div className="font-cinzel text-2xl font-bold text-white">
          {stylists.length}
        </div>
        <span className="text-[11px] text-gray-400 mt-1 block">{services.length} Menu Rituals Active</span>
      </div>
    </div>
  );
};
