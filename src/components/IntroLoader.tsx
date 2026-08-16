import { useEffect, useState } from 'react';

const IntroLoader = () => {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2900);
    const doneTimer = setTimeout(() => setDone(true), 3800);

    document.body.style.overflow = 'hidden';
    return () => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        position: 'fixed',
        background: 'var(--gradient-hero)',
        animation: leaving ? 'curtain-up 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards' : undefined,
      }}
      aria-hidden
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute h-[40rem] w-[40rem] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(var(--lavender) / 0.55), transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Initials + signature stack */}
      <div className="relative flex items-center justify-center">
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
          <span style={{ animation: 'sp-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards', opacity: 0 }}>
            S
          </span>
          <span style={{ animation: 'sp-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards', opacity: 0 }}>
            P
          </span>
        </div>

        {/* Cursive signature written on top, tilted 40deg */}
        <svg
          viewBox="0 0 400 140"
          className="pointer-events-none absolute w-[min(90vw,46rem)] overflow-visible"
          style={{ transform: 'rotate(-40deg)' }}
        >
          <defs>
            <mask id="sig-mask">
              <rect
                x="-20"
                y="0"
                width="440"
                height="140"
                fill="hsl(0 0% 100%)"
                style={{
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                  animation: 'write-signature 1.3s cubic-bezier(0.45, 0, 0.35, 1) 1s forwards',
                }}
              />
            </mask>
          </defs>
          <text
            x="50%"
            y="95"
            textAnchor="middle"
            fill="hsl(0 0% 100%)"
            mask="url(#sig-mask)"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '120px',
              filter: 'drop-shadow(0 0 18px hsl(var(--lavender) / 0.6))',
            }}
          >
            Smrithi
          </text>
        </svg>
      </div>

      {/* Scribble trailing off the signature to the bottom of the screen */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M64 34 C74 44, 52 50, 62 60 C70 68, 46 72, 54 82 C60 90, 44 94, 50 102"
          fill="none"
          stroke="hsl(0 0% 100%)"
          strokeWidth="0.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            filter: 'drop-shadow(0 0 6px hsl(var(--lavender) / 0.7))',
            animation: 'scribble-draw 0.6s cubic-bezier(0.6, 0, 0.4, 1) 2.3s forwards',
          }}
        />
      </svg>
    </div>
  );
};

export default IntroLoader;
