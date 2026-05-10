import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Award, ChevronDown, BookOpen } from 'lucide-react';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'achievement' | 'section-header';
  title: string;
  organization?: string;
  period?: string;
  description?: string;
  details?: string[];
  side: 'left' | 'right' | 'center';
}

const timelineData: TimelineItem[] = [
  {
    id: 0,
    type: 'section-header',
    title: 'Education',
    side: 'center',
  },
  {
    id: 1,
    type: 'education',
    title: 'NSN Memorial School (CBSE)',
    organization: 'Chennai',
    period: '2008 - 2023',
    description: 'Foundation and Higher Secondary Education.',
    details: [
      'Scored 90%+ in CS and English in 12th exams.',
      'Selected for international Spell Bee tournament in 2017.',
      'Worked as an emcee across multiple school events.',
      'Super Senior Girls Chess Tournament Winner, 2023.',
      'Won multiple awards in Throwball competitions conducted in school.',
    ],
    side: 'left',
  },
  {
    id: 2,
    type: 'education',
    title: 'MNM Jain Engineering College (Anna University)',
    organization: 'Chennai',
    period: '2023 - 2027',
    description: 'Bachelor of Engineering (B.E), Computer Science and Engineering',
    details: [
      'Won first place in Pitch My Idea competition for two consecutive years.',
      'Won first and second place in many interdisciplinary competitions such as Web Development, UI/UX Designing, Debugging, etc.',
      'Worked as emcee for multiple events.',
      'Bagged first place in the intra-college Sparkathon hackathon conducted in February 2026.',
      'Received winner and runner medals in different years across Chess, Table Tennis and Throwball.',
    ],
    side: 'left',
  },
  {
    id: 3,
    type: 'section-header',
    title: 'Experiences',
    side: 'center',
  },
  {
    id: 4,
    type: 'work',
    title: 'Web Development Intern',
    organization: 'ShadowFox',
    period: 'Jan 2025',
    description: 'Foundation and portfolio development.',
    details: [
      'Learnt the basics and foundations of web development.',
      'Built my portfolio for the first time using HTML, CSS and JavaScript.',
    ],
    side: 'right',
  },
  {
    id: 5,
    type: 'work',
    title: 'Open Source Contributor',
    organization: 'SWOC, OSGC, and GSSoC',
    period: '2025 - Present',
    description: 'Contributing to global open source projects.',
    details: [
      'Merged 10+ PRs across various projects.',
      'Learnt Git, GitHub in depth by contributing to open source software.',
    ],
    side: 'right',
  },
  {
    id: 6,
    type: 'work',
    title: 'Python Project Intern',
    organization: 'Infosys Springboard',
    period: 'Feb 2025 - Apr 2025',
    description: 'Agile Management Dashboard Development.',
    details: [
      'Developed an Agile Dashboard with sprint tracking and role-based access control.',
      'Integrated performance analytics with leaderboards and data visualizations.',
      'Automated reporting systems using Flask, SQLAlchemy, and scheduled email services.',
    ],
    side: 'right',
  },
  {
    id: 7,
    type: 'work',
    title: 'Cybersecurity Project Intern',
    organization: 'Tamil Nadu Cyber Crime Wing, Chennai',
    period: 'Jun 2025 - Jul 2025',
    description: 'Request Tracking Dashboard for Law Enforcement.',
    details: [
      'Built a frontend for case management, history, and real-time communication monitoring.',
      'Implemented automated report generation for police officers using React and TypeScript.',
      'Streamlined communication tracking between banks, TSPs, and intermediaries.',
    ],
    side: 'right',
  },
  {
    id: 8,
    type: 'work',
    title: 'Full Stack Development Intern',
    organization: 'AdroIT Technologies Pvt. Ltd.',
    period: 'Dec 2025 - Feb 2026',
    description: 'MERN-based Learning Management System.',
    details: [
      'Architected end-to-end MERN stack solutions including MongoDB schema and REST APIs.',
      'Implemented dashboard with Role-Based Access Control (RBAC) for multiple user tiers.',
      'Recognized as a Top Performer in the Naan Mudhalvan IBM AI-EBPL program.',
    ],
    side: 'right',
  },
];

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
  'section-header': BookOpen,
};

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [starPosition, setStarPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;

      let relativePos = viewportCenter - timelineRect.top;
      const clampedPos = Math.max(0, Math.min(timelineRect.height, relativePos));
      setStarPosition(clampedPos);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Header - SLIGHTLY DECREASED SIZE */}
        <div className={`mb-24 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// experience'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            My Journey<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">

          {/* Main Line Background (Thicker) */}
          <div className="absolute left-4 top-0 h-full w-1 bg-secondary/30 md:left-1/2 md:-translate-x-1/2">
            {/* Active Trail - Thicker & Opaque */}
            <div
              className="absolute top-0 w-full bg-gradient-to-b from-primary via-lavender to-pink-soft shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              style={{ height: `${starPosition}px` }}
            />

            {/* The Sparkle / Fire Star - HIGH Z-INDEX TO COVER LINE */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none scale-50 md:scale-100"
              style={{ top: `${starPosition}px` }}
            >
              <div className="relative flex items-center justify-center">
                {/* Background Bloomer to hide the line completely */}
                <div className="absolute h-8 w-8 rounded-full bg-background/90 blur-md" />

                {/* Core Sparkle - Refined Size */}
                <div className="absolute h-10 w-10 animate-spin [animation-duration:4s]">
                  {/* Thick Glow Lines */}
                  <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white shadow-[0_0_10px_#fff]" />
                  <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white shadow-[0_0_10px_#fff]" />

                  {/* Diagonal Sparkles */}
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/80 rotate-45" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/80 -rotate-45" />
                </div>

                {/* Fire Glow Core - No Pulse */}
                <div className="h-5 w-5 rounded-full bg-white shadow-[0_0_20px_#fff,0_0_40px_hsl(var(--primary))] opacity-100" />

                {/* Fire Tail / Flames reaching upwards - Refined */}
                <div className="absolute bottom-full mb-[-4px] flex flex-col items-center">
                  <div className="h-16 w-1 bg-gradient-to-t from-white via-primary to-transparent opacity-90 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {(() => {
            let itemCounter = 0;
            return timelineData.map((item, index) => {
              const Icon = iconMap[item.type];
              const isExpanded = expandedItems.includes(item.id);
              const isHeader = item.type === 'section-header';

              if (!isHeader) itemCounter++;
              const isLeft = itemCounter % 2 !== 0;

              return (
                <div
                  key={item.id}
                  className={`relative mb-4 last:mb-0 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {isHeader ? (
                    <div className="flex justify-center py-6">
                      <div className="relative z-20 flex items-center gap-4 rounded-full border-2 border-primary bg-card px-10 py-4 shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-transform hover:scale-105">
                        <Icon className="h-6 w-6 text-primary" />
                        <span className="font-display text-2xl font-bold text-foreground tracking-wide uppercase">{item.title}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex flex-col md:flex-row items-center gap-12 ${isLeft ? 'md:justify-start' : 'md:justify-end'
                      }`}>
                      <div
                        className={`group relative z-30 w-[calc(100%-2.5rem)] ml-10 md:ml-0 md:w-[42%] cursor-pointer rounded-xl border-2 border-border bg-card/95 md:bg-card p-6 shadow-xl transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] ${isLeft ? 'hover:-translate-x-2' : 'hover:translate-x-2'
                          }`}
                        onClick={() => item.details && toggleExpand(item.id)}
                      >
                        <div className="mb-3">
                          <span className="inline-block rounded-md bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary border border-primary/20">
                            {item.period}
                          </span>
                        </div>
                        <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="mb-3 text-base font-semibold text-primary/90">{item.organization}</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
                        {item.details && (
                          <>
                            <div className={`mt-4 overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              <ul className="space-y-2.5 border-t border-border/50 pt-4 flex flex-col items-start">
                                {item.details.map((detail, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/70 text-left">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button className="mt-4 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                              <span className="font-mono">{isExpanded ? 'LESS' : 'MORE'}</span>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </>
                        )}
                        <div className={`absolute top-1/2 hidden h-0.5 w-10 bg-primary/40 md:block ${isLeft ? '-right-10' : '-left-10'}`} />
                      </div>
                      <div className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_15px_rgba(168,85,247,0.8)] md:left-1/2 md:-translate-x-1/2 z-20 transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-1 rounded-full bg-primary animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
