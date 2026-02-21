import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Coffee, Sparkles } from 'lucide-react';
import smrithiPhoto from '@/assets/smrithi-photo.jpg';
import DraggableAccessories from './DraggableAccessories';

const stats = [
  { icon: Code2, label: 'Years Coding', value: '3+' },
  { icon: Palette, label: 'Projects Built', value: '20+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
  { icon: Sparkles, label: 'Lines of Code', value: '50K+' },
];

const About = () => {
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
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// about me'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Who I Am<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo Side */}
          <div 
            className={`relative transition-all delay-200 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            {/* Wrapper with extra horizontal padding so stickers have room on sides */}
            <div className="relative mx-auto max-w-md px-12 sm:px-14 lg:mx-0 lg:ml-8">
              <div className="relative aspect-square">
                {/* Glow effect behind photo */}
                <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-primary/40 via-lavender/30 to-pink-soft/40 blur-2xl opacity-60 animate-pulse-glow" />
                
                {/* Draggable stickers around the image */}
                <DraggableAccessories />
                
                {/* Terminal-style photo frame */}
                <div className="absolute inset-0 rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/20">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-destructive/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    <span className="ml-4 font-mono text-xs text-muted-foreground">smrithi.jpg</span>
                  </div>
                  
                  {/* Photo container */}
                  <div className="relative h-[calc(100%-44px)] w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden rounded-b-xl">
                    <img 
                      src={smrithiPhoto} 
                      alt="Smrithi" 
                      className="h-full w-full object-cover object-top" 
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-lg border border-primary/30 opacity-50 pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-primary/10 blur-sm pointer-events-none" />
                
                {/* Code snippet decoration */}
                <div className="absolute -right-2 bottom-8 rounded-lg border border-border bg-card/90 px-3 py-2 font-mono text-xs text-muted-foreground backdrop-blur-sm z-30 pointer-events-none hidden sm:block">
                  <span className="text-pink-soft">import</span> Smrithi <span className="text-pink-soft">from</span> <span className="text-cyan-code">'./me'</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div 
            className={`flex flex-col justify-center transition-all delay-300 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group rounded-lg border border-border bg-card/50 p-4 text-center transition-all duration-300 hover:border-primary/50 hover:bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary transition-transform group-hover:scale-110" />
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
