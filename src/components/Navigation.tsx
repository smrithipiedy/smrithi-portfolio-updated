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
      <div className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-6 py-3 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'border-primary/30 bg-card/70 shadow-lg shadow-primary/10'
          : 'border-border/60 bg-card/50'
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
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed left-4 right-4 top-20 z-50 rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl shadow-xl shadow-primary/10 transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-4'
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full rounded-xl px-4 py-3 text-left text-lg font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-2 border-t border-border/50 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-primary/50 bg-primary/10 text-foreground hover:border-primary hover:bg-primary/20 hover:text-foreground"
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
