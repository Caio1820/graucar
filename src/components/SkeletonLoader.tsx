import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-800/80 border border-zinc-700/20 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.04] before:to-transparent ${className}`}
    />
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
      <Skeleton className="h-44 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-1.5 pt-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
        <Skeleton className="h-3.5 w-4/6" />
      </div>
      <div className="pt-4 flex items-center justify-between">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
};
