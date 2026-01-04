import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Coffee, Sparkles } from 'lucide-react';
import smrithiPhoto from '@/assets/smrithi-photo.jpg';
import DraggableAccessories from './DraggableAccessories';
import { useMouseParallax } from '@/hooks/useScrollAnimation';

const stats = [
  { icon: Code2, label: 'Years Coding', value: '3+' },
  { icon: Palette, label: 'Projects Built', value: '20+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
  { icon: Sparkles, label: 'Lines of Code', value: '50K+' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseParallax = useMouseParallax(0.01);

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
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div 
        className="absolute -left-20 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * 2}px, ${mouseParallax.y * 2}px)` }}
      />
      <div 
        className="absolute -right-20 bottom-1/4 h-[250px] w-[250px] rounded-full bg-lavender/5 blur-[80px] pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x * -2}px, ${mouseParallax.y * -2}px)` }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// about me'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Who I Am<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo Side */}
          <div 
            className={`relative transition-all delay-200 duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
          >
            <div 
              className="relative aspect-square max-w-md mx-auto lg:mx-0 lg:ml-16"
              style={{ transform: `translate(${mouseParallax.x * 0.5}px, ${mouseParallax.y * 0.5}px)` }}
            >
              {/* Glow effect behind photo */}
              <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-primary/40 via-lavender/30 to-pink-soft/40 blur-2xl opacity-60 animate-pulse-glow" />
              
              {/* Draggable stickers around terminal */}
              <DraggableAccessories />
              
              {/* Terminal-style photo frame with enhanced glass effect */}
              <div className="absolute inset-0 rounded-xl glass-card-strong overflow-hidden shadow-2xl shadow-primary/20">
                {/* Window controls */}
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3 bg-card/30">
                  <div className="h-3 w-3 rounded-full bg-destructive/60 shadow-lg shadow-destructive/20" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60 shadow-lg shadow-yellow-500/20" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60 shadow-lg shadow-green-500/20" />
                  <span className="ml-4 font-mono text-xs text-muted-foreground">smrithi.jpg</span>
                </div>
                
                {/* Photo container */}
                <div className="relative h-[calc(100%-44px)] w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden rounded-b-xl">
                  <img 
                    src={smrithiPhoto} 
                    alt="Smrithi" 
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105" 
                  />
                  {/* Subtle scan line effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--foreground))_2px,hsl(var(--foreground))_4px)]" />
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 shimmer pointer-events-none" />
                </div>
              </div>

              {/* Decorative elements with parallax */}
              <div 
                className="absolute -right-4 -top-4 h-24 w-24 rounded-lg border border-primary/30 opacity-50 pointer-events-none"
                style={{ transform: `translate(${mouseParallax.x * 2}px, ${mouseParallax.y * 2}px)` }}
              />
              <div 
                className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-primary/20 blur-sm pointer-events-none animate-float-gentle"
                style={{ transform: `translate(${mouseParallax.x * -2}px, ${mouseParallax.y * -2}px)` }}
              />
              
              {/* Code snippet decoration with glass effect */}
              <div 
                className="absolute -right-2 bottom-8 glass-card-strong rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground z-30 pointer-events-none"
                style={{ transform: `translate(${mouseParallax.x * 1.5}px, ${mouseParallax.y * 1.5}px)` }}
              >
                <span className="text-pink-soft">import</span> Smrithi <span className="text-pink-soft">from</span> <span className="text-cyan-code">'./me'</span>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div 
            className={`flex flex-col justify-center transition-all delay-300 duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
          >
            <h3 className="mb-4 text-2xl font-semibold text-foreground">
              Passionate about building for the web
            </h3>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              I'm a web developer who loves turning ideas into reality through code. 
              With a focus on creating clean, efficient, and user-friendly applications, 
              I blend technical skills with creative problem-solving.
            </p>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open source, or enjoying a good cup of coffee while 
              brainstorming my next project. I believe in writing code that not only 
              works but is also maintainable and scalable.
            </p>

            {/* Stats with enhanced glass effect */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group glass-card rounded-lg p-4 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary transition-transform group-hover:scale-125 group-hover:rotate-12" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="font-mono text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
