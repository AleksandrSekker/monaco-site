import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type HoverScaleProps = {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
  whileTapScale?: number;
};

export default function HoverScale({
  children,
  className = '',
  scale = 1.05,
  duration = 0.2,
  whileTapScale = 0.98,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: whileTapScale }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
