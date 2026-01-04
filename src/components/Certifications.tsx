import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useScrollAnimation';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  earned: boolean;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2023',
    credentialUrl: '#',
    earned: true,
  },
  {
    id: 2,
    title: 'Meta Frontend Developer',
    issuer: 'Meta',
    date: '2023',
    credentialUrl: '#',
    earned: true,
  },
  {
    id: 3,
    title: 'TypeScript Professional',
    issuer: 'Microsoft',
    date: '2022',
    credentialUrl: '#',
    earned: true,
  },
  {
    id: 4,
    title: 'Google Cloud Associate',
    issuer: 'Google',
    date: 'In Progress',
    earned: false,
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const mouseParallax = useMouseParallax(0.008);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div 
        className="absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-lavender/5 blur-[100px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * 3}px, ${mouseParallax.y * 3}px)` }}
      />
      <div 
        className="absolute right-0 bottom-1/4 h-[250px] w-[250px] rounded-full bg-pink-soft/5 blur-[80px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * -2}px, ${mouseParallax.y * -2}px)` }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// certifications'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Credentials<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`group relative overflow-hidden rounded-xl transition-all duration-700 ${
                cert.earned
                  ? 'glass-panel hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/15'
                  : 'border-dashed border border-border/50 bg-card/30'
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCert(cert.id)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Animated gradient border for earned certs */}
              {cert.earned && (
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-lavender to-pink-soft transition-opacity duration-500 ${
                  hoveredCert === cert.id ? 'opacity-100' : 'opacity-0'
                }`} style={{ padding: '1px' }}>
                  <div className="h-full w-full rounded-xl bg-card" />
                </div>
              )}
              
              {/* Card content */}
              <div className="relative z-10 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-lg p-2 transition-all duration-300 ${
                    cert.earned 
                      ? hoveredCert === cert.id 
                        ? 'bg-primary/20 scale-110 rotate-6' 
                        : 'bg-primary/10'
                      : 'bg-secondary'
                  }`}>
                    {cert.earned ? (
                      <Award className={`h-6 w-6 transition-colors duration-300 ${
                        hoveredCert === cert.id ? 'text-primary' : 'text-primary'
                      }`} />
                    ) : (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  {cert.earned && (
                    <div className="relative">
                      <CheckCircle className={`h-5 w-5 text-green-500 transition-transform duration-300 ${
                        hoveredCert === cert.id ? 'scale-125' : ''
                      }`} />
                      {/* Sparkle effect on hover */}
                      <Sparkles className={`absolute -top-1 -right-1 h-3 w-3 text-yellow-400 transition-all duration-300 ${
                        hoveredCert === cert.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`} />
                    </div>
                  )}
                </div>

                <h3 className={`mb-1 font-semibold transition-colors duration-300 ${
                  cert.earned 
                    ? hoveredCert === cert.id ? 'text-primary' : 'text-foreground'
                    : 'text-muted-foreground'
                }`}>
                  {cert.title}
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs transition-all duration-300 ${
                    cert.earned 
                      ? hoveredCert === cert.id ? 'text-primary scale-105' : 'text-primary'
                      : 'text-muted-foreground'
                  }`}>
                    {cert.date}
                  </span>
                  {cert.credentialUrl && cert.earned && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground underline transition-all duration-200 hover:text-primary hover:scale-105"
                    >
                      View credential
                    </a>
                  )}
                </div>
              </div>

              {/* Glow effects */}
              {cert.earned && (
                <>
                  <div className={`absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/20 blur-2xl transition-all duration-500 ${
                    hoveredCert === cert.id ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
                  }`} />
                  <div className={`absolute -left-5 -bottom-5 h-16 w-16 rounded-full bg-lavender/20 blur-xl transition-all duration-700 ${
                    hoveredCert === cert.id ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
                  }`} />
                </>
              )}
              
              {/* Progress bar for in-progress certs */}
              {!cert.earned && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-primary/50 to-lavender/50 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
