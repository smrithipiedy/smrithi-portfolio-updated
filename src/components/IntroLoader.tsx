import { useEffect, useState } from 'react';
import FloatingParticles from '@/components/FloatingParticles';

const IntroLoader = ({ onDone }: { onDone?: () => void }) => {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState('INITIALIZING SYSTEM...');

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2800);
    const doneTimer = setTimeout(() => setDone(true), 3600);

    const statusTimer = setTimeout(() => setStatus('LOADING ASSETS...'), 800);
    const statusTimer2 = setTimeout(() => setStatus('ESTABLISHING CONNECTION...'), 1600);
    const statusTimer3 = setTimeout(() => setStatus('READY.'), 2400);

    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      clearTimeout(statusTimer);
      clearTimeout(statusTimer2);
      clearTimeout(statusTimer3);
    };
  }, []);

  useEffect(() => {
    if (done) {
      document.body.style.overflow = '';
      onDone?.();
    }
  }, [done, onDone]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0a0a0c]"
      style={{
        position: 'fixed',
        animation: leaving ? 'curtain-up 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards' : undefined,
      }}
      aria-hidden
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--lavender) / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--lavender) / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial Glow Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--lavender) / 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Subtle scanline effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
          height: '100px',
          width: '100%',
          animation: 'scanline 4s linear infinite',
          position: 'absolute',
          top: 0,
        }}
      />

      <FloatingParticles />

      {/* Status Text */}
      <div
        className="absolute bottom-10 left-0 right-0 text-center font-retro text-xs tracking-[0.2em] opacity-50"
        style={{
          color: 'hsl(var(--lavender))',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        {status}
      </div>

      {/* Initials + signature stack */}
      <div className="relative flex items-center justify-center z-10">
        {/* Translucent bold lavender initials */}
        <div
          className="flex items-center justify-center select-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            lineHeight: 1,
            letterSpacing: '0.02em',
            color: 'hsl(var(--lavender) / 0.45)',
            textShadow: '0 0 40px hsl(var(--lavender) / 0.35)',
          }}
        >
          <span style={{ animation: 'sp-from-left 1s cubic-bezier(0.22, 1, 0.36, 1) forwards', opacity: 0 }}>
            S
          </span>
          <span style={{ animation: 'sp-from-right 1s cubic-bezier(0.22, 1, 0.36, 1) forwards', opacity: 0 }}>
            P
          </span>
        </div>

        {/* Cursive signature written on top, slightly tilted */}
        <svg
          viewBox="0 0 600 300"
          className="pointer-events-none absolute w-[min(90vw,55rem)] overflow-visible"
          style={{ transform: 'rotate(-8deg)' }}
        >
          <defs>
            <mask id="sig-mask">
              <rect
                x="0"
                y="0"
                width="600"
                height="300"
                fill="hsl(0 0% 100%)"
                style={{
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                  animation: 'write-signature 1.5s cubic-bezier(0.4, 0, 0.1, 1) 1s forwards',
                }}
              />
            </mask>
          </defs>
          <text
            x="45%"
            y="180"
            textAnchor="middle"
            fill="hsl(0 0% 100%)"
            stroke="hsl(280 70% 30%)"
            strokeWidth="2"
            strokeLinejoin="round"
            mask="url(#sig-mask)"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '160px',
              fontWeight: 400,
              paintOrder: 'stroke fill',
            }}
          >
            Smrithi
          </text>
        </svg>
      </div>
    </div>
  );
};

export default IntroLoader;
