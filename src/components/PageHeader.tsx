import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, className = '', children }: PageHeaderProps) {
  return (
    <div className={`max-w-6xl mx-auto px-4 py-12 lg:py-16 ${className}`}>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {description && <p className="text-lg text-slate-600">{description}</p>}
        {children}
      </div>
    </div>
  );
}
