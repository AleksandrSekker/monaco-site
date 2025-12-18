import { motion, Variants } from 'framer-motion';

type LoadingSpinnerProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function LoadingSpinner({ size = 24, color = 'currentColor', className = '' }: LoadingSpinnerProps) {
  const circleVariants: Variants = {
    start: {
      opacity: 1,
      pathLength: 0,
    },
    end: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' as const }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 38 38" width={size} height={size} stroke={color} xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle cx="18" cy="18" r="18" strokeOpacity=".2" />
            <motion.path d="M36 18c0-9.94-8.06-18-18-18" variants={circleVariants} initial="start" animate="end" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
