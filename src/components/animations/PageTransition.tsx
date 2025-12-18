'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.5,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
