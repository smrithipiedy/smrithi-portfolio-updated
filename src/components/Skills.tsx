import { useEffect, useRef, useState } from 'react';

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
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// skills'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Tech Stack<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div 
          className={`mb-12 flex justify-center gap-4 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2 font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
              {activeCategory === category && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mx-auto max-w-3xl space-y-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group transition-all duration-500 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-foreground">{skill.name}</span>
                <span className="font-mono text-sm text-primary">{skill.level}%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
                {/* Progress Fill */}
                <div
                  className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-pink-soft transition-all duration-1000 ease-out ${
                    isVisible ? '' : 'w-0'
                  }`}
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" 
                    style={{
                      animation: 'shimmer 2s linear infinite',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>

                {/* Level markers */}
                <div className="absolute inset-0 flex">
                  {[25, 50, 75].map((marker) => (
                    <div
                      key={marker}
                      className="h-full w-px bg-border"
                      style={{ left: `${marker}%`, position: 'absolute' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Skills Summary */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p className="mb-4 text-sm text-muted-foreground">Also familiar with:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['GraphQL', 'Docker', 'AWS', 'MongoDB', 'Redux', 'Jest', 'Sass', 'Vue.js'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card/50 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground"
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
