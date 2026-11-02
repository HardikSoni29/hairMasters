import React from 'react';
import { Navigate } from 'react-router-dom';
import { ShieldAlert, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, profile, loading, isAdmin, demoLogin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-luxury-card border border-gold-500/30 text-center">
        <Lock className="w-12 h-12 text-gold-400 mx-auto mb-4" />
        <h3 className="font-cinzel text-xl font-bold text-white mb-2">Exclusive Patron Sanctuary</h3>
        <p className="text-xs text-gray-400 mb-6 font-light">
          Please authenticate with your Hair Masters account or use 1-click demo access to enter this suite.
        </p>
        <div className="space-y-3">
          <Button
            variant="gold"
            size="md"
            className="w-full justify-center"
            onClick={() => demoLogin(requireAdmin ? 'admin' : 'client')}
          >
            {requireAdmin ? '1-Click Salon Director Demo' : '1-Click Client Demo'}
          </Button>
        </div>
      </div>
    );
  }

  // Role check
  if (requireAdmin && !isAdmin) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-luxury-card border border-rose-500/30 text-center">
        <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h3 className="font-cinzel text-xl font-bold text-white mb-2">Director Credentials Required</h3>
        <p className="text-xs text-gray-400 mb-6 font-light">
          This portal is reserved for Hair Masters Salon Directors and staff members.
        </p>
        <Button
          variant="gold"
          size="md"
          className="w-full justify-center"
          onClick={() => demoLogin('admin')}
        >
          Switch to Salon Director (Demo Admin)
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
