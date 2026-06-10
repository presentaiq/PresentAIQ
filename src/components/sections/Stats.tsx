import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 850, suffix: '+', label: 'Projects / Year', sub: 'Delivered on time, every time' },
  { value: 200, suffix: '+', label: 'Global Clients', sub: 'Across 6 continents' },
  { value: 10,  suffix: '+', label: 'Years of Expertise', sub: 'Deep presentation craft' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', sub: 'Measured every quarter' },
];

function CountUp({ value, suffix, trigger }: { value: number; suffix: string; trigger: Element | null }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!numRef.current || !trigger) return;
    const el = numRef.current;
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      onEnter: () => {
        if (done.current) return;
        done.current = true;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: value,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.v) + suffix; },
        });
      },
    });
    return () => st.kill();
  }, [value, suffix, trigger]);

  return <span ref={numRef}>0{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stats-eyebrow',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-eyebrow', start: 'top 85%' } }
      );
      gsap.fromTo('.stats-headline',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-headline', start: 'top 82%' } }
      );
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        background: 'var(--panel-dark)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Proof points"
    >
      {/* Radial accent */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,99,235,0.12) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="stats-eyebrow" style={{ marginBottom: 12 }}>
          <span style={{
            fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Track Record
          </span>
        </div>
        <h2
          className="stats-headline"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 800, letterSpacing: '-0.032em', lineHeight: 1.15,
            color: '#F1F5F9', marginBottom: 'clamp(3rem, 6vw, 5rem)',
            maxWidth: '22ch',
          }}
        >
          Numbers that speak before we do.
        </h2>

        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1 }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              ref={el => { statRefs.current[i] = el; }}
              className="stat-card"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                border: '1px solid rgba(241,245,249,0.06)',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: i === 0 ? 'linear-gradient(90deg, #2563EB, #7C3AED)' : 'transparent',
                borderRadius: '2px 2px 0 0',
              }} />
              <div style={{
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1,
                color: '#F1F5F9', marginBottom: 10,
              }}>
                <CountUp value={s.value} suffix={s.suffix} trigger={statRefs.current[i]} />
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#F1F5F9', marginBottom: 5 }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'rgba(241,245,249,0.45)', lineHeight: 1.5 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'clamp(2.5rem, 5vw, 4rem)',
          padding: '1.5rem',
          border: '1px solid rgba(241,245,249,0.06)',
          borderRadius: 2,
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(241,245,249,0.55)', maxWidth: '55ch', lineHeight: 1.6 }}>
            Trusted by startups, Fortune 500s, and investment firms —
            <span style={{ color: '#F1F5F9', fontWeight: 600 }}> PresentAIQ delivers results, not just slides.</span>
          </p>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0.625rem 1.25rem',
            border: '1px solid rgba(241,245,249,0.15)', borderRadius: 8,
            fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9',
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.6)'; e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(241,245,249,0.15)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
