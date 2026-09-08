import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
  logo: string; // URL to real logo
  invert?: boolean; // Whether to invert colors for visibility
}

const skills: Skill[] = [
  // Languages
  { name: 'Python', level: 80, category: 'Languages', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C', level: 80, category: 'Languages', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'JavaScript', level: 60, category: 'Languages', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', level: 50, category: 'Languages', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Java', level: 40, category: 'Languages', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  // Frontend
  { name: 'HTML', level: 85, category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', level: 85, category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', level: 70, category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Tailwind', level: 70, category: 'Frontend', logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
  { name: 'Next.js', level: 70, category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg', invert: true },
  { name: 'Vite', level: 70, category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  // Backend
  { name: 'Node.js', level: 70, category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', level: 70, category: 'Backend', logo: 'https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg', invert: true },
  { name: 'Flask', level: 65, category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', invert: true },
  { name: 'Docker', level: 50, category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  // Database
  { name: 'MySQL', level: 80, category: 'Database', logo: 'https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg' },
  { name: 'Supabase', level: 70, category: 'Database', logo: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg' },
  { name: 'MongoDB', level: 60, category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', level: 50, category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  // Cloud & Tools
  { name: 'GitHub', level: 75, category: 'Cloud & Tools', logo: 'https://www.vectorlogo.zone/logos/github/github-icon.svg', invert: true },
  { name: 'Git', level: 60, category: 'Cloud & Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'AWS', level: 50, category: 'Cloud & Tools', logo: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg' },
  { name: 'Google Cloud Platform', level: 60, category: 'Cloud & Tools', logo: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg' },
  { name: 'Figma', level: 50, category: 'Cloud & Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
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

        {/* Skills Grid with Floating Logos */}
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center">
          {/* Floating Logos - Left Side (Side on desktop, bottom row on mobile) */}
          <div className="order-2 w-full lg:order-1 lg:absolute lg:-left-4 lg:top-0 lg:bottom-0 lg:flex lg:w-20 lg:flex-col lg:items-center lg:justify-around lg:gap-8 lg:py-10 xl:-left-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + "-left"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center gap-6 lg:flex-col lg:gap-12"
              >
                {filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2)).map((skill, i) => (
                  <div
                    key={skill.name + "-logo-left"}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-card/50 p-2 shadow-lg transition-all hover:border-primary/50 hover:bg-card"
                    style={{ 
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name} 
                      className={`h-full w-full object-contain transition-transform group-hover:scale-125 ${skill.invert ? 'brightness-0 invert' : ''}`}
                    />
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100 lg:-left-2 lg:top-1/2 lg:-translate-x-full lg:-translate-y-1/2 lg:translate-y-0">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main Skills Content */}
          <div key={activeCategory} className="order-1 w-full max-w-2xl space-y-6 lg:order-2">
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
                      <div className="flex items-center gap-3">
                        <img 
                          src={skill.logo} 
                          alt={skill.name} 
                          className={`h-5 w-5 object-contain transition-transform group-hover:scale-110 ${skill.invert ? 'brightness-0 invert' : ''}`}
                        />
                        <span className="font-medium text-foreground">{skill.name}</span>
                      </div>
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

          {/* Floating Logos - Right Side (Side on desktop, bottom row on mobile) */}
          <div className="order-3 w-full lg:absolute lg:-right-4 lg:top-0 lg:bottom-0 lg:flex lg:w-20 lg:flex-col lg:items-center lg:justify-around lg:gap-8 lg:py-10 xl:-right-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + "-right"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center gap-6 lg:flex-col lg:gap-12"
              >
                {filteredSkills.slice(Math.ceil(filteredSkills.length / 2)).map((skill, i) => (
                  <div
                    key={skill.name + "-logo-right"}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-card/50 p-2 shadow-lg transition-all hover:border-primary/50 hover:bg-card"
                    style={{ 
                      animation: `float-slow ${4 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.7}s`
                    }}
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name} 
                      className={`h-full w-full object-contain transition-transform group-hover:scale-125 ${skill.invert ? 'brightness-0 invert' : ''}`}
                    />
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100 lg:-right-2 lg:top-1/2 lg:translate-x-full lg:-translate-y-1/2 lg:translate-y-0">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
