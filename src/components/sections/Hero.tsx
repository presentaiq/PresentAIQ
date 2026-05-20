import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSlides from '../ui/HeroSlides';
import ScrollCue from '../ui/ScrollCue';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(headRef.current,
          { opacity: 0, y: 32, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
          '-=0.4'
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
    /*
     * 200vh tall section — first 100vh is the sticky viewport.
     * GSAP ScrollTrigger in HeroSlides uses this full height to
     * drive the slide explosion as the user scrolls through it.
     */
    <section
      id="hero"
      ref={sectionRef}
      className="relative"
      style={{ minHeight: '200vh' }}
      aria-label="Hero"
    >
      {/* Sticky visual container — stays in viewport for 200vh of scroll */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 20% 35%, rgba(123,159,204,0.08) 0%, transparent 60%),
                radial-gradient(ellipse 50% 70% at 80% 65%, rgba(26,43,74,0.55) 0%, transparent 55%),
                linear-gradient(180deg, #060C18 0%, #080F1C 60%, #0D1829 100%)
              `,
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(123,159,204,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(123,159,204,1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080F1C] to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 pt-24 pb-10 px-6 md:px-12 max-w-6xl mx-auto w-full">

          {/* Eyebrow */}
          <div className="text-center mb-5 hero-text-content">
            <p
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="w-4 h-px opacity-60" style={{ background: 'var(--gold)' }} />
              AI-Powered Presentation Excellence
              <span className="w-4 h-px opacity-60" style={{ background: 'var(--gold)' }} />
            </p>
          </div>

          {/* 3D slides — takes the bulk of the viewport */}
          <HeroSlides sectionRef={sectionRef} />

          {/* Headline + CTAs */}
          <div className="hero-text-content text-center flex flex-col items-center mt-8">
            <h1
              ref={headRef}
              style={{
                /* 20% smaller than text-display (clamp 2.6→5.2rem) */
                fontSize: 'clamp(2.08rem, 4.4vw, 4.16rem)',
                lineHeight: 1.07,
                letterSpacing: '-0.026em',
                fontWeight: 700,
                color: 'var(--text)',
                maxWidth: '42rem',
                marginBottom: '1.1rem',
              }}
            >
              Intelligent Design,{' '}
              <span style={{ color: 'var(--gold)' }}>Executive Presentation,</span>
              <br />
              Delivered at Speed of Thought
            </h1>

            <p
              ref={subRef}
              className="max-w-lg text-sm md:text-base leading-relaxed mb-7"
              style={{ color: 'var(--text-muted)', fontWeight: 300 }}
            >
              AI-assisted pitch decks, slide design, data visualization, think-cell charts,
              RFP/RFI support, and marketing visuals — all under one roof.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3">
              <a href="#contact" className="btn-primary">Get Your First Slide Free</a>
              <a href="#services" className="btn-outline">Explore Services</a>
            </div>
          </div>
        </div>

        <ScrollCue />
      </div>
    </section>
  );
}
