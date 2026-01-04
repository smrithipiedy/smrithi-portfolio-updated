import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import FloatingParticles from '@/components/FloatingParticles';
import { useParallax, useMouseParallax } from '@/hooks/useScrollAnimation';

const Index = () => {
  const parallaxOffset = useParallax(0.3);
  const mouseParallax = useMouseParallax(0.01);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Background effects with parallax */}
      <FloatingParticles />
      <CustomCursor />
      
      {/* Parallax gradient layers */}
      <div 
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          transform: `translateY(${parallaxOffset * 0.2}px)`,
        }}
      >
        {/* Top gradient */}
        <div 
          className="absolute inset-x-0 top-0 h-[60vh]"
          style={{
            background: 'radial-gradient(ellipse at top, hsl(270 40% 20% / 0.4), transparent 70%)',
            transform: `translate(${mouseParallax.x * 2}px, ${mouseParallax.y * 2}px)`,
          }}
        />
        
        {/* Floating orbs with parallax */}
        <div 
          className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] animate-float-gentle"
          style={{
            transform: `translate(${mouseParallax.x * 3}px, ${mouseParallax.y * 3 - parallaxOffset * 0.5}px)`,
          }}
        />
        <div 
          className="absolute right-[15%] top-[40%] h-[300px] w-[300px] rounded-full bg-lavender/10 blur-[80px] animate-float-rotate"
          style={{
            transform: `translate(${mouseParallax.x * -2}px, ${mouseParallax.y * -2 - parallaxOffset * 0.3}px)`,
          }}
        />
        <div 
          className="absolute left-[20%] bottom-[30%] h-[250px] w-[250px] rounded-full bg-pink-soft/10 blur-[60px]"
          style={{
            transform: `translate(${mouseParallax.x * 4}px, ${mouseParallax.y * 4 - parallaxOffset * 0.4}px)`,
          }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: `translateY(${parallaxOffset * 0.1}px)`,
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main content with scroll snap */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
