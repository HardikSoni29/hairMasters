import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Heart, Settings, LogOut, Plus, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Appointment, Service } from '../types';
import { getAppointments, getServices } from '../lib/supabase';
import { UserAppointments } from '../components/dashboard/UserAppointments';
import { FavoritesList } from '../components/dashboard/FavoritesList';
import { ProfileSettings } from '../components/dashboard/ProfileSettings';
import { Button } from '../components/common/Button';

export const DashboardPage: React.FC = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'appointments' | 'favorites' | 'settings'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [appRes, servRes] = await Promise.all([
        getAppointments(user?.id, false),
        getServices(),
      ]);
      setAppointments(appRes);
      setServices(servRes);
    } catch (e) {
      console.warn('Dashboard data load:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <div className="py-12 bg-luxury-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-luxury-dark border border-gold-500/30 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full border-2 border-gold-400 bg-luxury-card flex items-center justify-center text-gold-300 font-cinzel text-xl font-bold">
              {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'G'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {profile?.full_name || 'Valued Guest'}
                </h1>
                {isAdmin && (
                  <span className="text-[10px] px-2 py-0.5 bg-gold-500/20 text-gold-300 border border-gold-400 uppercase tracking-widest font-semibold">
                    Admin Director
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 block mt-1">
                {user?.email} • {profile?.phone || 'Indore Vijay Nagar Patron'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {isAdmin && (
              <Link to="/admin" className="flex-1 sm:flex-none">
                <Button variant="dark" size="sm" leftIcon={<Shield className="w-4 h-4 text-gold-400" />}>
                  Manager Suite
                </Button>
              </Link>
            )}

            <Link to="/book" className="flex-1 sm:flex-none">
              <Button variant="gold" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                New Ritual
              </Button>
            </Link>

            <button
              onClick={() => signOut()}
              className="p-2.5 text-gray-400 hover:text-rose-400 transition-colors border border-luxury-subtle hover:border-rose-500/40"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-luxury-subtle mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center space-x-2 py-3 px-6 text-xs uppercase tracking-wider font-medium border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'appointments'
                ? 'border-gold-400 text-gold-300 bg-luxury-dark/40 font-semibold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Appointments ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center space-x-2 py-3 px-6 text-xs uppercase tracking-wider font-medium border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'favorites'
                ? 'border-gold-400 text-gold-300 bg-luxury-dark/40 font-semibold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Rituals</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 py-3 px-6 text-xs uppercase tracking-wider font-medium border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'border-gold-400 text-gold-300 bg-luxury-dark/40 font-semibold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">Accessing Client Register...</span>
          </div>
        ) : (
          <div>
            {activeTab === 'appointments' && (
              <UserAppointments appointments={appointments} onRefresh={loadData} />
            )}
            {activeTab === 'favorites' && (
              <FavoritesList services={services} />
            )}
            {activeTab === 'settings' && (
              <ProfileSettings />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
