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
      className="relative py-24 md:py-32 paper-texture"
    >
      {/* Spider-punk decorative scraps */}
      <div 
        className="absolute top-16 left-10 h-10 w-16 bg-paper-yellow/25 border-2 border-ink-black/20 opacity-40 stop-motion"
        style={{ transform: 'rotate(-10deg)' }}
      />
      <div 
        className="absolute bottom-24 right-14 h-12 w-10 bg-paper-pink/20 border-2 border-ink-black/20 opacity-30 stop-motion"
        style={{ transform: 'rotate(12deg)', animationDelay: '0.1s' }}
      />

      <div className="container mx-auto px-6">
        {/* Section Header - paper style */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span 
            className="inline-block mb-4 px-4 py-2 bg-secondary border-2 border-ink-black font-mono text-sm text-primary"
            style={{ transform: 'rotate(1deg)', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
          >
            {'// skills'}
          </span>
          <h2 
            className="inline-block px-6 py-3 text-3xl font-bold text-foreground md:text-4xl bg-card border-2 border-ink-black"
            style={{ transform: 'rotate(-1deg)', boxShadow: '4px 4px 0 hsl(0 0% 0% / 0.3)' }}
          >
            Tech Stack<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Category Tabs - paper tabs */}
        <div 
          className={`mb-12 flex justify-center gap-4 flex-wrap transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 font-mono text-sm border-2 border-ink-black transition-all duration-200 paper-hover ${
                activeCategory === category
                  ? 'bg-primary text-ink-black'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
              style={{ 
                transform: `rotate(${(index - 1) * 2}deg)`,
                boxShadow: activeCategory === category 
                  ? '4px 4px 0 hsl(0 0% 0%)' 
                  : '3px 3px 0 hsl(0 0% 0% / 0.3)',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid - paper progress bars */}
        <div className="mx-auto max-w-3xl space-y-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group transition-all duration-500 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Skill label - paper tag */}
              <div className="mb-3 flex items-center justify-between">
                <span 
                  className="inline-block px-3 py-1 bg-card border-2 border-ink-black font-medium text-foreground"
                  style={{ 
                    transform: `rotate(${(index % 2 === 0 ? -1 : 1)}deg)`,
                    boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.3)',
                  }}
                >
                  {skill.name}
                </span>
                <span 
                  className="px-2 py-1 bg-primary border-2 border-ink-black font-mono text-sm text-ink-black"
                  style={{ transform: 'rotate(2deg)', boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.3)' }}
                >
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress Bar Container - paper strip */}
              <div 
                className="relative h-6 overflow-hidden bg-secondary border-2 border-ink-black"
                style={{ boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.2)' }}
              >
                {/* Progress Fill - colored paper */}
                <div
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-pink-soft transition-all duration-1000 ease-out ${
                    isVisible ? '' : 'w-0'
                  }`}
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  {/* Halftone overlay on progress */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, hsl(0 0% 0% / 0.4) 1px, transparent 1px)',
                      backgroundSize: '4px 4px',
                    }}
                  />
                </div>

                {/* Level markers */}
                <div className="absolute inset-0 flex">
                  {[25, 50, 75].map((marker) => (
                    <div
                      key={marker}
                      className="h-full w-0.5 bg-ink-black/30"
                      style={{ left: `${marker}%`, position: 'absolute' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Skills Summary - paper tags */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p 
            className="inline-block mb-6 px-4 py-2 bg-card border-2 border-ink-black text-sm text-muted-foreground"
            style={{ transform: 'rotate(-1deg)', boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.3)' }}
          >
            Also familiar with:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['GraphQL', 'Docker', 'AWS', 'MongoDB', 'Redux', 'Jest', 'Sass', 'Vue.js'].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-card border-2 border-ink-black font-mono text-xs text-muted-foreground transition-all duration-200 paper-hover"
                style={{ 
                  transform: `rotate(${(index % 2 === 0 ? -2 : 2)}deg)`,
                  boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.3)',
                }}
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
