'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type SlideUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  viewportMargin?:
    | `${number}px`
    | `${number}%`
    | `${number}px ${number}px`
    | `${number}% ${number}%`
    | `${number}px ${number}px ${number}px ${number}px`
    | `${number}% ${number}% ${number}% ${number}%`
    | { bottom?: number; top?: number; left?: number; right?: number };
};

export default function SlideUp({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = '',
  viewportMargin = { bottom: -50 },
}: SlideUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin:
      typeof viewportMargin === 'object'
        ? `${viewportMargin.top || 0}px ${viewportMargin.right || 0}px ${viewportMargin.bottom || 0}px ${viewportMargin.left || 0}px`
        : viewportMargin,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
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
