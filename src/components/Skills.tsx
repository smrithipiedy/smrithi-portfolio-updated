import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 90, category: 'Languages' },
  { name: 'C', level: 90, category: 'Languages' },
  { name: 'JavaScript', level: 80, category: 'Languages' },
  { name: 'TypeScript', level: 70, category: 'Languages' },
  { name: 'Java', level: 65, category: 'Languages' },
  // Frontend
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS', level: 95, category: 'Frontend' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Tailwind', level: 88, category: 'Frontend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  { name: 'Vite', level: 80, category: 'Frontend' },
  // Backend
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Express.js', level: 80, category: 'Backend' },
  { name: 'Flask', level: 75, category: 'Backend' },
  { name: 'Docker', level: 50, category: 'Backend' },
  // Database
  { name: 'MySQL', level: 90, category: 'Database' },
  { name: 'Supabase', level: 80, category: 'Database' },
  { name: 'MongoDB', level: 70, category: 'Database' },
  { name: 'PostgreSQL', level: 50, category: 'Database' },
  // Cloud & Tools
  { name: 'GitHub', level: 85, category: 'Cloud & Tools' },
  { name: 'Git', level: 60, category: 'Cloud & Tools' },
  { name: 'AWS', level: 50, category: 'Cloud & Tools' },
  { name: 'Google Cloud Platform', level: 70, category: 'Cloud & Tools' },
  { name: 'Figma', level: 60, category: 'Cloud & Tools' },
  { name: 'Framer', level: 50, category: 'Cloud & Tools' },
  { name: 'Power BI', level: 65, category: 'Cloud & Tools' },
];

const categories = ['Languages', 'Frontend', 'Backend', 'Database', 'Cloud & Tools'];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Languages');

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
        {/* Section Header - UNIFORM SIZE */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// skills'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Tech Stack<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div
          className={`mb-12 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2 font-mono text-sm transition-all duration-300 ${activeCategory === category
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {category}
              {activeCategory === category && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div key={activeCategory} className="mx-auto max-w-3xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="font-mono text-sm text-primary">{skill.level}%</span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
                    {/* Progress Fill */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isVisible ? `${skill.level}%` : 0 }}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-pink-soft"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                        style={{
                          animation: 'shimmer 2s linear infinite',
                          backgroundSize: '200% 100%',
                        }}
                      />
                    </motion.div>

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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
