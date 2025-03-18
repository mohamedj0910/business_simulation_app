import React from 'react';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, actions, className = '' }: HeaderProps) {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between ${className}`}>
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      {actions && <div className="flex items-center space-x-4">{actions}</div>}
    </div>
  );
}
