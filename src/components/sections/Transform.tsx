import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function BeforeSlide() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#F0F0F0',
      padding: '20px 18px',
      display: 'flex', flexDirection: 'column', gap: 10,
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Ugly title bar */}
      <div style={{ background: '#4472C4', borderRadius: 0, padding: '8px 10px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF' }}>QUARTERLY BUSINESS REVIEW</div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Presented by: Finance Department | Q4 2024</div>
      </div>
      {/* Bullet hell */}
      <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #CCCCCC', padding: 10 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#000', marginBottom: 6, textDecoration: 'underline' }}>Key Points to Note:</div>
        {['• Revenue increased from last quarter significantly due to new product launches and expanded partnerships with several key accounts',
          '• Marketing spent budget was over by 12% which needs to be reviewed in next meeting and approved by management',
          '• Customer complaints - need to address asap (see appendix slide 14 for full list)',
          '• HR update: 3 new hires, 2 departures, office renovation in progress'].map((t, i) => (
          <div key={i} style={{ fontSize: 6.5, color: '#333', lineHeight: 1.6, marginBottom: 2 }}>{t}</div>
        ))}
        {/* Ugly table */}
        <div style={{ marginTop: 8, border: '1px solid #999', fontSize: 6 }}>
          <div style={{ display: 'flex', background: '#DDDDDD', borderBottom: '1px solid #999' }}>
            {['Product', 'Q3', 'Q4', 'Change'].map(h => (
              <div key={h} style={{ flex: 1, padding: '3px 4px', fontWeight: 700, color: '#000', borderRight: '1px solid #999' }}>{h}</div>
            ))}
          </div>
          {[['Widget A', '12,400', '14,200', '+15%'], ['Widget B', '8,900', '9,100', '+2%']].map((row, i) => (
            <div key={i} style={{ display: 'flex', borderBottom: '1px solid #DDD' }}>
              {row.map((cell, j) => (
                <div key={j} style={{ flex: 1, padding: '3px 4px', color: '#333', borderRight: '1px solid #DDD' }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        {/* Clipart-style chart */}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
          {[60, 75, 45, 90, 50, 80, 65, 95].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i % 2 === 0 ? '#4472C4' : '#ED7D31', borderRadius: 0 }} />
          ))}
        </div>
      </div>
      <div style={{ fontSize: 5.5, color: '#666', textAlign: 'center' }}>
        CONFIDENTIAL — FOR INTERNAL USE ONLY — DO NOT DISTRIBUTE — Slide 4 of 28
      </div>
    </div>
  );
}

function AfterSlide() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#080D1A',
      padding: '20px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 160, height: 160,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
      }} />
      <div>
        <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
          {['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'].map((c, i) => (
            <div key={i} style={{ height: 2, flex: 1, background: c, opacity: 1 - i * 0.2, borderRadius: 1 }} />
          ))}
        </div>
        <div style={{ fontSize: 6, color: 'rgba(241,245,249,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Q4 2024 · Business Review
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 8 }}>
          Revenue grew<br />
          <span style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            +23% this quarter.
          </span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'Revenue', value: '$48.2M', delta: '+23%', color: '#22C55E' },
          { label: 'New Accounts', value: '284', delta: '+41%', color: '#22C55E' },
        ].map(m => (
          <div key={m.label} style={{ background: 'rgba(241,245,249,0.04)', border: '1px solid rgba(241,245,249,0.08)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 5.5, color: 'rgba(241,245,249,0.4)', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#F1F5F9', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 6, color: m.color, marginTop: 3, fontWeight: 600 }}>{m.delta} vs Q3</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 32 }}>
        {[40, 52, 48, 60, 55, 70, 72, 85, 80, 90, 88, 100].map((h, i) => (
          <div key={i} style={{
            flex: 1, height: `${h}%`,
            background: i === 11 ? '#2563EB' : i > 8 ? 'rgba(37,99,235,0.5)' : 'rgba(37,99,235,0.2)',
            borderRadius: '2px 2px 0 0',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function Transform() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.transform-header',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.transform-header', start: 'top 82%' } }
      );
      gsap.fromTo('.transform-demo',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.transform-demo', start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current || !dragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  };

  return (
    <section
      id="transform"
      ref={sectionRef}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        position: 'relative', overflow: 'hidden',
      }}
      aria-label="Before and after transformation"
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="transform-header" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.6875rem', fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            The Transformation
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
            fontWeight: 800, letterSpacing: '-0.032em', lineHeight: 1.12,
            color: 'var(--text)', marginBottom: 16,
          }}>
            This is what we do to{' '}
            <span style={{ color: 'var(--accent)' }}>every presentation.</span>
          </h2>
          <p style={{
            fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65,
            maxWidth: '48ch', margin: '0 auto',
          }}>
            Drag the slider to see the difference between a typical corporate deck and a PresentAIQ-designed presentation.
          </p>
        </div>

        {/* Interactive before/after slider */}
        <div className="transform-demo" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 700 }}>
            <div
              ref={sliderRef}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'ew-resize',
                userSelect: 'none',
                boxShadow: '0 32px 80px rgba(8,13,26,0.18), 0 8px 24px rgba(8,13,26,0.1)',
                border: '1px solid var(--border)',
              }}
              onMouseDown={() => { dragging.current = true; }}
              onMouseMove={e => handleMove(e.clientX)}
              onMouseUp={() => { dragging.current = false; }}
              onMouseLeave={() => { dragging.current = false; }}
              onTouchStart={() => { dragging.current = true; }}
              onTouchMove={e => { e.preventDefault(); handleMove(e.touches[0].clientX); }}
              onTouchEnd={() => { dragging.current = false; }}
              role="slider"
              aria-label="Before and after comparison"
              aria-valuenow={Math.round(position)}
              aria-valuemin={5}
              aria-valuemax={95}
            >
              {/* BEFORE layer (full width, clipped by position) */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}>
                <BeforeSlide />
                <div style={{
                  position: 'absolute', top: 10, left: 10, zIndex: 2,
                  background: 'rgba(0,0,0,0.55)',
                  color: '#fff', fontSize: '0.625rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '4px 8px', borderRadius: 4,
                }}>
                  Before
                </div>
              </div>

              {/* AFTER layer (full width, clipped from left) */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                clipPath: `inset(0 0 0 ${position}%)`,
              }}>
                <AfterSlide />
                <div style={{
                  position: 'absolute', top: 10, right: 10, zIndex: 2,
                  background: 'var(--accent)',
                  color: '#fff', fontSize: '0.625rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '4px 8px', borderRadius: 4,
                }}>
                  After
                </div>
              </div>

              {/* Divider line + handle */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0,
                left: `${position}%`, transform: 'translateX(-50%)',
                width: 2, background: '#FFFFFF', zIndex: 10,
                boxShadow: '0 0 8px rgba(0,0,0,0.3)',
              }}>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 16,
              padding: '0 4px',
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Generic corporate template
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                PresentAIQ-designed
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="#contact" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            Transform My Presentation
          </a>
        </div>
      </div>
    </section>
  );
}
