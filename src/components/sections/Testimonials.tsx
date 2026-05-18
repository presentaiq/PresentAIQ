import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: 'PresentAIQ transformed our investor deck overnight. The design clarity they brought to our data story was a deciding factor in closing our Series A.',
    author: 'Chief Strategy Officer',
    company: 'FinTech Scale-up, Dubai',
  },
  {
    text: "We've tried several presentation vendors. None come close to the speed and quality PresentAIQ delivers. It feels like having an in-house design team on demand.",
    author: 'Head of Marketing',
    company: 'Global Consulting Firm',
  },
  {
    text: 'Our RFP win rate improved significantly after we started using PresentAIQ for bid documents. The visual professionalism makes a real difference.',
    author: 'Business Development Director',
    company: 'Infrastructure Group, India',
  },
  {
    text: 'Think-Cell expertise, perfect formatting, delivered before deadline—every single time. This is the presentation partner every organization needs.',
    author: 'VP Operations',
    company: 'Fortune 500 Manufacturing',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testi-intro',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testi-intro', start: 'top 82%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => {
    if (!quoteRef.current || reducedMotion) {
      setActive(idx);
      return;
    }
    gsap.to(quoteRef.current, {
      opacity: 0, y: -12, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      },
    });
  };

  const q = quotes[active];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="scene relative overflow-hidden"
      aria-label="Testimonials"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <p className="testi-intro text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-6 font-sans">
          Client Voices
        </p>

        <div
          className="testi-intro relative"
          style={{ minHeight: '18rem' }}
        >
          {/* Open quote */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-[12rem] leading-none text-[var(--gold)] opacity-[0.06] select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </div>

          <blockquote ref={quoteRef} className="relative z-10">
            <p className="quote-text mb-8">"{q.text}"</p>
            <footer>
              <p className="text-sm font-semibold text-[var(--text)] font-sans">{q.author}</p>
              <p className="text-xs text-[var(--text-muted)] tracking-wide mt-1">{q.company}</p>
            </footer>
          </blockquote>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-10" role="tablist" aria-label="Testimonial navigation">
          {quotes.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-400 ${
                i === active
                  ? 'w-8 h-1.5 bg-[var(--gold)]'
                  : 'w-1.5 h-1.5 bg-[var(--border)] hover:bg-[var(--gold)] opacity-60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
