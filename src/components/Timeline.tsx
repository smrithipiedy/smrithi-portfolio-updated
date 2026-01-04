import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Award, ChevronDown } from 'lucide-react';

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
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// experience'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            My Journey<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {timelineData.map((item, index) => {
            const Icon = iconMap[item.type];
            const isExpanded = expandedItems.includes(item.id);
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative mb-8 transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background md:absolute md:left-1/2 md:-translate-x-1/2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`group flex-1 cursor-pointer rounded-lg border border-border bg-card/80 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                    onClick={() => item.details && toggleExpand(item.id)}
                  >
                    {/* Period badge */}
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                      {item.period}
                    </span>

                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mb-2 text-sm text-primary">{item.organization}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>

                    {/* Expandable details */}
                    {item.details && (
                      <>
                        <div
                          className={`mt-3 overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <ul className="space-y-1 border-t border-border pt-3">
                            {item.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button className="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                          <ChevronDown
                            className={`h-3 w-3 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      </>
                    )}
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
