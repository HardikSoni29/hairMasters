import React, { useState, useEffect } from 'react';
import { Shield, Plus, Database, RefreshCw, Calendar, Sparkles, Check, Copy } from 'lucide-react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminStatsCards } from '../components/admin/AdminStatsCards';
import { AdminAppointmentsTable } from '../components/admin/AdminAppointmentsTable';
import { ServiceManagerModal } from '../components/admin/ServiceManagerModal';
import { getAppointments, getServices, getStylists } from '../lib/supabase';
import { Appointment, Service, Stylist } from '../types';
import { Button } from '../components/common/Button';

export const AdminPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [appRes, servRes, styRes] = await Promise.all([
        getAppointments(undefined, true),
        getServices(),
        getStylists(),
      ]);
      setAppointments(appRes);
      setServices(servRes);
      setStylists(styRes);
    } catch (err) {
      console.error('Failed to load admin portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopySqlHint = () => {
    navigator.clipboard.writeText('-- Run supabase_schema.sql in your Supabase SQL Editor');
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="py-12 bg-luxury-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Director Bar */}
          <div className="bg-luxury-dark border border-gold-500/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-gold-400 bg-luxury-card flex items-center justify-center text-gold-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-semibold block">
                  Salon Director Console • Role-Based RLS Protected
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Hair Masters Concierge & Operations
                </h1>
                <span className="text-xs text-gray-400 block mt-0.5">
                  Indore Vijay Nagar Sanctuary Register
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="dark"
                size="sm"
                onClick={loadData}
                leftIcon={<RefreshCw className="w-3.5 h-3.5 text-gold-400" />}
              >
                Sync Data
              </Button>

              <Button
                variant="gold"
                size="sm"
                onClick={() => setIsAddServiceOpen(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Salon Ritual
              </Button>
            </div>
          </div>

          {/* Database & Supabase Live Status Card */}
          <div className="bg-luxury-card/70 border border-gold-500/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-gray-300">
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Connected to Supabase PostgreSQL: <strong className="text-white font-mono">szdytmelbhxsjalsmzva.supabase.co</strong>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] uppercase text-gold-400/90 tracking-wider">
                RLS Policies Active
              </span>
              <button
                onClick={handleCopySqlHint}
                className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-gold-300 flex items-center space-x-1"
              >
                {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSql ? 'Copied script tip' : 'SQL Schema Ready'}</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <AdminStatsCards
            appointments={appointments}
            services={services}
            stylists={stylists}
          />

          {/* Appointments Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinzel text-lg font-semibold text-white tracking-wider flex items-center">
                <Calendar className="w-4 h-4 text-gold-400 mr-2" />
                Live Appointment Register
              </h3>
              <span className="text-xs text-gray-400">
                {appointments.length} Total Bookings Recorded
              </span>
            </div>

            <AdminAppointmentsTable
              appointments={appointments}
              onRefresh={loadData}
            />
          </div>

          {/* Add / Edit Service Modal */}
          <ServiceManagerModal
            isOpen={isAddServiceOpen}
            onClose={() => setIsAddServiceOpen(false)}
            onServiceSaved={loadData}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};
