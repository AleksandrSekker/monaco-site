'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'onDrag'>;
type ButtonElementProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

type ButtonProps = Omit<MotionButtonProps & ButtonElementProps, 'children'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type VariantType = ButtonVariant;
type SizeType = ButtonSize;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    className = '',
    disabled = false,
    ...restProps
  } = props;

  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variants: Record<VariantType, string> = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizes: Record<SizeType, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      ref={ref}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant as VariantType]} ${sizes[size as SizeType]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...(restProps as HTMLMotionProps<'button'>)}
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="mr-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </span>
          {children}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
