import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300"
    >
      <div className={`flex w-full max-w-5xl items-center justify-between rounded-2xl border border-border/40 px-6 py-3 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'bg-background/60 shadow-lg shadow-primary/5'
          : 'bg-background/40'
      }`}>
        {/* Logo with retro style */}
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-semibold text-foreground transition-colors hover:text-primary"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Terminal className="h-5 w-5 text-primary" style={{ filter: 'drop-shadow(0 0 4px hsl(var(--primary)))' }} />
          <span className="font-mono">smrithi</span>
          <span className="text-primary animate-flicker">_</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <Button
            variant="outline"
            className="border-primary/50 bg-primary/10 text-foreground hover:border-primary hover:bg-primary/20 hover:text-foreground"
            onClick={() => handleNavClick('#contact')}
          >
            <span className="font-mono text-sm">say_hello()</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative z-50 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background transition-all duration-300 md:hidden ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-medium text-foreground transition-all hover:text-primary"
                style={{
                  animation: isOpen
                    ? `fade-in-up 0.3s ease forwards ${index * 0.1}s`
                    : 'none',
                  opacity: isOpen ? 0 : 1,
                }}
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="lg"
              className="mt-4 border-primary/50 bg-primary/10 text-foreground hover:border-primary hover:bg-primary/20 hover:text-foreground"
              onClick={() => handleNavClick('#contact')}
            >
              <span className="font-mono">say_hello()</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
