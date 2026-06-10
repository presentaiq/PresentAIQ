import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Presentation & UI Design',
    body: 'From pitch decks to investor narratives — every slide crafted with intention. Clean layouts, compelling visuals, business-ready formatting.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Storytelling & Brand',
    body: 'Strategy meets aesthetics. We translate complex ideas into branded visual stories that resonate with decision-makers and win rooms.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Templates & Standards',
    body: 'Scale your communication with master templates, style guides, and design systems that keep every output on-brand — permanently.',
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.manifesto-head',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.manifesto-head', start: 'top 82%' } }
      );
      gsap.fromTo('.manifesto-body-text',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.manifesto-body-text', start: 'top 82%' } }
      );
      gsap.fromTo('.pillar-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Why Us"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 540px), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start', marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <div>
            <span style={{
              display: 'inline-block', fontSize: '0.6875rem', fontWeight: 600,
              color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
            }}>
              Why PresentAIQ
            </span>
            <h2
              className="manifesto-head"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                fontWeight: 800, letterSpacing: '-0.032em', lineHeight: 1.12,
                color: 'var(--text)',
              }}
            >
              We turn complex ideas into<br />
              <span style={{ color: 'var(--accent)' }}>presentations that close deals.</span>
            </h2>
          </div>
          <p
            className="manifesto-body-text"
            style={{
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.75, color: 'var(--text-muted)',
              paddingTop: '0.25rem',
            }}
          >
            In a world of information overload, clarity is a competitive advantage.
            We design presentations that don't just look good — they think strategically,
            communicate precisely, and move audiences to action.
            <br /><br />
            Every deck we build is a business instrument, not a visual exercise.
          </p>
        </div>

        <div className="pillars-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 16,
        }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="pillar-card"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--accent-border)';
                el.style.boxShadow = '0 8px 32px rgba(37,99,235,0.08)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', marginBottom: 18,
              }}>
                {p.icon}
              </div>
              <div style={{
                fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontSize: '1rem', fontWeight: 700, color: 'var(--text)',
                letterSpacing: '-0.015em', marginBottom: 10, lineHeight: 1.3,
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
