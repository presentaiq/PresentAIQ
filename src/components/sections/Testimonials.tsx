import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    text: 'PresentAIQ transformed our investor deck overnight. The design clarity they brought to our data story was a deciding factor in closing our Series A.',
    author: 'Chief Strategy Officer',
    company: 'FinTech Scale-up, Dubai',
    initials: 'CS',
    color: '#2563EB',
  },
  {
    text: "We've tried several presentation vendors. None come close to the speed and quality PresentAIQ delivers. It feels like having an in-house design team on demand.",
    author: 'Head of Marketing',
    company: 'Global Consulting Firm',
    initials: 'HM',
    color: '#7C3AED',
  },
  {
    text: 'Our RFP win rate improved significantly after we started using PresentAIQ for bid documents. The visual professionalism makes a real difference.',
    author: 'Business Development Director',
    company: 'Infrastructure Group, India',
    initials: 'BD',
    color: '#0EA5E9',
  },
  {
    text: 'Think-Cell expertise, perfect formatting, delivered before deadline — every single time. This is the presentation partner every organization needs.',
    author: 'VP Operations',
    company: 'Fortune 500 Manufacturing',
    initials: 'VP',
    color: '#2563EB',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testi-header',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testi-header', start: 'top 82%' } }
      );
      gsap.fromTo('.testi-quote-wrap',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testi-quote-wrap', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => {
    if (!quoteRef.current || reducedMotion) { setActive(idx); return; }
    gsap.to(quoteRef.current, {
      opacity: 0, y: -10, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(quoteRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
        );
      },
    });
  };

  const q = QUOTES[active];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        background: 'var(--panel-dark)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        position: 'relative', overflow: 'hidden',
      }}
      aria-label="Testimonials"
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="testi-header" style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.6875rem', fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Client Voices
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 800, letterSpacing: '-0.032em', lineHeight: 1.15,
            color: '#F1F5F9',
          }}>
            What our clients say.
          </h2>
        </div>

        <div className="testi-quote-wrap" style={{
          background: 'rgba(241,245,249,0.03)',
          border: '1px solid rgba(241,245,249,0.07)',
          borderRadius: 20, padding: 'clamp(2rem, 5vw, 3.5rem)',
          position: 'relative',
        }}>
          {/* Big quote mark */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 16, left: 24,
            fontSize: 80, fontFamily: 'Georgia, serif',
            color: 'rgba(37,99,235,0.2)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>
            "
          </div>

          <div ref={quoteRef}>
            <p style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              lineHeight: 1.7, color: 'rgba(241,245,249,0.85)',
              fontWeight: 400, letterSpacing: '-0.01em',
              marginBottom: 32, paddingTop: 24,
              maxWidth: '60ch',
            }}>
              "{q.text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: `${q.color}22`,
                border: `2px solid ${q.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, color: q.color,
                flexShrink: 0,
              }}>
                {q.initials}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F1F5F9' }}>{q.author}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(241,245,249,0.45)', marginTop: 2 }}>{q.company}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }} role="tablist" aria-label="Testimonial navigation">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 28 : 8,
                height: 8, borderRadius: 4,
                background: i === active ? 'var(--accent)' : 'rgba(241,245,249,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s, background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
