import { useEffect, useState } from 'react';

interface PaperCutoutTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const PaperCutoutText = ({ text, className = '', delay = 0 }: PaperCutoutTextProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const letters = text.split('');
  
  // Different directions for letters to fly in from
  const directions = ['left', 'right', 'top', 'bottom'];
  
  // Random rotation for each letter (-5 to 5 degrees)
  const getRandomRotation = () => (Math.random() - 0.5) * 10;
  
  // Random paper colors for variety
  const paperColors = [
    'bg-primary',
    'bg-pink-soft',
    'bg-paper-yellow',
    'bg-paper-cyan',
    'bg-lavender',
  ];

  return (
    <span className={`inline-flex flex-wrap justify-center items-baseline gap-1 ${className}`}>
      {letters.map((letter, index) => {
        const direction = directions[index % directions.length];
        const rotation = getRandomRotation();
        const animationDelay = delay + index * 80;
        const colorIndex = index % paperColors.length;
        
        if (letter === ' ') {
          return <span key={index} className="w-4" />;
        }

        return (
          <span
            key={index}
            className={`
              relative inline-block px-2 py-1 md:px-3 md:py-2
              ${paperColors[colorIndex]}
              text-ink-black font-bold
              border-2 border-ink-black
              opacity-0
              ${isLoaded ? `animate-fly-in-${direction}` : ''}
              hover:animate-wiggle
              transition-shadow
              hover:shadow-lg
            `}
            style={{
              '--letter-rotation': `${rotation}deg`,
              animationDelay: `${animationDelay}ms`,
              animationFillMode: 'forwards',
              boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)',
              transform: isLoaded ? undefined : 'scale(0)',
            } as React.CSSProperties}
          >
            {/* Paper texture overlay */}
            <span 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            {letter}
          </span>
        );
      })}
    </span>
  );
};

export default PaperCutoutText;
