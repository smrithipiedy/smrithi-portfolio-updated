import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

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
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
              className={`group relative overflow-hidden rounded-xl border border-border bg-card/80 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project image placeholder */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-secondary to-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Folder className="h-16 w-16 text-primary/20" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary p-3 text-primary-foreground transition-transform hover:scale-110"
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
                      className="rounded-full border border-border bg-card p-3 text-foreground transition-transform hover:scale-110"
                      aria-label="View source code"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="mb-6 text-center text-lg font-medium text-muted-foreground">
            Other Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className="group rounded-lg border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Folder className="h-6 w-6 text-primary" />
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
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
                        className="text-muted-foreground transition-colors hover:text-primary"
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
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
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
