import Image, { ImageProps } from 'next/image';
import React from 'react';

interface RoundedImageProps extends Omit<ImageProps, 'className' | 'width' | 'height'> {
  size?: number;
  className?: string;
  border?: boolean;
}

export function RoundedImage({ src, alt, size = 48, className = '', border = true, ...props }: RoundedImageProps) {
  return (
    <div
      className={`relative ${border ? 'border-2 border-slate-200' : ''} rounded-full`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`object-cover w-full h-full rounded-full ${className}`}
        style={{ width: '100%', height: '100%' }}
        {...props}
      />
    </div>
  );
}
