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
import HalftoneOverlay from '@/components/HalftoneOverlay';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background paper-texture">
      {/* Background effects */}
      <FloatingParticles />
      <HalftoneOverlay />
      <CustomCursor />
      
      {/* Spider-punk gradient overlay at top */}
      <div 
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[50vh]"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(260 30% 15% / 0.5), transparent)',
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
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
