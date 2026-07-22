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
      <span className="text-[#b10924] drop-shadow-[0_2px_4px_rgba(177,9,36,0.3)]">
        {uppercase ? 'AUTO' : 'Auto'}
      </span>
      <span className="text-[#042165] ml-[0.15em] drop-shadow-[0_2px_4px_rgba(4,33,101,0.3)]">
        {uppercase ? 'BELLINI' : 'Bellini'}
      </span>
    </span>
  );
};
