import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle, Lock } from 'lucide-react';

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
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
              className={`group relative overflow-hidden rounded-xl border transition-all duration-500 ${
                cert.earned
                  ? 'border-border bg-card/80 hover:border-primary/50'
                  : 'border-dashed border-border/50 bg-card/30'
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-lg p-2 ${cert.earned ? 'bg-primary/10' : 'bg-secondary'}`}>
                    {cert.earned ? (
                      <Award className="h-6 w-6 text-primary" />
                    ) : (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  {cert.earned && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>

                <h3 className={`mb-1 font-semibold ${cert.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {cert.title}
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs ${cert.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                    {cert.date}
                  </span>
                  {cert.credentialUrl && cert.earned && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground underline transition-colors hover:text-primary"
                    >
                      View credential
                    </a>
                  )}
                </div>
              </div>

              {/* Earned glow effect */}
              {cert.earned && (
                <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
