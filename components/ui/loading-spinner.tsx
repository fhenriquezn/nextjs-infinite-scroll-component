'use client';

import { Settings, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  variant?: 'default' | 'settings';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  variant = 'default',
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const baseClasses = cn(
    'animate-spin text-primary',
    sizeClasses[size],
    className
  );

  const icons = {
    default: <Loader2 className={baseClasses} />,
    settings: <Settings className={baseClasses} />,
  };

  return icons[variant];
}