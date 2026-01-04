import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder, ArrowUpRight } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useScrollAnimation';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with cart functionality, payment integration, and admin dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity app with drag-and-drop kanban boards, real-time updates, and team collaboration features.',
    tags: ['TypeScript', 'Next.js', 'Prisma'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather app with location-based forecasts, interactive maps, and data visualization.',
    tags: ['React', 'API', 'Chart.js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Portfolio Generator',
    description: 'A tool that generates customizable portfolio websites from simple configuration files.',
    tags: ['TypeScript', 'CLI', 'Templates'],
    githubUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'Markdown-based blogging platform with SEO optimization and analytics integration.',
    tags: ['Next.js', 'MDX', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'URL Shortener',
    description: 'Simple URL shortening service with analytics and custom link creation.',
    tags: ['Node.js', 'Redis', 'API'],
    githubUrl: '#',
    featured: false,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div 
        className="absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * -3}px, ${mouseParallax.y * -3}px)` }}
      />
      <div 
        className="absolute -left-20 bottom-1/3 h-[300px] w-[300px] rounded-full bg-lavender/5 blur-[100px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * 2}px, ${mouseParallax.y * 2}px)` }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// projects'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            What I've Built<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Featured Projects */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl glass-panel transition-all duration-700 hover:scale-[1.02] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-lavender to-pink-soft opacity-0 transition-opacity duration-500 ${
                hoveredProject === project.id ? 'opacity-100' : ''
              }`} style={{ padding: '1px' }}>
                <div className="h-full w-full rounded-xl bg-card" />
              </div>
              
              {/* Card content */}
              <div className="relative z-10">
                {/* Project image placeholder */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-secondary to-card">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Folder className={`h-16 w-16 transition-all duration-500 ${
                      hoveredProject === project.id ? 'text-primary scale-110 rotate-6' : 'text-primary/20'
                    }`} />
                  </div>
                  {/* Floating orbs on hover */}
                  <div className={`absolute top-4 right-4 h-8 w-8 rounded-full bg-primary/30 blur-lg transition-all duration-700 ${
                    hoveredProject === project.id ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
                  }`} />
                  <div className={`absolute bottom-4 left-4 h-6 w-6 rounded-full bg-lavender/40 blur-md transition-all duration-500 delay-100 ${
                    hoveredProject === project.id ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
                  }`} />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-primary p-3 text-primary-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
                        aria-label="View live site"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-border bg-card p-3 text-foreground transition-all hover:scale-110 hover:border-primary hover:shadow-lg"
                        aria-label="View source code"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className={`mb-2 text-lg font-semibold transition-colors duration-300 ${
                      hoveredProject === project.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {project.title}
                    </h3>
                    <ArrowUpRight className={`h-5 w-5 transition-all duration-300 ${
                      hoveredProject === project.id ? 'text-primary translate-x-0.5 -translate-y-0.5' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 font-mono text-xs transition-all duration-300 ${
                          hoveredProject === project.id 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-secondary text-muted-foreground'
                        }`}
                        style={{ transitionDelay: `${tagIndex * 50}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className={`absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-primary/10 blur-xl transition-all duration-500 ${
                hoveredProject === project.id ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
              }`} />
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h3 className="mb-6 text-center text-lg font-medium text-muted-foreground">
            Other Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative glass-card rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
                style={{ transitionDelay: `${700 + index * 150}ms` }}
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-lavender/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <Folder className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
                          aria-label="View source code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
                          aria-label="View live site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h4>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
