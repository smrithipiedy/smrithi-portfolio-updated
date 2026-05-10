import { useEffect, useRef, useState } from 'react';
import { Trophy, Award, Star, GitMerge, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  description: string;
  organization: string;
  date: string;
  icon: any;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Open Source Contributor',
    description: 'Merged 9+ PRs across Social Winter of Code (2025 & 2026), GSSoC 2025, and OSGC 2026 contributing to various global projects.',
    organization: 'SWOC, OSGC, GSSoC',
    date: '2025 - 2026',
    icon: GitMerge,
    color: 'from-primary to-lavender-glow',
  },
  {
    id: 2,
    title: 'Hackathon Winner',
    description: 'First place winner at Sparkathon (Intra-college Hackathon). Developed an innovative solution under 24 hours focusing on college-wide problems.',
    organization: 'MNM Jain Engineering College',
    date: 'Feb 2026',
    icon: Trophy,
    color: 'from-primary to-pink-soft',
  },
  {
    id: 5,
    title: 'Winner - Vibe Coding Fest',
    description: 'Winner at GDG Chennai Vibe Coding Fest. Built Questify, a gamified 8-bit style to-do app using AI tools.',
    organization: 'GDG Chennai',
    date: 'May 2025',
    icon: Trophy,
    color: 'from-primary to-lavender-glow',
  },
  {
    id: 3,
    title: 'Finalist at HackFinity Hackathon',
    description: '24-hour Agentic AI Hackathon. Built an AI-powered agentic tool for agriculture support.',
    organization: 'SIMATS Engineering College',
    date: 'Jul 2025',
    icon: Star,
    color: 'from-primary to-lavender-glow',
  },
  {
    id: 4,
    title: 'Finalist at VOID.v1 Hackathon',
    description: '24-hour Hackathon. Competed among top teams to develop a secure and scalable digital solution.',
    organization: 'VIT Chennai',
    date: 'Oct 2025',
    icon: Award,
    color: 'from-primary to-pink-soft',
  },
];

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="achievements"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// achievements'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Milestones & Wins<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
            >
              {/* Card Background with glass effect */}
              <div className="h-full rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/60">
                {/* Accent line */}
                <div className={`absolute left-0 top-0 h-1 w-0 bg-gradient-to-r ${achievement.color} transition-all duration-500 group-hover:w-full rounded-t-2xl`} />

                {/* Icon Circle */}
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg shadow-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <achievement.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{achievement.date}</span>
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${achievement.color} animate-pulse`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="font-medium text-sm text-primary/80">
                    {achievement.organization}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Decoration */}
                <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-primary/5 blur-xl transition-all duration-500 group-hover:bg-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
