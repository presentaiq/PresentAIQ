import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 200, suffix: '+', label: 'Clients', detail: 'across industries worldwide' },
  { value: 10, suffix: '+', label: 'Years', detail: 'of presentation expertise' },
  { value: 850, suffix: '+', label: 'Projects / Year', detail: 'delivered on time, every time' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!numRef.current) return;
    const el = numRef.current;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(counter.val) + suffix;
          },
        });
      },
    });
  }, [value, suffix]);

  return (
    <span ref={numRef} className="stat-num">
      0{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-headline',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-headline', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.stat-line',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 78%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="scene relative overflow-hidden"
      aria-label="Proof points"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
          Track Record
        </p>
        <h2
          className="stats-headline font-serif mb-16 md:mb-20"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.18, letterSpacing: '-0.02em' }}
        >
          The numbers behind<br />
          <em className="not-italic text-[var(--gold)]">every great presentation.</em>
        </h2>

        <div className="stats-grid grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {stats.map((s, i) => (
            <div key={i} className="stat-item px-0 md:px-12 py-10 md:py-0 first:pl-0 last:pr-0">
              <div
                className="stat-line w-12 h-px bg-[var(--gold)] mb-8 origin-left opacity-50"
                style={{ transformOrigin: 'left center' }}
              />
              <CountUp value={s.value} suffix={s.suffix} />
              <div className="mt-3">
                <p className="font-serif text-xl text-[var(--text)] mb-1">{s.label}</p>
                <p className="text-xs text-[var(--text-muted)] tracking-wide">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 pt-10 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] max-w-lg">
            Trusted by startups, Fortune 500s, and investment firms across six continents—
            <span className="text-[var(--text)]"> PresentAIQ delivers results, not just slides.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
