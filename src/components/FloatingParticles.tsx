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
      const count = 80;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 10 + 20,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.4 + 0.1,
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
          className={`absolute rounded-full bg-primary ${particle.id % 3 === 0 ? 'animate-pulse' : ''}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animation: `${particle.id % 2 === 0 ? 'float-slow' : 'float'} ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 5}px hsl(var(--primary) / 0.5)`,
          }}
        />
      ))}

      {/* Decorative blurred circles - Personalized & Professional */}
      <div 
        className="absolute -left-20 top-1/4 h-64 w-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)), transparent)',
          filter: 'blur(80px)',
          animation: 'float-slow 15s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute -right-20 top-1/3 h-80 w-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(var(--pink-soft)), transparent)',
          filter: 'blur(100px)',
          animation: 'float-slow 20s ease-in-out infinite reverse',
        }}
      />
      <div 
        className="absolute left-1/4 bottom-1/4 h-72 w-72 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(var(--cyan-code)), transparent)',
          filter: 'blur(90px)',
          animation: 'float 18s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute right-1/4 top-1/2 h-56 w-56 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(var(--lavender)), transparent)',
          filter: 'blur(70px)',
          animation: 'float-slow 22s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default FloatingParticles;
