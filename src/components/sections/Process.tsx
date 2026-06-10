import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Client Brief',
    body: 'Share your project brief, content, and goals. We align on format, audience, and timeline before a single slide is touched.',
    color: '#2563EB',
  },
  {
    num: '02',
    title: 'Create',
    body: 'We dive in — crafting layout, visual hierarchy, and narrative structure. Every element placed with purpose and precision.',
    color: '#3B82F6',
  },
  {
    num: '03',
    title: 'First Draft',
    body: 'A polished first draft delivered to your inbox via Drive or Dropbox — fully editable, production-ready, and on time.',
    color: '#7C3AED',
  },
  {
    num: '04',
    title: 'Final Delivery',
    body: 'Your feedback applied with precision. We refine until it\'s exactly right — sharp, cohesive, and ready to present.',
    color: '#8B5CF6',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-header', start: 'top 82%' } }
      );

      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 75%', end: 'bottom 60%', scrub: 0.6,
          },
        });
      }

      gsap.fromTo('.step-card',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.process-steps', start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Our process"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="process-header" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.6875rem', fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            How We Work
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.032em', lineHeight: 1.12,
              color: 'var(--text)',
            }}>
              Brief to final,{' '}
              <span style={{ color: 'var(--accent)' }}>in four steps.</span>
            </h2>
            <p style={{
              fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65,
              maxWidth: '36ch',
            }}>
              A streamlined process designed for speed without sacrificing quality.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ position: 'relative', height: 2, background: 'var(--border)', marginBottom: 40, display: 'none' }} className="md:block" aria-hidden="true">
          <div ref={lineRef} style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: '100%', background: 'var(--accent)', transformOrigin: 'left center', opacity: 0.6,
          }} />
        </div>

        <div className="process-steps" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: 1,
          border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
        }}>
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className="step-card"
              style={{
                background: 'var(--surface)',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                position: 'relative',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.25s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; }}
            >
              {/* Step connector dot */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${s.color}80, ${s.color}20)`,
              }} />

              <div style={{
                fontSize: 'clamp(3rem, 5vw, 4rem)',
                fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
                color: 'var(--border)', marginBottom: 24, userSelect: 'none',
              }}>
                {s.num}
              </div>
              <h3 style={{
                fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)',
                letterSpacing: '-0.015em', marginBottom: 10,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {s.body}
              </p>

              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)',
                  width: 20, height: 20,
                  borderRadius: '50%', background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1,
                }} className="hidden md:flex">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="#contact" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
