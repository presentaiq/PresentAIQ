import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '◈',
    title: 'Presentation Design',
    tags: ['Pitch Decks', 'Investor', 'Sales', 'Internal'],
    body: 'End-to-end slide craft — from blank brief to pixel-perfect PowerPoint. Investor-grade decks, sales enablement, and boardroom-ready presentations, all handled.',
    featured: true,
  },
  {
    icon: '◉',
    title: 'Social Media Creatives',
    tags: ['LinkedIn', 'Instagram', 'Branded'],
    body: 'Scroll-stopping graphics aligned with your brand identity — built for engagement, optimised for every platform.',
    featured: false,
  },
  {
    icon: '◇',
    title: 'Corporate Collaterals',
    tags: ['One-pagers', 'Brochures', 'Case Studies'],
    body: 'Print-ready and digital-first marketing materials that make prospects reach back. Every word placed. Every space intentional.',
    featured: false,
  },
  {
    icon: '◎',
    title: 'RFP / RFQ / RFI Support',
    tags: ['Proposals', 'Bids', 'Government'],
    body: 'Win more bids. We design and format proposals that communicate your value instantly to evaluation committees.',
    featured: false,
  },
  {
    icon: '◐',
    title: 'Data & Dashboard Design',
    tags: ['Excel', 'Think-Cell', 'Visualization'],
    body: 'Raw numbers into executive-ready dashboards. Think-Cell charts, custom Excel models, and data stories decision-makers actually read.',
    featured: false,
  },
  {
    icon: '◑',
    title: 'Document Conversion',
    tags: ['PDF ↔ PPT', 'Rebuild', 'Migration'],
    body: 'Accurate, high-fidelity format conversions with maintained styling and layout — no copy-paste disasters, no lost formatting.',
    featured: false,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-head',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-head', start: 'top 82%' },
        }
      );

      /* Rows wipe in from left, staggered */
      gsap.fromTo(
        '.svc-row',
        { opacity: 0, x: -36 },
        {
          opacity: 1, x: 0,
          duration: 0.75, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: '.services-list', start: 'top 80%' },
        }
      );

      /* Left accent bars grow downward after rows appear */
      gsap.fromTo(
        '.svc-accent',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6, ease: 'power2.out', stagger: 0.09,
          delay: 0.18,
          scrollTrigger: { trigger: '.services-list', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="scene bg-[var(--bg-1)]"
      aria-label="Services"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
          Services
        </p>
        <div className="services-head flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2 className="text-display-sm">
            The presentation studio<br />
            <em className="not-italic" style={{ color: 'var(--gold)' }}>built for business.</em>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Six services. Every format that shapes perception, wins bids, and moves decisions — under one roof.
          </p>
        </div>

        {/* Numbered service list */}
        <div className="services-list">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="svc-row group relative"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {/* Hover accent bar — grows from top on scroll, glows on hover */}
              <div
                className="svc-accent absolute left-0 top-3 bottom-3 w-px origin-top"
                style={{ background: 'var(--gold)', opacity: 0.7 }}
              />

              <div className="grid grid-cols-[3.2rem_1fr] md:grid-cols-[4rem_1fr_auto] items-start gap-x-5 md:gap-x-8 gap-y-2 py-7 pl-4 md:pl-5">

                {/* Index number */}
                <div
                  className="svc-num pt-0.5 select-none font-sans"
                  style={{ fontSize: 'clamp(1.8rem,3.2vw,2.4rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Main content */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }} aria-hidden="true">
                      {s.icon}
                    </span>
                    <div className="flex flex-col">
                      {s.featured && (
                        <span
                          className="text-2xs uppercase tracking-[0.16em] font-semibold font-sans mb-0.5"
                          style={{ color: 'var(--gold)' }}
                        >
                          Most Requested
                        </span>
                      )}
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: '52ch' }}>
                    {s.body}
                  </p>

                  {/* Tags — mobile only */}
                  <div className="flex flex-wrap gap-1.5 mt-3 md:hidden">
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-2xs uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                        style={{ color: 'rgba(123,159,204,0.6)', background: 'rgba(123,159,204,0.07)', border: '1px solid rgba(123,159,204,0.14)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags — desktop */}
                <div className="hidden md:flex flex-col gap-2 items-end pt-0.5">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-2xs uppercase tracking-[0.1em] px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{ color: 'rgba(123,159,204,0.6)', background: 'rgba(123,159,204,0.07)', border: '1px solid rgba(123,159,204,0.14)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Closing rule */}
          <div style={{ height: 1, background: 'var(--border)' }} />
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-outline">Discuss Your Project</a>
        </div>
      </div>
    </section>
  );
}
