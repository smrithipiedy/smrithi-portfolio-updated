import { useEffect, useRef, useState } from 'react';
import { useMouseParallax } from '@/hooks/useScrollAnimation';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'HTML/CSS', level: 95, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 88, category: 'Frontend' },
  { name: 'Next.js', level: 75, category: 'Frontend' },
  // Backend
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Python', level: 70, category: 'Backend' },
  { name: 'PostgreSQL', level: 75, category: 'Backend' },
  { name: 'REST APIs', level: 85, category: 'Backend' },
  // Tools
  { name: 'Git', level: 88, category: 'Tools' },
  { name: 'VS Code', level: 95, category: 'Tools' },
  { name: 'Figma', level: 70, category: 'Tools' },
];

const categories = ['Frontend', 'Backend', 'Tools'];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Frontend');
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

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div 
        className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-pink-soft/5 blur-[100px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * -3}px, ${mouseParallax.y * -3}px)` }}
      />
      <div 
        className="absolute -left-20 bottom-1/4 h-[250px] w-[250px] rounded-full bg-cyan-code/5 blur-[80px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * 2}px, ${mouseParallax.y * 2}px)` }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// skills'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Tech Stack<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Category Tabs with glass effect */}
        <div 
          className={`mb-12 flex justify-center transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="glass-card-strong rounded-full p-1.5 flex gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2.5 font-mono text-sm rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with glass panels */}
        <div className="mx-auto max-w-3xl space-y-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group glass-panel rounded-xl p-5 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
                <span className="font-mono text-sm text-primary glass-card px-3 py-1 rounded-full">{skill.level}%</span>
              </div>
              
              {/* Progress Bar Container with glass effect */}
              <div className="relative h-3 overflow-hidden rounded-full bg-secondary/50 backdrop-blur-sm">
                {/* Progress Fill with gradient */}
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                    isVisible ? '' : 'w-0'
                  }`}
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${400 + index * 100}ms`,
                    background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--lavender)), hsl(var(--pink-soft)))',
                  }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 shimmer" />
                  {/* Glow effect */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-primary/50 blur-md" />
                </div>

                {/* Level markers */}
                <div className="absolute inset-0 flex">
                  {[25, 50, 75].map((marker) => (
                    <div
                      key={marker}
                      className="h-full w-px bg-border/30"
                      style={{ left: `${marker}%`, position: 'absolute' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Skills Summary with glass effect */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p className="mb-4 text-sm text-muted-foreground">Also familiar with:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['GraphQL', 'Docker', 'AWS', 'MongoDB', 'Redux', 'Jest', 'Sass', 'Vue.js'].map((tech, index) => (
              <span
                key={tech}
                className="glass-card rounded-full px-4 py-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/10 cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
