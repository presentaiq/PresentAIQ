import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Client Brief',
    body: 'Share your project brief, content, and goals. We align on format, audience, and timeline before a single slide is touched.',
  },
  {
    num: '02',
    title: 'Create',
    body: 'We dive in — crafting layout, visual hierarchy, and narrative structure. Every element placed with purpose.',
  },
  {
    num: '03',
    title: 'First Draft',
    body: 'A polished first draft delivered to your inbox via Drive or Dropbox — fully editable, production-ready, and on time.',
  },
  {
    num: '04',
    title: 'Final Draft',
    body: 'Your feedback applied with precision. We refine until it\'s exactly right — sharp, cohesive, and ready to present.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-head',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-head', start: 'top 82%' },
        }
      );

      // Progress line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.process-steps',
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }

      gsap.fromTo(
        '.step-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.process-steps', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scene max-w-6xl mx-auto px-6 md:px-12"
      aria-label="Our process"
    >
      <span className="gold-line w-16 mb-12 block" />

      <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
        How We Work
      </p>
      <h2
        className="process-head font-serif mb-16"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
      >
        Brief to final,<br />
        <em className="not-italic text-[var(--gold)]">in four steps.</em>
      </h2>

      {/* Progress line */}
      <div className="relative mb-12 hidden md:block" aria-hidden="true">
        <div className="h-px bg-[var(--border)] w-full" />
        <div
          ref={lineRef}
          className="absolute top-0 left-0 h-px bg-[var(--gold)] w-full origin-left opacity-60"
          style={{ transformOrigin: 'left center' }}
        />
      </div>

      <div className="process-steps grid md:grid-cols-4 gap-8 md:gap-6">
        {steps.map((s, i) => (
          <div key={s.num} className="step-item flex flex-col gap-4">
            <div className="process-num">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[var(--text)] mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
