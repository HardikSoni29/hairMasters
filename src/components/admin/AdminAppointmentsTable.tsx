import React, { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, Check, Filter, Calendar, User, Phone } from 'lucide-react';
import { Appointment, AppointmentStatus } from '../../types';
import { updateAppointmentStatus } from '../../lib/supabase';
import { Badge } from '../common/Badge';

interface AdminAppointmentsTableProps {
  appointments: Appointment[];
  onRefresh: () => void;
}

export const AdminAppointmentsTable: React.FC<AdminAppointmentsTableProps> = ({
  appointments,
  onRefresh,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    setUpdatingId(id);
    try {
      await updateAppointmentStatus(id, newStatus);
      onRefresh();
    } catch (e) {
      console.error('Failed to update status', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = appointments.filter((app) => {
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    const clientInfo = (app.notes || '') + (app.profile?.full_name || '') + (app.service?.name || '');
    const matchesSearch = clientInfo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="gold">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="champagne">Pending</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="dark">Cancelled</Badge>;
      default:
        return <Badge variant="dark">{status}</Badge>;
    }
  };

  return (
    <div className="bg-luxury-card border border-luxury-subtle overflow-hidden">
      {/* Top Table Controls */}
      <div className="p-4 sm:p-6 border-b border-luxury-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, notes, service..."
            className="w-full bg-luxury-dark border border-luxury-subtle px-3 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-all ${
                filterStatus === st
                  ? 'bg-gold-500 text-black font-semibold'
                  : 'bg-luxury-dark text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-luxury-dark/90 text-[10px] uppercase tracking-widest text-gray-400 border-b border-luxury-subtle">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Ref & Status</th>
              <th className="py-3.5 px-4 font-semibold">Ritual / Service</th>
              <th className="py-3.5 px-4 font-semibold">Client Details</th>
              <th className="py-3.5 px-4 font-semibold">Artist</th>
              <th className="py-3.5 px-4 font-semibold">Date & Time</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-subtle">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500 text-xs">
                  No appointments match the selected criteria.
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app.id} className="hover:bg-luxury-hover/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      {getStatusBadge(app.status)}
                      <span className="block font-mono text-[10px] text-gray-500 uppercase">
                        {app.id.slice(0, 8)}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-medium text-white line-clamp-1">
                      {app.service?.name || 'Exclusive Ritual'}
                    </div>
                    {app.service?.price && (
                      <span className="font-cinzel text-gold-300 font-semibold block text-[11px] mt-0.5">
                        ₹{Number(app.service.price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 max-w-xs">
                    <div className="text-gray-200 font-medium">
                      {app.profile?.full_name || 'Client Guest'}
                    </div>
                    {app.notes && (
                      <p className="text-[11px] text-gray-400 truncate mt-0.5" title={app.notes}>
                        {app.notes}
                      </p>
                    )}
                  </td>

                  <td className="py-4 px-4 text-gold-200">
                    {app.stylist?.name || 'Any Expert'}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div>{new Date(app.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </td>

                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center space-x-1.5">
                      {app.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'confirmed')}
                          disabled={updatingId === app.id}
                          className="px-2 py-1 bg-emerald-950/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1"
                          title="Confirm Appointment"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                      )}

                      {app.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'completed')}
                          disabled={updatingId === app.id}
                          className="px-2 py-1 bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-black border border-gold-500/50 text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1"
                          title="Mark Completed"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Complete</span>
                        </button>
                      )}

                      {app.status !== 'cancelled' && app.status !== 'completed' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'cancelled')}
                          disabled={updatingId === app.id}
                          className="px-2 py-1 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 text-[10px] uppercase tracking-wider transition-colors"
                          title="Cancel"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
