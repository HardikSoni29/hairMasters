import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, User as UserIcon, Shield, Sparkles, Phone, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sanctuary', path: '/' },
    { name: 'Couture Menu', path: '/services' },
    { name: 'Master Artists', path: '/stylists' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'Indore Salon', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700">
        {/* Top VIP Invitation Bar (Hides smoothly on scroll) */}
        <div
          className={`bg-caviar border-b border-noir-border text-center py-1.5 px-4 transition-all duration-500 overflow-hidden ${
            isScrolled ? 'h-0 opacity-0 py-0 border-none' : 'h-auto opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] tracking-widest-xl uppercase text-gold-muted font-light">
            <span className="hidden md:inline">Scheme No. 54, PU-4, Vijay Nagar, Indore</span>
            <span className="mx-auto md:mx-0 text-gold-300">
              Private Valet & VIP Bridal Suites • Concierge: +91 731 405 8888
            </span>
            <span className="hidden md:inline text-gold-400">10:00 AM — 09:30 PM Daily</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? 'bg-noir-900/95 backdrop-blur-xl border-b border-gold-500/20 py-3 shadow-luxury-elevation'
              : 'bg-gradient-to-b from-noir-900/90 via-noir-900/60 to-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Salon Brand Crest */}
              <Link to="/" className="flex items-center space-x-3.5 group">
                <div className="w-10 h-10 border border-gold-500/50 flex items-center justify-center bg-noir-800/90 group-hover:border-gold-300 transition-all duration-500 relative">
                  <div className="w-8 h-8 border border-gold-500/30 flex items-center justify-center">
                    <span className="font-cinzel text-xs font-bold text-gold-300 tracking-tighter">HM</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-cinzel text-base md:text-lg font-semibold tracking-[0.28em] text-white group-hover:text-gold-200 transition-colors uppercase leading-none">
                    HAIR MASTERS
                  </span>
                  <span className="text-[8px] tracking-[0.4em] text-gold-400 font-sans uppercase mt-1">
                    LUXURY SALON • VIJAY NAGAR
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-9">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[11px] uppercase tracking-[0.24em] font-light transition-all duration-300 relative py-1.5 ${
                      isActive(link.path)
                        ? 'text-gold-300 font-medium'
                        : 'text-gray-400 hover:text-gold-200'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-gold-400 transition-all" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="dark" size="sm" leftIcon={<Shield className="w-3.5 h-3.5 text-gold-400" />}>
                      Director Suite
                    </Button>
                  </Link>
                )}

                {user ? (
                  <Link to="/dashboard">
                    <button className="flex items-center space-x-2 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-300 hover:text-gold-300 border border-gold-500/30 bg-noir-800/80 transition-all">
                      <UserIcon className="w-3.5 h-3.5 text-gold-400" />
                      <span className="max-w-[110px] truncate">{profile?.full_name || 'My Portal'}</span>
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="text-[10px] uppercase tracking-[0.25em] text-gold-400 hover:text-gold-200 px-3 py-2 transition-colors flex items-center space-x-1"
                  >
                    <UserIcon className="w-3 h-3 mr-1 text-gold-400" />
                    Sign In
                  </button>
                )}

                <Link to="/book">
                  <Button variant="gold" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5" />}>
                    Reserve
                  </Button>
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <div className="flex md:hidden items-center space-x-2">
                <Link to="/book">
                  <Button variant="gold" size="sm" className="!px-3 !py-1.5 !text-[9px]">
                    Reserve
                  </Button>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gold-400 hover:text-gold-300 focus:outline-none"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-noir-900/98 border-b border-gold-500/20 px-6 py-6 space-y-4 shadow-luxury-elevation backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-3 border-b border-noir-border pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-xs uppercase tracking-[0.22em] ${
                    isActive(link.path) ? 'text-gold-300 font-semibold' : 'text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gold-500/40" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs tracking-widest uppercase text-gold-300 py-2 border border-gold-500/30 px-3 bg-noir-800"
                >
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-gold-400" /> Director Console
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}

              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xs tracking-widest uppercase text-gold-300 py-2"
                  >
                    <span className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2 text-gold-400" /> {profile?.full_name}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-xs uppercase tracking-widest text-rose-400 py-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Client Sign In
                </Button>
              )}

              <div className="pt-2 text-[10px] text-gray-400 flex items-center justify-center space-x-2 tracking-widest">
                <Phone className="w-3 h-3 text-gold-400" />
                <span>Concierge: +91 731 405 8888</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
