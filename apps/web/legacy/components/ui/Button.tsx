import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-dark shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    outline: "border border-[var(--border-color)] text-[var(--text-primary)] hover:border-accent hover:text-accent",
    soft: "bg-[var(--text-primary)]/5 border border-[var(--border-color)] text-[var(--text-primary)]/90 hover:bg-[var(--text-primary)]/10 hover:border-accent/40 hover:text-[var(--text-primary)]",
    ghost: "text-[var(--text-primary)]/70 hover:text-accent"
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[9px]",
    md: "px-8 py-4 text-[11px]",
    lg: "px-10 py-5 text-[11px]"
  };

  return (
    <button
      className={cn(
        "font-mono uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
