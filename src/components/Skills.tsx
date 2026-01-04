import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
];

const categories = ['Frontend', 'Backend', 'Tools'];

const categoryIcons: Record<string, string> = {
  Frontend: '💻',
  Backend: '⚙️',
  Tools: '🛠️',
};

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

        {/* Category Tabs - Retro terminal style */}
        <div 
          className={`mb-12 flex justify-center gap-2 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 font-mono text-sm rounded-lg border transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]'
                  : 'bg-card/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid - Retro chip/tag style */}
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-4">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              >
                {/* Retro terminal-style skill chip */}
                <div className="relative px-6 py-3 rounded-lg border border-border bg-card/80 backdrop-blur-sm overflow-hidden group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]">
                  {/* Terminal prompt style */}
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-mono text-sm opacity-60 group-hover:opacity-100 transition-opacity">$</span>
                    <span className="font-mono text-foreground text-sm group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="w-2 h-4 bg-primary/60 animate-typing-cursor ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Skills Summary */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p className="mb-4 text-sm text-muted-foreground font-mono">// also familiar with:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['GraphQL', 'Docker', 'AWS', 'MongoDB', 'Redux', 'Jest', 'Sass', 'Vue.js'].map((tech, index) => (
              <span
                key={tech}
                className="rounded-full border border-border/60 bg-card/30 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground hover:bg-card/60"
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