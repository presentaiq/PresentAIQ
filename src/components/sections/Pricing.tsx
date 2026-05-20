import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    description: 'Perfect for small teams and growing businesses with regular presentation needs.',
    features: [
      'Up to 20 slides per month',
      '48-hour turnaround',
      '2 revisions per project',
      'PowerPoint & Google Slides',
      'Email support',
      'Basic data charts',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$599',
    period: '/month',
    description: 'For teams that present frequently — pitch decks, sales enablement, and board packs.',
    features: [
      'Up to 60 slides per month',
      '24-hour turnaround',
      'Unlimited revisions',
      'Think-Cell charts included',
      'Social media creatives',
      'One-pager / collateral',
      'Priority support',
      'Brand template setup',
    ],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Dedicated design capacity for enterprises, agencies, and investment firms.',
    features: [
      'Unlimited slides',
      'Same-day delivery',
      'Dedicated designer',
      'RFP / RFQ / RFI support',
      'Excel dashboards & models',
      'Document conversion service',
      'Template system & style guide',
      'SLA-backed turnaround',
    ],
    cta: 'Contact Us',
    featured: false,
  },
];

const oneTime = [
  { label: 'Single Slide', price: 'from $35', note: 'Quick edits & additions' },
  { label: 'Pitch Deck (10–15 slides)', price: 'from $399', note: 'Investor-grade design' },
  { label: 'Corporate Collateral', price: 'from $199', note: 'One-pagers, brochures, case studies' },
  { label: 'Full Presentation Refresh', price: 'from $699', note: 'Rebrand existing deck' },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="rgba(123,159,204,0.15)" />
      <path d="M4 7l2 2 4-4" stroke="#7B9FCC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-head',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-head', start: 'top 82%' },
        }
      );
      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' },
        }
      );
      gsap.fromTo('.onetime-row',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.onetime-grid', start: 'top 82%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="scene"
      aria-label="Pricing"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="pricing-head text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-4">
            Simple Pricing
          </p>
          <h2 className="text-display-sm mb-5">
            Flexible plans.<br />
            <span style={{ color: 'var(--gold)' }}>Predictable costs.</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            No hidden fees, no per-slide surprises. Choose a plan that fits your cadence
            or pick one-time project pricing.
          </p>
        </div>

        {/* Plan cards */}
        <div className="pricing-grid grid md:grid-cols-3 gap-5 mb-16">
          {plans.map((p) => (
            <div key={p.name} className={`pricing-card flex flex-col ${p.featured ? 'featured' : ''}`}>
              {p.featured && (
                <div className="mb-4">
                  <span className="text-2xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ background: 'rgba(123,159,204,0.15)', color: 'var(--gold)' }}>
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                   style={{ color: p.featured ? 'var(--gold)' : 'var(--text-muted)' }}>
                  {p.name}
                </p>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}>
                    {p.price}
                  </span>
                  {p.period && (
                    <span className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{p.period}</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.description}</p>
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm leading-snug" style={{ color: 'var(--text-muted)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={p.featured ? 'btn-primary justify-center text-center' : 'btn-outline justify-center text-center'}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* One-time pricing */}
        <div className="border-t border-[var(--border)] pt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-8 text-center">
            One-Time Projects
          </p>
          <div className="onetime-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {oneTime.map((o) => (
              <div key={o.label} className="onetime-row p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-1)] hover:border-[rgba(123,159,204,0.35)] transition-colors duration-300">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{o.label}</p>
                <p className="text-lg font-bold mb-1" style={{ color: 'var(--gold)', letterSpacing: '-0.02em' }}>{o.price}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{o.note}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-muted)' }}>
          All plans include unlimited file formats (PPTX, PDF, Google Slides). Prices in USD.{' '}
          <a href="#contact" className="underline hover:text-[var(--gold)] transition-colors duration-200">
            Custom quotes available.
          </a>
        </p>
      </div>
    </section>
  );
}
