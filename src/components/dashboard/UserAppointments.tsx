import React, { useState } from 'react';
import { Calendar, Clock, User, XCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Appointment, AppointmentStatus } from '../../types';
import { updateAppointmentStatus } from '../../lib/supabase';
import { Badge } from '../common/Badge';

interface UserAppointmentsProps {
  appointments: Appointment[];
  onRefresh: () => void;
}

export const UserAppointments: React.FC<UserAppointmentsProps> = ({ appointments, onRefresh }) => {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you wish to cancel this luxury appointment?')) return;
    setCancellingId(id);
    try {
      await updateAppointmentStatus(id, 'cancelled');
      setMessage('Your appointment has been cancelled successfully.');
      onRefresh();
    } catch {
      setMessage('Failed to update status. Please try again or call concierge.');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="gold">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="champagne">Under Review</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="dark">Cancelled</Badge>;
      default:
        return <Badge variant="dark">{status}</Badge>;
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-luxury-card border border-luxury-subtle p-12 text-center">
        <Calendar className="w-10 h-10 text-gold-500/40 mx-auto mb-3" />
        <h4 className="font-cinzel text-lg font-semibold text-white mb-2">No Rituals Scheduled Yet</h4>
        <p className="text-xs text-gray-400 font-light max-w-sm mx-auto">
          You haven't reserved an appointment yet. Explore our bespoke service menu to book your salon experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {message && (
        <div className="p-3 bg-luxury-dark border border-gold-500/40 text-gold-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {appointments.map((item) => {
          const serviceName = item.service?.name || 'Exclusive Salon Ritual';
          const stylistName = item.stylist?.name || 'Any Available Master';
          const isUpcoming = item.status === 'pending' || item.status === 'confirmed';

          return (
            <div
              key={item.id}
              className="bg-luxury-card border border-luxury-subtle p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gold-500/30 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  {getStatusBadge(item.status)}
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    REF: {item.id.slice(0, 8)}
                  </span>
                </div>

                <h4 className="font-cinzel text-lg font-semibold text-white">
                  {serviceName}
                </h4>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
                  <div className="flex items-center text-gold-300">
                    <User className="w-3.5 h-3.5 mr-1 text-gold-400" />
                    <span>Artist: {stylistName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-gold-400" />
                    <span>{new Date(item.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  {item.notes && (
                    <div className="text-gray-400 text-[11px] truncate max-w-xs">
                      {item.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-luxury-subtle">
                {item.service?.price && (
                  <span className="font-cinzel text-lg font-bold text-gold-300">
                    ₹{Number(item.service.price).toLocaleString('en-IN')}
                  </span>
                )}

                {isUpcoming && (
                  <button
                    onClick={() => handleCancel(item.id)}
                    disabled={cancellingId === item.id}
                    className="text-xs uppercase tracking-wider text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{cancellingId === item.id ? 'Cancelling...' : 'Cancel Reservation'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
