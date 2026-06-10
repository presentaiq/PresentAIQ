import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function SlideMetrics() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#FFFFFF',
      padding: '20px',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#080D1A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Q4 Performance</div>
          <div style={{ fontSize: 6, color: '#64748B', marginTop: 2 }}>Executive Dashboard · 2024</div>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: 4, background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: '#fff', opacity: 0.9 }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Revenue', value: '$48.2M', change: '+23%', up: true },
          { label: 'New Clients', value: '284', change: '+41%', up: true },
          { label: 'Avg. Deal Size', value: '$169K', change: '+8%', up: true },
          { label: 'Pipeline', value: '$212M', change: '+67%', up: true },
        ].map((m) => (
          <div key={m.label} style={{ background: '#F7F8FB', borderRadius: 6, padding: '8px 10px' }}>
            <div style={{ fontSize: 6, color: '#64748B', marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#080D1A', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 6, color: '#22C55E', marginTop: 2, fontWeight: 600 }}>{m.change}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 6, color: '#64748B', marginBottom: 6 }}>Monthly Revenue</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 36 }}>
          {[28, 35, 32, 42, 38, 55, 62, 58, 70, 65, 80, 88].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: i === 11 ? '#2563EB' : i > 8 ? 'rgba(37,99,235,0.4)' : 'rgba(37,99,235,0.15)',
              borderRadius: '2px 2px 0 0',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlidePitchDeck() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#080D1A',
      padding: '22px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {['#2563EB', '#3B82F6', '#60A5FA'].map((c, i) => (
            <div key={i} style={{ height: 2, flex: 1, background: c, borderRadius: 1 }} />
          ))}
        </div>
        <div style={{ fontSize: 6, color: 'rgba(241,245,249,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
          Series A — Investor Deck
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 6 }}>
          The Future of<br />Enterprise AI
        </div>
        <div style={{ fontSize: 7, color: 'rgba(241,245,249,0.55)', lineHeight: 1.6, maxWidth: '80%' }}>
          Transforming how Fortune 500 companies leverage machine learning at scale.
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ v: '$48M', l: 'Raising' }, { v: '3.2×', l: 'MoM Growth' }, { v: '180', l: 'Enterprise' }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#60A5FA' }}>{s.v}</div>
              <div style={{ fontSize: 5, color: 'rgba(241,245,249,0.4)', marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(37,99,235,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 0, height: 0, borderLeft: '6px solid #60A5FA', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', marginLeft: 2 }} />
        </div>
      </div>
    </div>
  );
}

function SlideMarket() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#FFFFFF',
      padding: '20px',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#080D1A', letterSpacing: '-0.01em' }}>Market Opportunity</div>
        <div style={{ fontSize: 6, color: '#64748B', marginTop: 2 }}>Total Addressable Market Analysis</div>
      </div>
      <div style={{ flex: 1, position: 'relative', marginBottom: 12 }}>
        <svg viewBox="0 0 200 80" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d="M0,70 C30,65 50,45 80,35 C110,25 140,15 200,5 L200,80 L0,80 Z" fill="url(#g1)" />
          <path d="M0,75 C40,70 70,60 100,52 C130,44 160,38 200,30 L200,80 L0,80 Z" fill="url(#g2)" />
          <path d="M0,70 C30,65 50,45 80,35 C110,25 140,15 200,5" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <path d="M0,75 C40,70 70,60 100,52 C130,44 160,38 200,30" fill="none" stroke="#8B5CF6" strokeWidth="1" />
        </svg>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ c: '#2563EB', l: 'TAM', v: '$420B' }, { c: '#8B5CF6', l: 'SAM', v: '$84B' }, { c: '#22C55E', l: 'SOM', v: '$12B' }].map(m => (
          <div key={m.l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.c }} />
            <span style={{ fontSize: 5, color: '#64748B' }}>{m.l}</span>
            <span style={{ fontSize: 6, fontWeight: 700, color: '#080D1A' }}>{m.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideStrategy() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #0EA5E9 100%)',
      padding: '22px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: -10, left: -10, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      <div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Brand Strategy 2025</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: 8 }}>
          Growth Through<br />Premium Design
        </div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
          Elevate perception. Command premium pricing.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['Clarity', 'Trust', 'Impact'].map(tag => (
          <div key={tag} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '3px 9px', fontSize: 6, color: '#FFFFFF', fontWeight: 600 }}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

const CARD_CONFIGS = [
  {
    transform: 'rotateY(-16deg) rotateX(5deg) translateX(-18%) translateY(18%) translateZ(-70px) scale(0.84)',
    opacity: 0.55, zIndex: 1,
    floatY: 12, floatDur: 3.8, floatDelay: 0.6,
    Component: SlideMetrics,
  },
  {
    transform: 'rotateY(-8deg) rotateX(2.5deg) translateX(-9%) translateY(9%) translateZ(-35px) scale(0.92)',
    opacity: 0.75, zIndex: 2,
    floatY: 9, floatDur: 3.2, floatDelay: 0.2,
    Component: SlideMarket,
  },
  {
    transform: 'rotateY(0deg) rotateX(0deg) translateX(0%) translateY(0%) translateZ(0px) scale(1)',
    opacity: 1, zIndex: 10,
    floatY: 7, floatDur: 3.6, floatDelay: 0,
    Component: SlidePitchDeck,
  },
  {
    transform: 'rotateY(14deg) rotateX(-4deg) translateX(68%) translateY(-32%) translateZ(20px) scale(0.68)',
    opacity: 0.85, zIndex: 3,
    floatY: 8, floatDur: 2.9, floatDelay: 0.9,
    Component: SlideStrategy,
  },
];

const CARD_W = 300;
const CARD_H = 190;

function PresentationStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const floatTweens = CARD_CONFIGS.map((cfg, i) => {
      if (!cardRefs.current[i]) return null;
      return gsap.to(cardRefs.current[i], {
        y: `+=${cfg.floatY}`,
        duration: cfg.floatDur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: cfg.floatDelay,
      });
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!stackRef.current) return;
      const rect = stackRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -8;
      const ry = ((e.clientX - cx) / rect.width) * 10;
      gsap.to(stackRef.current, { rotateX: rx, rotateY: ry, duration: 0.8, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      if (!stackRef.current) return;
      gsap.to(stackRef.current, { rotateX: 0, rotateY: 0, duration: 1.2, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      floatTweens.forEach(t => t?.kill());
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={stackRef}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        width: CARD_W, height: CARD_H,
        position: 'relative',
        transform: 'translateZ(0)',
      }}
    >
      {CARD_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          ref={el => { cardRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            width: CARD_W,
            height: CARD_H,
            borderRadius: 12,
            overflow: 'hidden',
            transform: cfg.transform,
            opacity: cfg.opacity,
            zIndex: cfg.zIndex,
            boxShadow: i === 2
              ? '0 32px 80px rgba(8,13,26,0.22), 0 8px 24px rgba(37,99,235,0.14), 0 0 0 1px rgba(8,13,26,0.06)'
              : '0 16px 48px rgba(8,13,26,0.14), 0 4px 16px rgba(8,13,26,0.08)',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          <cfg.Component />
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const stackWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(headRef.current,
        { opacity: 0, y: 36, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(proofRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(stackWrapRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      aria-label="Hero"
    >
      <div className="hero-bg absolute inset-0 z-0" />
      <div className="hero-grid absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center">

          {/* Left — copy */}
          <div>
            <div ref={eyebrowRef} style={{ marginBottom: 24 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                borderRadius: 20, padding: '4px 12px 4px 8px',
                fontSize: '0.6875rem', fontWeight: 600,
                color: 'var(--accent)', letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                AI-Powered Presentation Design
              </span>
            </div>

            <h1
              ref={headRef}
              className="text-display-xl"
              style={{ marginBottom: '1.25rem', color: 'var(--text)' }}
            >
              Your ideas deserve{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                executive
              </span>
              {' '}presentation.
            </h1>

            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                lineHeight: 1.65,
                color: 'var(--text-muted)',
                maxWidth: '46ch',
                marginBottom: '2rem',
                fontWeight: 400,
              }}
            >
              Pitch decks, investor narratives, data dashboards, RFP proposals — crafted by designers
              who understand business, built with AI that understands urgency.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#contact" className="btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.9375rem' }}>
                Get Your First Slide Free
              </a>
              <a
                href="#portfolio"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                View Portfolio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div ref={proofRef} style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              {[
                { num: '850+', label: 'Projects / Year' },
                { num: '$2.3B+', label: 'Capital Raised' },
                { num: '24h', label: 'Avg. Turnaround' },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {stat.num}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 3, fontWeight: 500 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D stack */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              ref={stackWrapRef}
              style={{ position: 'relative', width: 420, height: 320 }}
            >
              {/* Soft glow behind stack */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300, height: 200,
                background: 'radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
              }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                <PresentationStack />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
