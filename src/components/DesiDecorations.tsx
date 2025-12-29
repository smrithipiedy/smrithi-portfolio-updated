import { useEffect, useState } from 'react';

// Ornate corner decoration component
export const OrnateCorner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0 rotate-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
  };

  return (
    <svg 
      className={`absolute w-12 h-12 md:w-16 md:h-16 ${positionClasses[position]} pointer-events-none opacity-40`}
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M0 0 L30 0 C20 10 10 20 0 30 Z"
        fill="url(#goldGradient)"
      />
      <circle cx="15" cy="15" r="3" fill="hsl(45 90% 55%)" />
      <circle cx="8" cy="22" r="2" fill="hsl(330 70% 55%)" />
      <circle cx="22" cy="8" r="2" fill="hsl(330 70% 55%)" />
      <path
        d="M5 5 Q15 15 5 25"
        stroke="hsl(45 90% 55%)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 90% 55%)" />
          <stop offset="100%" stopColor="hsl(330 70% 55%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Section divider with desi flair
export const DesiDivider = ({ className = '' }: { className?: string }) => (
  <div className={`relative flex items-center justify-center py-4 ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    <div className="mx-4 flex items-center gap-2">
      <span className="text-gold/60 text-xs">✦</span>
      <span className="text-magenta/60 text-sm">◆</span>
      <span className="text-gold/60 text-xs">✦</span>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
  </div>
);

// Floating marigold petals (subtle background decoration)
export const FloatingPetals = () => {
  const [petals] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 8 + Math.random() * 8,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-float-slow opacity-20"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <svg 
            width={petal.size} 
            height={petal.size * 1.5} 
            viewBox="0 0 20 30"
            fill="none"
          >
            <ellipse 
              cx="10" 
              cy="15" 
              rx="8" 
              ry="12" 
              fill="url(#petalGradient)"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(40 95% 50%)" />
                <stop offset="100%" stopColor="hsl(30 90% 55%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

// Decorative mandala ring (for backgrounds)
export const MandalaRing = ({ className = '' }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <svg 
      className="w-64 h-64 md:w-96 md:h-96 opacity-[0.03]"
      viewBox="0 0 200 200"
      fill="none"
    >
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" stroke="hsl(45 90% 55%)" strokeWidth="1" />
      <circle cx="100" cy="100" r="85" stroke="hsl(330 70% 55%)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="75" stroke="hsl(45 90% 55%)" strokeWidth="0.5" />
      
      {/* Petals pattern */}
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="30"
          rx="8"
          ry="20"
          fill="hsl(45 90% 55%)"
          fillOpacity="0.3"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      
      {/* Inner details */}
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`dot-${i}`}
          cx="100"
          cy="50"
          r="3"
          fill="hsl(330 70% 55%)"
          fillOpacity="0.5"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
      
      <circle cx="100" cy="100" r="20" stroke="hsl(45 90% 55%)" strokeWidth="1" />
      <circle cx="100" cy="100" r="10" fill="hsl(330 70% 55%)" fillOpacity="0.3" />
    </svg>
  </div>
);

// Ornate frame for cards
export const OrnateFrame = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <OrnateCorner position="top-left" />
    <OrnateCorner position="top-right" />
    <OrnateCorner position="bottom-left" />
    <OrnateCorner position="bottom-right" />
    {children}
  </div>
);
