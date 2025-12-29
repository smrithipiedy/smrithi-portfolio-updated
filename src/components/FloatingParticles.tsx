import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = 30;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animation: `float-slow ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 4}px hsl(270 50% 70% / 0.3)`,
          }}
        />
      ))}

      {/* Subtle gradient orbs */}
      <div 
        className="absolute -left-40 top-1/4 h-80 w-80 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(270 50% 70%), transparent)',
          filter: 'blur(60px)',
          animation: 'float-slow 20s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute -right-40 top-2/3 h-96 w-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(320 40% 70%), transparent)',
          filter: 'blur(80px)',
          animation: 'float-slow 25s ease-in-out infinite reverse',
        }}
      />
      <div 
        className="absolute left-1/3 top-3/4 h-64 w-64 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, hsl(180 40% 60%), transparent)',
          filter: 'blur(50px)',
          animation: 'float 15s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default FloatingParticles;
