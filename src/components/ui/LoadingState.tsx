// src/components/ui/LoadingState.tsx
'use client';

import { motion } from 'framer-motion';

interface LoadingStateProps {
  count?: number;
  className?: string;
  itemClassName?: string;
}

export function LoadingState({ count = 6, className = '', itemClassName = '' }: LoadingStateProps) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${itemClassName}`}
        >
          <div className="mb-4 h-12 w-12 animate-pulse rounded-full bg-slate-200"></div>
          <div className="space-y-3">
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200"></div>
            <div className="h-3 w-full animate-pulse rounded bg-slate-200"></div>
            <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200"></div>
            <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200"></div>
            <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-200"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Skeleton component for single item
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}
