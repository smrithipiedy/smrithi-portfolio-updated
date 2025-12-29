const HalftoneOverlay = () => {
  return (
    <>
      {/* Halftone dot pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(270 50% 70% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '12px 12px',
        }}
      />
      
      {/* Paper texture noise */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Ink splatter decorations */}
      <div className="fixed top-20 left-10 text-primary text-4xl opacity-20 animate-pulse pointer-events-none z-[1]">
        ✦
      </div>
      <div className="fixed bottom-32 right-16 text-pink-soft text-3xl opacity-25 animate-pulse pointer-events-none z-[1]" style={{ animationDelay: '0.5s' }}>
        ✱
      </div>
      <div className="fixed top-1/3 right-8 text-paper-cyan text-2xl opacity-20 animate-pulse pointer-events-none z-[1]" style={{ animationDelay: '1s' }}>
        ★
      </div>
      <div className="fixed bottom-1/4 left-20 text-paper-yellow text-3xl opacity-15 animate-pulse pointer-events-none z-[1]" style={{ animationDelay: '1.5s' }}>
        ✴
      </div>
    </>
  );
};

export default HalftoneOverlay;
