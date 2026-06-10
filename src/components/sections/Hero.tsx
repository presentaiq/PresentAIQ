import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroTicker from '../ui/HeroTicker';
import ScrollCue from '../ui/ScrollCue';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(headRef.current,
          { opacity: 0, y: 32, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }
        )
        .fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg absolute inset-0" />
      </div>

      {/* Infinite ticker rows + edge fades */}
      <HeroTicker />

      {/* Frosted text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div className="hero-overlay absolute inset-0" />
        <div className="relative pointer-events-auto">
          <h1
            ref={headRef}
            style={{
              fontSize: 'clamp(1.35rem, 3.6vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.026em',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.65rem',
            }}
          >
            <span style={{ display: 'block' }}>Intelligent Design,</span>
            <span style={{ display: 'block', color: 'var(--gold)' }}>Executive Presentation,</span>
            <span style={{ display: 'block' }}>Delivered at Speed of Thought</span>
          </h1>

          <p
            ref={subRef}
            className="max-w-lg text-sm md:text-base leading-relaxed mb-6"
            style={{ color: 'var(--text-muted)', fontWeight: 300 }}
          >
            AI-assisted pitch decks, slide design, data visualization, think-cell charts,
            RFP/RFI support, and marketing visuals — all under one roof.
          </p>

          <div ref={ctaRef}>
            <a href="#contact" className="btn-primary">Get Your First Slide Free</a>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
