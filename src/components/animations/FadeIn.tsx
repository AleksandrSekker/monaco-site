'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?:
    | `${number}px`
    | `${number}%`
    | `${number}px ${number}px`
    | `${number}% ${number}%`
    | `${number}px ${number}px ${number}px ${number}px`
    | `${number}% ${number}% ${number}% ${number}%`;
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  viewportMargin = '-100px',
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: viewportMargin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
