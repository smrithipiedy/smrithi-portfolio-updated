import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle, Lock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  earned: boolean;
  subCertifications?: Certification[];
}

const certifications: Certification[] = [
  {
    id: 4,
    title: 'Anthropic Certifications',
    issuer: 'Anthropic',
    date: '2026',
    earned: true,
    subCertifications: [
      {
        id: 41,
        title: 'Claude Code 101',
        issuer: 'Anthropic',
        date: 'Jul 2026',
        credentialUrl: 'https://verify.skilljar.com/c/uv594wrffys6',
        earned: true,
      },
      {
        id: 42,
        title: 'Claude Code In Action',
        issuer: 'Anthropic',
        date: 'Jul 2026',
        credentialUrl: 'https://verify.skilljar.com/c/dfyz6sr78cv6',
        earned: true,
      },
      {
        id: 43,
        title: 'Claude Platform 101',
        issuer: 'Anthropic',
        date: 'Aug 2026',
        credentialUrl: 'https://verify.skilljar.com/c/5fqjdptduxhc',
        earned: true,
      },
    ],
  },
  {
    id: 1,
    title: 'AI Agents Fundamentals',
    issuer: 'Hugging Face',
    date: 'Jul 2026',
    credentialUrl: 'https://us.aws.cdn.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/55f20a9e929c8b19c9019e0cddb5b079c58910f687ea7cb3c02715756614622e?user_id=public&response-content-type=image%2Fpng&X-Xet-Cas-Uid=public&response-content-disposition=inline%3B+filename*%3DUTF-8%27%272026-07-25.png%3B+filename%3D%222026-07-25.png%22%3B&Expires=1786880940&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly91cy5hd3MuY2RuLmhmLmNvL3hldC1icmlkZ2UtdXMvNjdhNDcwMzc3NDllYTJjNGI5ZmFmZDRiLzU1ZjIwYTllOTI5YzhiMTljOTAxOWUwY2RkYjViMDc5YzU4OTEwZjY4N2VhN2NiM2MwMjcxNTc1NjYxNDYyMmVcXD91c2VyX2lkPXB1YmxpYyZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcmWC1YZXQtQ2FzLVVpZD1wdWJsaWMmcmVzcG9uc2UtY29udGVudC1kaXNwb3NpdGlvbj1pbmxpbmUlM0IrZmlsZW5hbWUlMkElM0RVVEYtOCUyNyUyNzIwMjYtMDctMjUucG5nJTNCK2ZpbGVuYW1lJTNEJTIyMjAyNi0wNy0yNS5wbmclMjIlM0IiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkVwb2NoVGltZSI6MTc4Njg4MDk0MH19fV19&Signature=MEUCIQDcdyKfyqevvbObboxhEc52etQ19LJ7vQkubSAycUGmiwIgX78qqMjdJ3dtdECUwtvWmCFGGsoZS2F-PKed3ETsbGw_&Key-Pair-Id=01KXEF4KZ1B6FV465MAWR4M21F',
    earned: true,
  },
  {
    id: 2,
    title: 'Building AI-Powered Search with MongoDB Vector Search',
    issuer: 'MongoDB',
    date: 'Apr 2025',
    credentialUrl: 'https://www.credly.com/badges/09559639-220f-459c-af0a-f96eb2846f60/',
    earned: true,
  },
  {
    id: 3,
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    date: 'May 2025',
    credentialUrl: 'https://www.linkedin.com/in/smrithipiedy/overlay/Certifications/25292560/treasury?profileId=ACoAAEs_XakB5TvBu1CfQobTfsN3RE0XaUeMpDk',
    earned: true,
  },
  {
    id: 5,
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    date: 'Feb 2025',
    credentialUrl: 'https://badgr.com/public/assertions/tsOWU0p-SCK1Aj7euFchPg?identity__email=smrithipiedy49%40gmail.com',
    earned: true,
  },
  {
    id: 7,
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey.org',
    date: 'Dec 2025',
    credentialUrl: 'https://www.credly.com/badges/68128ad9-bfb9-431d-a930-98e94b6dec25/public_url',
    earned: true,
  },
  {
    id: 10,
    title: 'Code In Place 2026',
    issuer: 'Stanford University',
    date: 'Jun 2026',
    credentialUrl: 'https://codeinplace.stanford.edu/cip6/certificate/fls236',
    earned: true,
  },
  {
    id: 11,
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University',
    date: 'In Progress',
    earned: false,
  },
  {
    id: 12,
    title: 'GitHub Foundations Certification',
    issuer: 'GitHub',
    date: 'In Progress',
    earned: false,
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [expandedCertId, setExpandedCertId] = useState<number | null>(null);

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
      id="certifications"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header - UNIFORM SIZE */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// certifications'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Credentials<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Certifications Grid - 3 COLUMNS */}
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => cert.subCertifications && setExpandedCertId(expandedCertId === cert.id ? null : cert.id)}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-500 ${
                cert.earned
                  ? 'border-border bg-card/80 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10'
                  : 'border-dashed border-border/50 bg-card/30'
              } ${cert.subCertifications ? 'cursor-pointer' : ''} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
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

                <h3 className={`mb-1 font-semibold transition-colors duration-300 flex items-center justify-between ${
                  cert.earned
                    ? hoveredCert === cert.id ? 'text-primary' : 'text-foreground'
                    : 'text-muted-foreground'
                }`}>
                  {cert.title}
                  {cert.subCertifications && (
                    expandedCertId === cert.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className={`font-mono text-xs transition-all duration-300 ${
                      cert.earned
                        ? hoveredCert === cert.id ? 'text-primary scale-105' : 'text-primary'
                        : 'text-muted-foreground'
                    }`}>
                      {cert.date}
                    </span>
                    {cert.subCertifications && (
                      <span className="text-[10px] text-muted-foreground/80 mt-1">
                        {cert.subCertifications.length} certification{cert.subCertifications.length !== 1 ? 's' : ''} completed
                      </span>
                    )}
                  </div>
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

                {expandedCertId === cert.id && cert.subCertifications && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {cert.subCertifications.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between text-xs group/sub">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground group-hover/sub:text-primary transition-colors">{sub.title}</span>
                          <span className="text-muted-foreground">{sub.date}</span>
                        </div>
                        {sub.credentialUrl && (
                          <a
                            href={sub.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline transition-all"
                          >
                            View
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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

        {/* View More Certifications */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-muted-foreground">
            View more certifications here:{' '}
            <a
              href="https://drive.google.com/drive/folders/1NlWd2Te4lcpMwjvqVrpp6vTy9xADFQKr?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Drive Folder
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
