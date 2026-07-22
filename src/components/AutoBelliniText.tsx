import React from 'react';

interface AutoBelliniTextProps {
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  uppercase?: boolean;
}

export const AutoBelliniText: React.FC<AutoBelliniTextProps> = ({ 
  className = '', 
  uppercase = false 
}) => {
  return (
    <span className={`font-brand inline-flex items-baseline tracking-tight font-black ${className}`}>
      <span className="text-red-600 drop-shadow-[0_2px_4px_rgba(220,38,38,0.2)]">
        {uppercase ? 'AUTO' : 'Auto'}
      </span>
      <span className="text-blue-500 ml-[0.15em] drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)]">
        {uppercase ? 'BELLINI' : 'Bellini'}
      </span>
    </span>
  );
};
