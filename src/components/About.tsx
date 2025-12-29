import { useEffect, useRef, useState } from 'react';
import { Code2, Palette, Coffee, Sparkles } from 'lucide-react';

const stats = [
  { icon: Code2, label: 'Years Coding', value: '3+', rotate: '-2deg' },
  { icon: Palette, label: 'Projects Built', value: '20+', rotate: '1deg' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞', rotate: '-1deg' },
  { icon: Sparkles, label: 'Lines of Code', value: '50K+', rotate: '2deg' },
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
      className="relative py-24 md:py-32 paper-texture"
    >
      {/* Spider-punk decorative elements */}
      <div 
        className="absolute top-10 right-20 h-12 w-16 bg-paper-pink/20 border-2 border-ink-black/20 opacity-30 stop-motion"
        style={{ transform: 'rotate(8deg)' }}
      />
      <div 
        className="absolute bottom-20 left-16 h-10 w-14 bg-paper-cyan/20 border-2 border-ink-black/20 opacity-25 stop-motion"
        style={{ transform: 'rotate(-6deg)', animationDelay: '0.1s' }}
      />

      <div className="container mx-auto px-6">
        {/* Section Header - paper label style */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span 
            className="inline-block mb-4 px-4 py-2 bg-secondary border-2 border-ink-black font-mono text-sm text-primary"
            style={{ transform: 'rotate(-1deg)', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
          >
            {'// about me'}
          </span>
          <h2 
            className="inline-block px-6 py-3 text-3xl font-bold text-foreground md:text-4xl bg-card border-2 border-ink-black"
            style={{ transform: 'rotate(1deg)', boxShadow: '4px 4px 0 hsl(0 0% 0% / 0.3)' }}
          >
            Who I Am<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo Side */}
          <div 
            className={`relative transition-all delay-200 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Paper cutout photo frame */}
              <div 
                className="absolute inset-0 bg-card border-3 border-ink-black overflow-hidden paper-hover"
                style={{ 
                  transform: 'rotate(-2deg)', 
                  boxShadow: '6px 6px 0 hsl(0 0% 0% / 0.4)',
                }}
              >
                {/* Paper tape decoration */}
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-paper-yellow/80 border border-ink-black/30"
                  style={{ transform: 'rotate(2deg)' }}
                />
                
                {/* Photo placeholder */}
                <div className="relative h-full w-full bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      className="mx-auto mb-4 h-24 w-24 bg-secondary border-2 border-ink-black flex items-center justify-center"
                      style={{ transform: 'rotate(3deg)', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
                    >
                      <span className="font-mono text-4xl text-primary">S</span>
                    </div>
                    <p 
                      className="inline-block px-3 py-1 bg-card border border-ink-black font-mono text-sm text-muted-foreground"
                      style={{ transform: 'rotate(-1deg)' }}
                    >
                      your photo here
                    </p>
                  </div>
                  
                  {/* Halftone overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, hsl(0 0% 0% / 0.3) 1px, transparent 1px)',
                      backgroundSize: '6px 6px',
                    }}
                  />
                </div>
              </div>

              {/* Decorative paper scraps */}
              <div 
                className="absolute -right-4 -top-4 h-16 w-20 bg-paper-pink/30 border-2 border-ink-black/40 opacity-60 stop-motion"
                style={{ transform: 'rotate(12deg)', boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.2)' }}
              />
              <div 
                className="absolute -bottom-6 -left-6 h-14 w-14 bg-paper-cyan/40 border-2 border-ink-black/40 opacity-50 stop-motion"
                style={{ transform: 'rotate(-8deg)', animationDelay: '0.1s', boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.2)' }}
              />
              
              {/* Code snippet decoration - paper note */}
              <div 
                className="absolute -right-2 bottom-8 px-4 py-2 bg-card border-2 border-ink-black font-mono text-xs text-muted-foreground paper-hover"
                style={{ transform: 'rotate(3deg)', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
              >
                <span className="text-pink-soft">import</span> Smrithi <span className="text-pink-soft">from</span> <span className="text-cyan-code">'./me'</span>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div 
            className={`flex flex-col justify-center transition-all delay-300 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            <h3 
              className="inline-block self-start mb-6 px-4 py-2 text-2xl font-semibold text-foreground bg-card border-2 border-ink-black"
              style={{ transform: 'rotate(-1deg)', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)' }}
            >
              Passionate about building for the web
            </h3>
            
            <div 
              className="mb-6 p-4 bg-card/80 border-2 border-ink-black torn-edge"
              style={{ boxShadow: '4px 4px 0 hsl(0 0% 0% / 0.2)' }}
            >
              <p className="text-muted-foreground leading-relaxed">
                I'm a web developer who loves turning ideas into reality through code. 
                With a focus on creating clean, efficient, and user-friendly applications, 
                I blend technical skills with creative problem-solving.
              </p>
            </div>
            
            <div 
              className="mb-8 p-4 bg-card/80 border-2 border-ink-black"
              style={{ transform: 'rotate(0.5deg)', boxShadow: '4px 4px 0 hsl(0 0% 0% / 0.2)' }}
            >
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source, or enjoying a good cup of coffee while 
                brainstorming my next project.
              </p>
            </div>

            {/* Stats - paper cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group p-4 text-center bg-card border-2 border-ink-black transition-all duration-200 paper-hover"
                  style={{ 
                    transform: `rotate(${stat.rotate})`,
                    boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)',
                    animationDelay: `${index * 0.1}s`,
                  }}
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
