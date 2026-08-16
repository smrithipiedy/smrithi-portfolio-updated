import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const sentences = [
    'Full Stack Software Developer',
    'Agentic AI and Gen AI Enthusiast',
    'Aspiring AI Engineer'
  ];

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (typedText === currentSentence) {
          // Finished typing, wait 2 seconds then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(2000);
        } else {
          setTypedText(currentSentence.slice(0, typedText.length + 1));
          setTypingSpeed(100);
        }
      } else {
        // Deleting
        if (typedText === '') {
          // Finished deleting, move to next sentence
          setIsDeleting(false);
          setSentenceIndex((prev) => (prev + 1) % sentences.length);
          setTypingSpeed(100);
        } else {
          setTypedText(currentSentence.slice(0, typedText.length - 1));
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, sentenceIndex, typingSpeed]);

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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Decorative elements */}
      <div className="absolute left-10 top-1/4 h-20 w-20 animate-float rounded-lg border border-primary/20 opacity-20" />
      <div className="absolute right-1/4 top-20 h-3 w-3 animate-pulse rounded-full bg-primary/50" />
      <div 
        className="absolute bottom-1/4 left-1/3 h-16 w-16 animate-float-slow opacity-20"
        style={{ animationDelay: '1s' }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full text-primary/30">
          <polygon 
            points="50,10 90,90 10,90" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute right-20 top-1/3 h-8 w-8 animate-float rounded-full border border-primary/20 opacity-30" />

      <div className="relative z-10 text-center">
        {/* Greeting */}
        <p 
          className="mb-4 font-mono text-sm text-muted-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {'// Hello, World! I\'m'}
        </p>

        {/* Name */}
        <h1 
          className="mb-6 text-5xl font-bold tracking-tight text-foreground opacity-0 animate-fade-in md:text-7xl"
          style={{ animationDelay: '0.4s' }}
        >
          Smrithi<span className="text-primary">.</span>
        </h1>

        {/* Typing effect */}
        <div 
          className="mb-8 flex items-center justify-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <span className="font-mono text-xl text-muted-foreground md:text-2xl">{'<'}</span>
          <span className="text-xl text-primary md:text-2xl">{typedText}<span className={`transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span></span>
          <span className="font-mono text-xl text-muted-foreground md:text-2xl">{'/>'}</span>
        </div>

        {/* Description */}
        <p 
          className="mx-auto mb-10 max-w-2xl text-center text-lg text-foreground/90 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          CS student by day, breaking things and fixing them by night.<br />
          Turning caffeine and curiosity into full stack applications.
        </p>

        {/* Social Links */}
        <div 
          className="mb-12 flex items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          <a
            href="https://github.com/smrithipiedy"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-border bg-card/50 p-3 transition-all hover:border-primary hover:bg-card"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a
            href="https://linkedin.com/in/smrithipiedy"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-border bg-card/50 p-3 transition-all hover:border-primary hover:bg-card"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a
            href="mailto:smrithipiedy49@gmail.com"
            className="group rounded-lg border border-border bg-card/50 p-3 transition-all hover:border-primary hover:bg-card"
            aria-label="Email"
          >
            <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
        </div>

        {/* CTA Buttons */}
        <div 
          className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s' }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden px-8 py-6 font-mono"
            onClick={() => scrollToSection('#projects')}
          >
            <span className="relative z-10">view_projects()</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden px-8 py-6 font-mono border-primary text-primary hover:bg-primary/10"
            onClick={() => window.open('https://drive.google.com/file/d/16JAGVUBugmz6P2_V-wlFwe89fUcw4OQO/view?usp=sharing', '_blank')}
          >
            <span className="relative z-10">view_resume()</span>
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
