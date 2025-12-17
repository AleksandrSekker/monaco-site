import Image, { ImageProps } from 'next/image';
import React from 'react';

interface RoundedImageProps extends Omit<ImageProps, 'className' | 'width' | 'height'> {
  size?: number;
  className?: string;
  border?: boolean;
  variant?: 'default' | 'service';
}

export function RoundedImage({
  src,
  alt,
  size = 48,
  className = '',
  border = true,
  variant = 'default',
  ...props
}: RoundedImageProps) {
  const isServiceVariant = variant === 'service';

  return (
    <div
      className={`relative ${!isServiceVariant && border ? 'border-2 border-slate-200' : ''} ${
        isServiceVariant ? '' : 'rounded-full'
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`object-contain w-full h-full ${isServiceVariant ? '' : 'rounded-full'} ${className}`}
        style={{ width: '100%', height: '100%' }}
        {...props}
      />
    </div>
  );
}
