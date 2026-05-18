import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '◈',
    title: 'Presentation Requests',
    subtitle: 'Pitch Decks · Investor · Internal · Sales',
    body: 'End-to-end slide design: from ideation to pixel-perfect PowerPoint. Investor-grade decks, sales enablement, and internal comms—all handled.',
    featured: true,
  },
  {
    icon: '◉',
    title: 'Social Media Creatives',
    subtitle: 'LinkedIn · Instagram · Branded',
    body: 'Scroll-stopping social graphics aligned with your brand identity. Built for engagement, optimized for each platform.',
    featured: false,
  },
  {
    icon: '◇',
    title: 'Corporate Collaterals',
    subtitle: 'One-pagers · Brochures · Case Studies',
    body: 'Print-ready and digital-first marketing materials that make prospects reach back. Every word placed, every space intentional.',
    featured: false,
  },
  {
    icon: '◎',
    title: 'RFP / RFQ / RFI Support',
    subtitle: 'Proposals · Bids · Government',
    body: 'Win more bids. We design and format proposals that communicate your value instantly to evaluation committees.',
    featured: false,
  },
  {
    icon: '◐',
    title: 'Excel Data & Dashboards',
    subtitle: 'Formatting · Visualization · Think-Cell',
    body: 'Transform raw data into executive-ready dashboards. Think-Cell charts, custom Excel models, and clean data visualizations.',
    featured: false,
  },
  {
    icon: '◑',
    title: 'PDF ↔ PPT / Doc Conversions',
    subtitle: 'Format Migration · Rebuild',
    body: 'Accurate, high-fidelity document conversions with maintained styling. No more copy-paste disasters.',
    featured: false,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-head',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-head', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.svc-card',
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.services-grid', start: 'top 78%' },
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
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
          Services
        </p>
        <div className="services-head flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
          >
            Everything you need.<br />
            <em className="not-italic text-[var(--gold)]">Nothing you don't.</em>
          </h2>
          <p className="max-w-xs text-sm text-[var(--text-muted)] leading-relaxed">
            A focused suite of services designed to cover every presentation and business document need.
          </p>
        </div>

        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className={`svc-card service-card ${s.featured ? 'featured' : ''} flex flex-col gap-4`}
            >
              {s.featured && (
                <span className="text-2xs uppercase tracking-[0.16em] text-[var(--gold)] font-sans font-medium -mt-1">
                  Most Requested
                </span>
              )}
              <div className="text-[var(--gold)] text-2xl" aria-hidden="true">{s.icon}</div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-1">
                  {s.title}
                </h3>
                <p className="text-2xs uppercase tracking-[0.12em] text-[var(--gold)] opacity-70 font-sans mb-3">
                  {s.subtitle}
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-outline">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
