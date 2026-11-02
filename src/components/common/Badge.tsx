import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'champagne' | 'outline' | 'dark' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-gold-500/15 text-gold-300 border border-gold-500/30',
    champagne: 'bg-gold-champagne/15 text-gold-champagne border border-gold-champagne/30',
    outline: 'border border-gray-700 text-gray-300',
    dark: 'bg-luxury-card text-gray-400 border border-luxury-subtle',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
