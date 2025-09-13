import React from 'react';
import { Scale } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center`}>
        <Scale className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
          LegalAI
        </span>
      )}
    </div>
  );
};

export default Logo;
