import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: '01',
    title: 'Presentation & UI Support',
    body: 'From pitch decks to investor narratives, we craft every slide with intention—clean layouts, compelling visuals, and business-ready formatting.',
  },
  {
    number: '02',
    title: 'Storytelling & Brand Packaging',
    body: 'Strategy meets aesthetics. We translate complex ideas into branded visual stories that resonate with decision-makers.',
  },
  {
    number: '03',
    title: 'Standardization & Templates',
    body: 'Scale your communication with master templates, style guides, and reusable design systems that keep every output on-brand.',
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-headline',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.manifesto-headline', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.manifesto-body',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: '.manifesto-body', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 36, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.1, ease: 'power3.out', stagger: 0.18,
          scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="scene max-w-6xl mx-auto px-6 md:px-12"
      aria-label="What we do"
    >
      <span className="gold-line w-16 mb-12 block" />

      <div className="mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
          What We Do
        </p>
        <h2 className="manifesto-headline text-display-sm mb-8">
          We turn complex ideas into<br />
          <em className="not-italic text-[var(--gold)]">presentations that close deals.</em>
        </h2>
        <p className="manifesto-body max-w-xl text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
          In a world of information overload, clarity is a competitive advantage. We design presentations that don't just look good—they think strategically, communicate precisely, and move audiences to action.
        </p>
      </div>

      <div className="pillars-grid grid md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <div key={p.number} className="pillar-card service-card group">
            <div className="text-[var(--gold)] text-4xl font-light mb-6 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
              {p.number}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[var(--text)]">
              {p.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
