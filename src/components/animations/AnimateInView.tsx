import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimateInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
};

export default function AnimateInView({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
  duration = 0.5,
  once = true,
}: AnimateInViewProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
