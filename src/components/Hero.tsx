import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Web Developer';

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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 crt-scanlines vhs-noise">
      {/* Decorative elements */}
      <div className="absolute left-10 top-1/4 h-20 w-20 animate-float rounded-lg border-2 border-primary/30 opacity-40" style={{ boxShadow: '3px 3px 0 hsl(var(--primary) / 0.2)' }} />
      <div className="absolute right-1/4 top-20 h-3 w-3 animate-pulse rounded-full bg-primary" style={{ boxShadow: '0 0 10px hsl(var(--primary))' }} />
      <div 
        className="absolute bottom-1/4 left-1/3 h-16 w-16 animate-float-slow opacity-30"
        style={{ animationDelay: '1s' }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full text-cyan-code">
          <polygon 
            points="50,10 90,90 10,90" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="absolute right-20 top-1/3 h-8 w-8 animate-float rounded-full border-2 border-pink-soft/40 opacity-50" />
      
      {/* Retro grid lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 text-center">
        {/* Greeting */}
        <p 
          className="mb-4 font-mono text-sm text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {'// Hello, World! I\'m'}
        </p>

        {/* Name with retro glow */}
        <h1 
          className="mb-6 text-5xl font-bold tracking-tight text-foreground opacity-0 animate-fade-in md:text-7xl"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="glow-text">Smrithi</span><span className="text-primary glow-text">.</span>
        </h1>

        {/* Typing effect with retro styling */}
        <div 
          className="mb-8 flex items-center justify-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <span className="font-mono text-xl text-muted-foreground md:text-2xl">{'<'}</span>
          <span className="text-xl text-primary md:text-2xl glow-neon font-retro text-2xl md:text-3xl">{typedText}</span>
          <span 
            className={`text-xl text-primary md:text-2xl transition-opacity ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          >
            _
          </span>
          <span className="font-mono text-xl text-muted-foreground md:text-2xl">{'/>'}</span>
        </div>

        {/* Description */}
        <p 
          className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          Crafting beautiful, functional digital experiences with clean code and thoughtful design.
        </p>

        {/* Social Links */}
        <div 
          className="mb-12 flex items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border-2 border-border bg-card/50 p-3 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ boxShadow: '2px 2px 0 hsl(var(--border))' }}
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border-2 border-border bg-card/50 p-3 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ boxShadow: '2px 2px 0 hsl(var(--border))' }}
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a
            href="mailto:hello@smrithi.dev"
            className="group rounded-lg border-2 border-border bg-card/50 p-3 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ boxShadow: '2px 2px 0 hsl(var(--border))' }}
            aria-label="Email"
          >
            <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
        </div>

        {/* CTA Button */}
        <div 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s' }}
        >
          <Button
            size="lg"
            className="retro-button group relative overflow-hidden px-8 py-6 font-mono"
            onClick={() => scrollToSection('#projects')}
          >
            <span className="relative z-10">view_projects()</span>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Hero;
