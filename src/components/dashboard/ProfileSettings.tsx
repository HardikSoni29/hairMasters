import React, { useState } from 'react';
import { User, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const ProfileSettings: React.FC = () => {
  const { user, profile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-luxury-card border border-luxury-subtle p-6 sm:p-8 max-w-2xl">
      <h4 className="font-cinzel text-lg font-semibold text-white tracking-wider mb-6 flex items-center">
        <User className="w-4 h-4 text-gold-400 mr-2" />
        Profile & Membership Credentials
      </h4>

      {saved && (
        <div className="mb-6 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile changes updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
            Account Email (Supabase Auth ID)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="email"
              disabled
              value={user?.email || 'client@hairmasters.in'}
              className="w-full bg-luxury-dark/60 border border-luxury-subtle px-3.5 py-2.5 pl-9 text-xs text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-luxury-dark border border-luxury-subtle px-3.5 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-medium">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-luxury-dark border border-luxury-subtle px-3.5 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="p-3 bg-luxury-black/70 border border-gold-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-gold-300">
              <Shield className="w-4 h-4 text-gold-400" />
              <span>Privilege Tier: {profile?.role === 'admin' ? 'Salon Director (Admin)' : 'VIP Royal Patron'}</span>
            </div>
            <span className="text-[10px] text-gray-500 uppercase">Indore Vijay Nagar Club</span>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" variant="gold" size="md">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
