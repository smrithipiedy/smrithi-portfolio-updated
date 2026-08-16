import { useEffect, useState } from 'react';

const IntroLoader = () => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / 2600) * 100);
      setProgress(pct);
    }, 40);

    const leaveTimer = setTimeout(() => setLeaving(true), 2600);
    const doneTimer = setTimeout(() => setDone(true), 3300);

    document.body.style.overflow = 'hidden';
    return () => {
      clearInterval(tick);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center crt-scanlines vhs-noise transition-all duration-700 ${
        leaving ? 'pointer-events-none opacity-0 scale-105' : 'opacity-100'
      }`}
      style={{ background: 'var(--gradient-hero)', position: 'fixed' }}
      aria-hidden={leaving}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full opacity-30 animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--lavender) / 0.6), transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Monogram */}
      <div className="relative flex items-center justify-center">
        {/* Rotating rings */}
        <div
          className="absolute h-52 w-52 rounded-full border border-primary/30"
          style={{ animation: 'spin 6s linear infinite' }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--cyan-code))]" />
        </div>
        <div
          className="absolute h-64 w-64 rounded-full border border-dashed border-accent/20"
          style={{ animation: 'spin 12s linear infinite reverse' }}
        />

        <svg viewBox="0 0 200 200" className="relative h-40 w-40">
          <defs>
            <linearGradient id="sp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--lavender))" />
              <stop offset="100%" stopColor="hsl(var(--pink-soft))" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="52%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="url(#sp-grad)"
            fillOpacity={0}
            stroke="url(#sp-grad)"
            strokeWidth="1.5"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '92px',
              fontWeight: 700,
              letterSpacing: '2px',
              strokeDasharray: 520,
              strokeDashoffset: 520,
              animation: 'draw-monogram 1.6s ease-out forwards, monogram-fill 0.9s ease-out 1.2s forwards',
            }}
          >
            SP
          </text>
        </svg>
      </div>

      {/* Name */}
      <p
        className="mt-8 font-mono text-xs uppercase tracking-[0.5em] text-muted-foreground opacity-0"
        style={{ animation: 'fade-in 0.8s ease-out 1.6s forwards' }}
      >
        Smrithi Piedy
      </p>

      {/* Progress */}
      <div className="mt-6 h-[2px] w-52 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-[width] duration-100 ease-linear"
          style={{
            width: `${progress}%`,
            background: 'var(--gradient-lavender)',
            boxShadow: '0 0 10px hsl(var(--lavender) / 0.8)',
          }}
        />
      </div>
    </div>
  );
};

export default IntroLoader;
