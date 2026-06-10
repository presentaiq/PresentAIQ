import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'Presentation Design',
    tags: ['Pitch Decks', 'Investor', 'Sales', 'Boardroom'],
    body: 'End-to-end slide craft from blank brief to pixel-perfect PowerPoint. Investor-grade decks, sales enablement, and boardroom-ready presentations — all handled.',
    featured: true,
    accent: '#2563EB',
  },
  {
    num: '02',
    title: 'Social Media Creatives',
    tags: ['LinkedIn', 'Instagram', 'Branded'],
    body: 'Scroll-stopping graphics aligned with your brand identity — built for engagement, optimised for every platform.',
    featured: false,
    accent: '#7C3AED',
  },
  {
    num: '03',
    title: 'Corporate Collaterals',
    tags: ['One-pagers', 'Brochures', 'Case Studies'],
    body: 'Print-ready and digital-first marketing materials that make prospects reach back. Every word placed. Every space intentional.',
    featured: false,
    accent: '#0EA5E9',
  },
  {
    num: '04',
    title: 'RFP / RFQ / RFI Support',
    tags: ['Proposals', 'Bids', 'Government'],
    body: 'Win more bids. We design and format proposals that communicate your value instantly to evaluation committees.',
    featured: false,
    accent: '#2563EB',
  },
  {
    num: '05',
    title: 'Data & Dashboard Design',
    tags: ['Excel', 'Think-Cell', 'Visualization'],
    body: 'Raw numbers into executive-ready dashboards. Think-Cell charts, custom Excel models, and data stories decision-makers actually read.',
    featured: false,
    accent: '#7C3AED',
  },
  {
    num: '06',
    title: 'Document Conversion',
    tags: ['PDF ↔ PPT', 'Rebuild', 'Migration'],
    body: 'Accurate, high-fidelity format conversions with maintained styling and layout — no copy-paste disasters, no lost formatting.',
    featured: false,
    accent: '#0EA5E9',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-header',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-header', start: 'top 82%' } }
      );
      gsap.fromTo('.svc-card',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.svc-grid', start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Services"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        <div className="svc-header" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.6875rem', fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Services
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.032em', lineHeight: 1.12,
              color: 'var(--text)',
            }}>
              The presentation studio<br />
              <span style={{ color: 'var(--accent)' }}>built for business.</span>
            </h2>
            <p style={{
              fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65,
              maxWidth: '38ch',
            }}>
              Six services. Every format that shapes perception, wins bids, and moves decisions — under one roof.
            </p>
          </div>
        </div>

        <div className="svc-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 1,
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="svc-card group"
              style={{
                background: 'var(--surface)',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                position: 'relative',
                cursor: 'default',
                transition: 'background 0.25s',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: s.featured
                  ? `linear-gradient(90deg, ${s.accent}, #7C3AED)`
                  : 'transparent',
                opacity: 0, transition: 'opacity 0.25s',
              }}
                className="svc-accent-line"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{
                  fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                  fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1,
                  color: 'var(--border)', userSelect: 'none',
                }}>
                  {s.num}
                </span>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `${s.accent}14`,
                  border: `1px solid ${s.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <h3 style={{
                fontSize: '1.0625rem', fontWeight: 700,
                color: 'var(--text)', letterSpacing: '-0.015em',
                marginBottom: 10, lineHeight: 1.3,
              }}>
                {s.title}
              </h3>

              <p style={{
                fontSize: '0.875rem', color: 'var(--text-muted)',
                lineHeight: 1.65, marginBottom: 20,
              }}>
                {s.body}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.6875rem', fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: 'var(--text-muted)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 4, padding: '3px 8px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="#contact" className="btn-outline">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
