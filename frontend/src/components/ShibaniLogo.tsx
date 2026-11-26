import React from 'react';

interface ShibaniLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export default function ShibaniLogo({
  variant = 'dark',
  size = 'lg',
  className = '',
  showTagline = true,
}: ShibaniLogoProps) {
  const isLight = variant === 'light';

  const imgDimensions = {
    sm: 'w-7 h-7 sm:w-9 sm:h-9',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16',
    xl: 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-[17px] sm:text-2xl',
    lg: 'text-lg sm:text-2xl lg:text-[32px]',
    xl: 'text-2xl sm:text-3xl lg:text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[7px] sm:text-[8px]',
    md: 'text-[7.5px] sm:text-[10px]',
    lg: 'text-[8px] sm:text-[10.5px] lg:text-[12px]',
    xl: 'text-[10px] sm:text-[12px] lg:text-[13px]',
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 select-none min-w-0 ${className}`}>
      {/* Official High-Resolution Logo Emblem */}
      <div
        className={`relative shrink-0 rounded-xl sm:rounded-2xl overflow-hidden ${imgDimensions[size]} p-0.5 sm:p-1 shadow-md transition-transform duration-300 group-hover:scale-105 border`}
        style={{
          background: isLight
            ? 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)',
          borderColor: isLight ? 'rgba(255,255,255,0.3)' : '#E2E8F0',
        }}
      >
        <div className="w-full h-full rounded-lg sm:rounded-xl bg-white flex items-center justify-center overflow-hidden">
          <img
            src="/images/shibani.png"
            alt="Shibani Travels Official Logo"
            className="w-full h-full object-contain p-0.5 filter drop-shadow-sm"
            onError={(e) => {
              e.currentTarget.src = '/images/shibani_emblem.png';
            }}
          />
        </div>
      </div>

      {/* Brand Typography: Bold Shibani (Emerald Green) + Travels (Crimson Red) */}
      <div className="flex flex-col text-left justify-center min-w-0">
        <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
          <span
            className={`font-black tracking-tight ${titleSizes[size]}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isLight ? '#FFFFFF' : '#006837',
              textShadow: isLight ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            Shibani
          </span>
          <span
            className={`font-black tracking-tight ${titleSizes[size]}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: '#D32F2F',
              textShadow: isLight ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            Travels
          </span>
        </div>

        {showTagline && (
          <span
            className={`italic font-bold tracking-wide mt-0.5 sm:mt-1 whitespace-nowrap ${taglineSizes[size]}`}
            style={{
              color: isLight ? '#A7F3D0' : '#006837',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Your Journey, Our Priority
          </span>
        )}
      </div>
    </div>
  );
}
