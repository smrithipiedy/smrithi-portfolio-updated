import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Award, ChevronDown } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useScrollAnimation';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'achievement';
  title: string;
  organization: string;
  period: string;
  description: string;
  details?: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Frontend Developer',
    organization: 'Tech Company',
    period: '2023 - Present',
    description: 'Building modern web applications with React and TypeScript.',
    details: [
      'Developed responsive UI components',
      'Implemented state management solutions',
      'Collaborated with design team on UX improvements',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Web Developer Intern',
    organization: 'Startup Inc.',
    period: '2022 - 2023',
    description: 'Gained hands-on experience in full-stack development.',
    details: [
      'Built RESTful APIs with Node.js',
      'Created interactive dashboards',
      'Participated in code reviews',
    ],
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Computer Science',
    organization: 'University',
    period: '2019 - 2023',
    description: 'Focused on software engineering and web technologies.',
    details: [
      'Specialized in Web Development',
      'Dean\'s List: 3 semesters',
      'Capstone: E-commerce Platform',
    ],
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Hackathon Winner',
    organization: 'TechFest 2022',
    period: '2022',
    description: 'First place in the web development category.',
  },
];

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
};

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const mouseParallax = useMouseParallax(0.008);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
      {/* Background decorative elements */}
      <div 
        className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-lavender/5 blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * 3}px, ${mouseParallax.y * 3}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// experience'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            My Journey<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line with gradient */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-lavender/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {timelineData.map((item, index) => {
            const Icon = iconMap[item.type];
            const isExpanded = expandedItems.includes(item.id);
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative mb-8 transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon with glass effect */}
                  <div 
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-card-strong shadow-lg shadow-primary/20 md:absolute md:left-1/2 md:-translate-x-1/2 transition-transform duration-300 hover:scale-110"
                    style={{ transform: `translate(${mouseParallax.x * 0.5}px, ${mouseParallax.y * 0.5}px)` }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content Card with glass effect */}
                  <div
                    className={`group flex-1 cursor-pointer glass-panel rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                    onClick={() => item.details && toggleExpand(item.id)}
                  >
                    {/* Period badge */}
                    <span className="mb-2 inline-block rounded-full glass-card px-3 py-1 font-mono text-xs text-primary">
                      {item.period}
                    </span>

                    <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mb-2 text-sm text-primary">{item.organization}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>

                    {/* Expandable details */}
                    {item.details && (
                      <>
                        <div
                          className={`mt-3 overflow-hidden transition-all duration-500 ${
                            isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <ul className="space-y-1 border-t border-border/30 pt-3">
                            {item.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button className="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary group/btn">
                          <ChevronDown
                            className={`h-3 w-3 transition-transform duration-500 ${
                              isExpanded ? 'rotate-180' : ''
                            } group-hover/btn:text-primary`}
                          />
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      </>
                    )}
                    
                    {/* Hover glow */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
