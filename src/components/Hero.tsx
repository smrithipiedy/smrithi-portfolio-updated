import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMouseParallax } from '@/hooks/useScrollAnimation';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Web Developer';
  const mouseParallax = useMouseParallax(0.02);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Decorative elements with parallax */}
      <div 
        className="absolute left-10 top-1/4 h-20 w-20 animate-float rounded-lg border border-primary/20 opacity-30"
        style={{ transform: `translate(${mouseParallax.x * 2}px, ${mouseParallax.y * 2}px)` }}
      />
      <div 
        className="absolute right-1/4 top-20 h-3 w-3 animate-pulse rounded-full bg-primary"
        style={{ transform: `translate(${mouseParallax.x * -3}px, ${mouseParallax.y * -3}px)` }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 h-16 w-16 animate-float-slow opacity-20"
        style={{ 
          animationDelay: '1s',
          transform: `translate(${mouseParallax.x * 4}px, ${mouseParallax.y * 4}px)`,
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
          <polygon 
            points="50,10 90,90 10,90" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>
      <div 
        className="absolute right-20 top-1/3 h-8 w-8 animate-float rounded-full border-2 border-pink-soft/30 opacity-40"
        style={{ transform: `translate(${mouseParallax.x * -2}px, ${mouseParallax.y * -2}px)` }}
      />
      
      {/* Additional floating glass elements */}
      <div 
        className="absolute left-[15%] top-[60%] h-24 w-24 rounded-xl glass-card opacity-20 animate-float-gentle"
        style={{ 
          animationDelay: '2s',
          transform: `translate(${mouseParallax.x * 3}px, ${mouseParallax.y * 3}px) rotate(15deg)`,
        }}
      />
      <div 
        className="absolute right-[10%] bottom-[40%] h-16 w-16 rounded-full glass-card opacity-15 animate-float-rotate"
        style={{ transform: `translate(${mouseParallax.x * -4}px, ${mouseParallax.y * -4}px)` }}
      />

      <div 
        className="relative z-10 text-center"
        style={{ transform: `translate(${mouseParallax.x * 0.5}px, ${mouseParallax.y * 0.5}px)` }}
      >
        {/* Greeting */}
        <p 
          className="mb-4 font-mono text-sm text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {'// Hello, World! I\'m'}
        </p>

        {/* Name with glow */}
        <h1 
          className="mb-6 text-5xl font-bold tracking-tight text-foreground opacity-0 animate-fade-in md:text-7xl"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="relative">
            Smrithi
            <span className="absolute -inset-1 -z-10 blur-2xl opacity-30 bg-gradient-to-r from-primary to-lavender" />
          </span>
          <span className="text-primary">.</span>
        </h1>

        {/* Typing effect in glass container */}
        <div 
          className="mb-8 flex items-center justify-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="glass-card px-6 py-3 rounded-full">
            <span className="font-mono text-xl text-muted-foreground md:text-2xl">{'<'}</span>
            <span className="text-xl text-primary md:text-2xl">{typedText}</span>
            <span 
              className={`text-xl text-primary md:text-2xl transition-opacity ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            >
              |
            </span>
            <span className="font-mono text-xl text-muted-foreground md:text-2xl">{'/>'}</span>
          </div>
        </div>

        {/* Description */}
        <p 
          className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          Crafting beautiful, functional digital experiences with clean code and thoughtful design.
        </p>

        {/* Social Links with glass effect */}
        <div 
          className="mb-12 flex items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          {[
            { Icon: Github, href: 'https://github.com', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { Icon: Mail, href: 'mailto:hello@smrithi.dev', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group glass-card-strong rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
              aria-label={label}
            >
              <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s' }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary px-8 py-6 font-mono text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
            onClick={() => scrollToSection('#projects')}
          >
            <span className="relative z-10">view_projects()</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator with glass effect */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 glass-card rounded-full px-4 py-3 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20 group"
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center gap-1">
          <MousePointer className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce group-hover:text-primary transition-colors" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
