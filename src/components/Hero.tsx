import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaperCutoutText from '@/components/PaperCutoutText';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Web Developer';

  useEffect(() => {
    // Delay typing to let name animation complete
    const startDelay = setTimeout(() => {
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
    }, 1200);

    return () => clearTimeout(startDelay);
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 paper-texture">
      {/* Spider-punk decorative paper scraps */}
      <div 
        className="absolute left-10 top-1/4 h-16 w-24 bg-primary/20 border-2 border-ink-black/30 opacity-40 stop-motion"
        style={{ transform: 'rotate(-12deg)', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.2)' }}
      />
      <div 
        className="absolute right-16 top-20 h-12 w-12 bg-paper-pink/30 border-2 border-ink-black/30 opacity-50 stop-motion"
        style={{ transform: 'rotate(8deg)', animationDelay: '0.1s', boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.2)' }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 h-20 w-16 bg-paper-cyan/20 border-2 border-ink-black/30 opacity-30 stop-motion"
        style={{ transform: 'rotate(-5deg)', animationDelay: '0.2s', boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.2)' }}
      />
      <div 
        className="absolute right-1/4 bottom-1/3 h-10 w-20 bg-paper-yellow/25 border-2 border-ink-black/30 opacity-40 stop-motion"
        style={{ transform: 'rotate(15deg)', animationDelay: '0.15s', boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.2)' }}
      />

      {/* Ink splatter decorations */}
      <div className="absolute left-20 bottom-20 text-4xl text-primary opacity-30 stop-motion">✦</div>
      <div className="absolute right-32 top-1/3 text-3xl text-pink-soft opacity-25 stop-motion" style={{ animationDelay: '0.1s' }}>✱</div>

      <div className="relative z-10 text-center">
        {/* Greeting - paper tag style */}
        <div 
          className="mb-6 inline-block opacity-0 animate-paper-drop"
          style={{ animationDelay: '0.1s' }}
        >
          <span 
            className="inline-block px-4 py-2 bg-card border-2 border-ink-black font-mono text-sm text-muted-foreground"
            style={{ 
              transform: 'rotate(-2deg)', 
              boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)',
            }}
          >
            {'// Hello, World! I\'m'}
          </span>
        </div>

        {/* Name - Paper cutout letters flying in */}
        <h1 className="mb-8 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <PaperCutoutText text="Smrithi" delay={300} />
          <span 
            className="inline-block ml-2 text-primary opacity-0 animate-fly-in-bottom"
            style={{ animationDelay: '1s' }}
          >
            .
          </span>
        </h1>

        {/* Typing effect - paper strip style */}
        <div 
          className="mb-10 flex items-center justify-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.4s' }}
        >
          <span 
            className="inline-block px-3 py-2 bg-secondary border-2 border-ink-black font-mono text-lg md:text-xl"
            style={{ 
              transform: 'rotate(1deg)', 
              boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.3)',
            }}
          >
            <span className="text-muted-foreground">{'<'}</span>
            <span className="text-primary">{typedText}</span>
            <span 
              className={`text-primary transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
            >
              |
            </span>
            <span className="text-muted-foreground">{'/>'}</span>
          </span>
        </div>

        {/* Description - torn paper style */}
        <div 
          className="mx-auto mb-12 max-w-lg opacity-0 animate-fade-in"
          style={{ animationDelay: '1.6s' }}
        >
          <p 
            className="px-6 py-4 bg-card/80 border-2 border-ink-black text-lg text-muted-foreground torn-edge"
            style={{ boxShadow: '4px 4px 0 hsl(0 0% 0% / 0.2)' }}
          >
            Crafting beautiful, functional digital experiences with clean code and thoughtful design.
          </p>
        </div>

        {/* Social Links - paper button style */}
        <div 
          className="mb-12 flex items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.8s' }}
        >
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub', rotate: '-2deg' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', rotate: '1deg' },
            { icon: Mail, href: 'mailto:hello@smrithi.dev', label: 'Email', rotate: '-1deg' },
          ].map(({ icon: Icon, href, label, rotate }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-card border-2 border-ink-black transition-all duration-200 paper-hover"
              style={{ 
                transform: `rotate(${rotate})`,
                boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.3)',
              }}
              aria-label={label}
            >
              <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </div>

        {/* CTA Button - comic book style */}
        <div 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '2s' }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden px-8 py-6 font-mono text-ink-black bg-primary border-3 border-ink-black comic-border transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            style={{ 
              boxShadow: '4px 4px 0 hsl(0 0% 0%)',
            }}
            onClick={() => scrollToSection('#projects')}
          >
            <span className="relative z-10">view_projects()</span>
          </Button>
        </div>
      </div>

      {/* Scroll indicator - paper arrow */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-3 bg-card border-2 border-ink-black opacity-0 animate-fade-in stop-motion"
        style={{ 
          animationDelay: '2.2s',
          transform: 'translateX(-50%) rotate(2deg)',
          boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.3)',
        }}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </button>
    </section>
  );
};

export default Hero;
