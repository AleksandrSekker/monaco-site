import { motion, HTMLMotionProps } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from '../animations/LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type BaseButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragExit' | 'onAnimationStart'
>;

interface AnimatedButtonProps
  extends BaseButtonProps, Omit<HTMLMotionProps<'button'>, keyof BaseButtonProps | 'style' | 'className' | 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}: AnimatedButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Only pass through the props that are safe for motion.button
  const { ...safeProps } = props;

  const buttonProps = {
    ...safeProps,
    className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`,
    disabled: disabled || isLoading,
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...buttonProps}
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="mr-2">
            <LoadingSpinner size={16} />
          </span>
          {children}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
