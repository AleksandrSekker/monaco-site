'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type FadeInScaleProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scaleFrom?: number;
  className?: string;
};

export default function FadeInScale({
  children,
  delay = 0,
  duration = 0.6,
  scaleFrom = 0.95,
  className = '',
}: FadeInScaleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: scaleFrom }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: scaleFrom }}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
