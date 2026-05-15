import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder, ArrowUpRight } from 'lucide-react';

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
    title: 'BallotIQ',
    description: "An adaptive AI election education platform helping users understand their country's election process through personalized modules and quizzes.",
    tags: ['Next.js', 'Firebase', 'Gemini AI', 'GCP'],
    image: '/projects/ballotiq.png',
    liveUrl: 'https://ballotiq-61721852903.us-central1.run.app/',
    githubUrl: 'https://github.com/smrithipiedy/BallotIQ',
    featured: true,
  },
  {
    id: 2,
    title: 'Learning Management System',
    description: 'A full-stack LMS featuring role-based access control, course management, automated PDF certifications, and detailed analytics.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    image: '/projects/lms.png',
    githubUrl: 'https://github.com/smrithipiedy/Learning-Management-System_LMS',
    featured: true,
  },
  {
    id: 3,
    title: 'BharatVani (Frontend)',
    description: 'Multilingual AI voice interface for India, bridging the digital divide with toll-free access to government services via simple phone calls.',
    tags: ['React', 'AWS', 'AI Voice', 'TypeScript'],
    image: '/projects/bharatvani.png',
    liveUrl: 'https://bharatvani.vercel.app/',
    githubUrl: 'https://github.com/smrithipiedy/BharatVani-Frontend',
    featured: true,
  },
  {
    id: 9,
    title: 'Agile Management Dashboard',
    description: 'Workflow streamlining tool with sprint tracking, multi-role auth, and MFA for secure collaboration.',
    tags: ['Python', 'Flask', 'SQLAlchemy'],
    githubUrl: 'https://github.com/smrithipiedy/Agile-Management-Dashboard',
    featured: false,
  },
  {
    id: 4,
    title: 'CrowdSense',
    description: 'Safety platform for live events, turning static floor plans into dynamic spatial dashboards using Google Gemini AI and Google Maps.',
    tags: ['Gemini AI', 'Google Maps', 'React'],
    githubUrl: 'https://github.com/smrithipiedy/CrowdSense',
    featured: false,
  },
  {
    id: 5,
    title: 'Questify',
    description: 'Gamified 8-bit style Task Tracker/Focus Timer web app where tasks become quests with rewards and collectibles.',
    tags: ['React', 'Gamification', 'Tailwind'],
    githubUrl: 'https://github.com/smrithipiedy/Questify',
    featured: false,
  },
  {
    id: 6,
    title: 'TwinSync',
    description: 'Healthcare solution for professionals providing timely reminders for physical and mental health maintenance.',
    tags: ['React', 'Health-Tech', 'Node.js'],
    githubUrl: 'https://github.com/smrithipiedy/TwinSync',
    featured: false,
  },
  {
    id: 7,
    title: 'CropKind',
    description: 'Farming support agentic AI tool providing intelligent agricultural assistance and crop management.',
    tags: ['AI', 'Agriculture', 'Agentic AI'],
    githubUrl: 'https://github.com/smrithipiedy/CropKind',
    featured: false,
  },
  {
    id: 8,
    title: 'Cineboxd',
    description: 'Letterboxd clone offering movie watchlists, reviews, and notes for cinephiles using TMDB API.',
    tags: ['Next.js', 'TMDB API', 'CSS'],
    githubUrl: 'https://github.com/smrithipiedy/Cineboxd',
    featured: false,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            What I've Built<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Featured Projects */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card/80 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-lavender to-pink-soft opacity-0 transition-opacity duration-500 ${hoveredProject === project.id ? 'opacity-100' : ''
                }`} style={{ padding: '1px' }}>
                <div className="h-full w-full rounded-xl bg-card" />
              </div>

              {/* Card content */}
              <div className="relative z-10">
                {/* Project image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-secondary to-card">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={`h-full w-full object-cover transition-transform duration-700 ${
                        hoveredProject === project.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Folder className={`h-16 w-16 transition-all duration-500 ${hoveredProject === project.id ? 'text-primary scale-110 rotate-6' : 'text-primary/20'
                        }`} />
                    </div>
                  )}

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
                    <h3 className={`mb-2 text-lg font-semibold transition-colors duration-300 ${hoveredProject === project.id ? 'text-primary' : 'text-foreground'
                      }`}>
                      {project.title}
                    </h3>
                    <ArrowUpRight className={`h-5 w-5 transition-all duration-300 ${hoveredProject === project.id ? 'text-primary translate-x-0.5 -translate-y-0.5' : 'text-muted-foreground'
                      }`} />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 font-mono text-xs transition-all duration-300 ${hoveredProject === project.id
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
              <div className={`absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-primary/10 blur-xl transition-all duration-500 ${hoveredProject === project.id ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                }`} />
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="mb-6 text-center text-lg font-medium text-muted-foreground">
            Other Noteworthy Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative rounded-lg border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
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
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
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
                  <div className="flex flex-wrap gap-1">
                    <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary/70">
                      {project.tags.slice(0, 3).join(', ')}
                    </span>
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
