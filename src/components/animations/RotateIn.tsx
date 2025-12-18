'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type RotateInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  angle?: number;
  className?: string;
};

export default function RotateIn({ children, delay = 0, duration = 0.7, angle = 5, className = '' }: RotateInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -angle }}
      animate={isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -angle }}
      transition={{
        delay,
        duration,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className={`origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
