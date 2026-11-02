import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans tracking-[0.24em] uppercase text-[11px] font-medium transition-all duration-500 relative select-none disabled:opacity-40 disabled:cursor-not-allowed group';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[10px] tracking-[0.22em]',
    md: 'px-7 py-3.5 text-[11px] tracking-[0.24em]',
    lg: 'px-10 py-4 text-xs tracking-[0.28em] font-semibold',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#DFBE6E] via-[#D4AF37] to-[#B89225] text-black font-semibold shadow-gold-subtle hover:shadow-gold-glow hover:brightness-105 active:scale-[0.99] border border-gold-300/40',
    outline: 'border border-gold-500/50 text-gold-200 hover:text-black hover:bg-gold-500 hover:border-gold-500 backdrop-blur-md transition-all duration-500',
    ghost: 'text-gray-300 hover:text-gold-300 hover:bg-gold-500/5',
    dark: 'bg-noir-800 border border-noir-border text-gray-200 hover:border-gold-500/50 hover:bg-noir-700',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 mr-2.5 animate-spin text-current" />
      ) : leftIcon ? (
        <span className="mr-2.5 transition-transform duration-300 group-hover:-translate-x-0.5">{leftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">{rightIcon}</span>
      )}
    </button>
  );
};
