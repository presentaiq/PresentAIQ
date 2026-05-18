import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollCue from '../ui/ScrollCue';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        headRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.out' }
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        );

      // Parallax on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Fade hero content on scroll out
      gsap.to([headRef.current, subRef.current, ctaRef.current], {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>

        {/* Fallback gradient (always visible, video overlays it) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, rgba(201,168,76,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 60%, rgba(201,168,76,0.05) 0%, transparent 55%),
              linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 100%)
            `,
          }}
        />

        {/* Abstract cinematic lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="rg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="40%" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
          <circle cx="50%" cy="50%" r="60%" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
          <circle cx="50%" cy="50%" r="80%" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C9A84C" strokeWidth="0.5" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0e0e0e] to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)] mb-8 font-sans font-medium">
          AI-Powered Presentation Excellence
        </p>

        <h1
          ref={headRef}
          className="font-serif font-semibold mb-8 text-[var(--text)]"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
        >
          Intelligent Design,
          <br />
          <em className="not-italic text-[var(--gold)]">Executive Presentation,</em>
          <br />
          Delivered at Speed of Thought
        </h1>

        <p
          ref={subRef}
          className="max-w-2xl mx-auto text-base md:text-lg text-[var(--text-muted)] mb-12 font-sans font-light leading-relaxed"
        >
          PresentAIQ provides AI-assisted presentation design & business document services: pitch decks, slide formatting, data visualization, think-cell charts, templates, RFP/RFI support, and marketing visuals.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="btn-primary">
            Get Your First Slide Free
          </a>
          <a href="#services" className="btn-outline">
            View Services
          </a>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
