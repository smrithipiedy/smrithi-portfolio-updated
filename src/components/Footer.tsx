import { Terminal, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm">smrithi_</span>
          </a>

          {/* Copyright */}
          <p className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-primary" />
            <span>© {currentYear}</span>
          </p>

          {/* Back to top - mobile only */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary sm:hidden"
          >
            scroll_to_top()
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
