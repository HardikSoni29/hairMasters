import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, demoLogin } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (tab === 'login') {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Welcome back to Hair Masters.');
        setTimeout(() => onClose(), 600);
      }
    } else {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name');
        setLoading(false);
        return;
      }
      const { error } = await signUpWithEmail(email, password, fullName, phone);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Profile registered successfully! You may now sign in.');
        setTimeout(() => setTab('login'), 1200);
      }
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setErrorMsg(error.message);
    }
  };

  const handleDemo = (role: 'client' | 'admin') => {
    demoLogin(role);
    setSuccessMsg(`Welcome, ${role === 'admin' ? 'Salon Director (Admin)' : 'Valued Client'}`);
    setTimeout(() => onClose(), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-noir-800 border border-gold-500/40 shadow-luxury-elevation p-7 sm:p-9 overflow-hidden">
        {/* Gold top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 border border-gold-500/50 flex items-center justify-center mx-auto mb-3 bg-noir-900">
            <span className="font-cinzel text-xs font-bold text-gold-300">HM</span>
          </div>
          <h3 className="font-serif text-2xl font-normal text-white">
            Client Sanctuary Portal
          </h3>
          <p className="text-[10px] tracking-widest uppercase text-gold-muted font-light mt-1">
            Indore Vijay Nagar Atelier
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-6 p-3 bg-noir-900 border border-noir-border text-center">
          <span className="text-[9px] uppercase tracking-widest text-gold-muted block mb-2 font-medium">
            ⚡ 1-Click Evaluation Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemo('client')}
              className="px-2.5 py-1.5 text-[9px] tracking-widest uppercase bg-noir-800 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 transition-colors flex items-center justify-center space-x-1"
            >
              <User className="w-3 h-3 text-gold-400" />
              <span>Client Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemo('admin')}
              className="px-2.5 py-1.5 text-[9px] tracking-widest uppercase bg-noir-800 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 transition-colors flex items-center justify-center space-x-1"
            >
              <Shield className="w-3 h-3 text-gold-400" />
              <span>Salon Director</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-noir-border mb-6">
          <button
            onClick={() => { setTab('login'); setErrorMsg(null); }}
            className={`flex-1 pb-3 text-[11px] tracking-widest uppercase font-light transition-colors text-center ${
              tab === 'login'
                ? 'text-gold-300 border-b border-gold-400 font-medium'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setErrorMsg(null); }}
            className={`flex-1 pb-3 text-[11px] tracking-widest uppercase font-light transition-colors text-center ${
              tab === 'signup'
                ? 'text-gold-300 border-b border-gold-400 font-medium'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Register Profile
          </button>
        </div>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika Holkar"
                    className="w-full bg-noir-900 border border-noir-border px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98260 00000"
                    className="w-full bg-noir-900 border border-noir-border px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="w-full bg-noir-900 border border-noir-border px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-noir-900 border border-noir-border px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="md"
            isLoading={loading}
            className="w-full justify-center mt-2"
          >
            {tab === 'login' ? 'Authenticate' : 'Create Exclusive Profile'}
          </Button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-noir-border"></div>
            <span className="flex-shrink mx-3 text-[9px] uppercase tracking-widest text-gray-500 font-light">
              Or proceed with
            </span>
            <div className="flex-grow border-t border-noir-border"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-2.5 px-4 bg-noir-900 hover:bg-noir-700 border border-noir-border hover:border-gold-500/40 text-xs text-gray-300 tracking-wider flex items-center justify-center space-x-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-[11px] tracking-widest uppercase">Google Identity</span>
          </button>
        </form>
      </div>
    </div>
  );
};
