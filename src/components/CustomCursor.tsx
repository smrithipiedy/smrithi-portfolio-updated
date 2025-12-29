import { useEffect, useState, useCallback } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const createSparkle = useCallback((x: number, y: number) => {
    const sparkle: Sparkle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 4 + 2,
    };
    return sparkle;
  }, []);

  useEffect(() => {
    let sparkleInterval: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Create sparkles periodically while moving
    let lastSparkleTime = 0;
    const handleSparkle = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSparkleTime > 50) {
        lastSparkleTime = now;
        const newSparkle = createSparkle(e.clientX, e.clientY);
        setSparkles(prev => [...prev.slice(-15), newSparkle]);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleSparkle);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up old sparkles
    sparkleInterval = window.setInterval(() => {
      setSparkles(prev => prev.slice(-10));
    }, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleSparkle);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(sparkleInterval);
    };
  }, [createSparkle]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: position.x - 15,
          top: position.y - 15,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="h-[30px] w-[30px] rounded-full bg-primary/20 blur-sm" />
      </div>

      {/* Sparkle trail */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="pointer-events-none fixed z-[9998] hidden md:block"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <div
            className="h-full w-full animate-sparkle rounded-full bg-primary"
            style={{
              boxShadow: `0 0 ${sparkle.size * 2}px hsl(270 50% 70% / 0.6)`,
            }}
          />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
