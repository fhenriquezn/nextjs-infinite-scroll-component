'use client';

import LoadingSpinner from "@/components/ui/loading-spinner";

interface LoadingProps {
  variant?: 'default' | 'settings';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({
  variant = 'default',
  size = 'md',
  text,
}: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[100px] gap-3">
      <LoadingSpinner variant={variant} size={size} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}