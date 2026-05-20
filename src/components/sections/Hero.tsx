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
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(headRef.current,
          { opacity: 0, y: 36, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
          '-=0.4'
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
        );

      // Fade text out on scroll
      gsap.to([headRef.current, subRef.current, ctaRef.current, eyebrowRef.current], {
        opacity: 0,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '65% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[115vh] flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 20% 35%, rgba(123,159,204,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 50% 70% at 80% 65%, rgba(26,43,74,0.6) 0%, transparent 55%),
              linear-gradient(180deg, #060C18 0%, #080F1C 60%, #0D1829 100%)
            `,
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
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
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080F1C] to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 pt-28 pb-16 px-6 md:px-12 max-w-6xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="text-center mb-6">
          <p
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase"
          >
            <span className="w-4 h-px bg-[var(--gold)] opacity-60" />
            AI-Powered Presentation Excellence
            <span className="w-4 h-px bg-[var(--gold)] opacity-60" />
          </p>
        </div>

        {/* 3D Slide Composition */}
        <HeroSlides />

        {/* Headline + CTA below the slides */}
        <div className="text-center mt-10 flex flex-col items-center">
          <h1
            ref={headRef}
            className="text-display font-display max-w-3xl mb-5"
            style={{ color: 'var(--text)' }}
          >
            Intelligent Design,{' '}
            <span style={{ color: 'var(--gold)' }}>Executive Presentation,</span>
            <br />
            Delivered at Speed of Thought
          </h1>

          <p
            ref={subRef}
            className="max-w-xl text-base md:text-lg leading-relaxed mb-8"
            style={{ color: 'var(--text-muted)', fontWeight: 300 }}
          >
            AI-assisted pitch decks, slide design, data visualization, think-cell charts,
            RFP/RFI support, and marketing visuals — all under one roof.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3">
            <a href="#contact" className="btn-primary">
              Get Your First Slide Free
            </a>
            <a href="#services" className="btn-outline">
              Explore Services
            </a>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
