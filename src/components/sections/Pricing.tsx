import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/mo',
    description: 'Perfect for small teams with regular presentation needs.',
    features: [
      'Up to 20 slides per month',
      '48-hour turnaround',
      '2 revisions per project',
      'PowerPoint & Google Slides',
      'Email support',
      'Basic data charts',
    ],
    cta: 'Get Started',
    href: '#contact',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$599',
    period: '/mo',
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
    cta: 'Get Started',
    href: '#contact',
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
    href: '#contact',
    featured: false,
  },
];

const oneTime = [
  { label: 'Single Slide', price: 'from $35', note: 'Quick edits & additions' },
  { label: 'Pitch Deck (10–15 slides)', price: 'from $399', note: 'Investor-grade design' },
  { label: 'Corporate Collateral', price: 'from $199', note: 'One-pagers, brochures, case studies' },
  { label: 'Full Presentation Refresh', price: 'from $699', note: 'Rebrand existing deck' },
];

function Check({ gold }: { gold?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill={gold ? 'rgba(123,159,204,0.22)' : 'rgba(123,159,204,0.1)'} />
      <path d="M5 8l2 2 4-4" stroke="#7B9FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
        { opacity: 0, y: 44, filter: 'blur(5px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.1, ease: 'power3.out', stagger: 0.13,
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 78%' },
        }
      );
      gsap.fromTo('.onetime-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: '.onetime-grid', start: 'top 84%' },
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

        {/* Header */}
        <div className="pricing-head text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--gold)' }}>
            Simple Pricing
          </p>
          <h2 className="text-display-sm mb-5">
            Flexible plans.<br />
            <em className="not-italic" style={{ color: 'var(--gold)' }}>Predictable costs.</em>
          </h2>
          <p className="max-w-sm mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            No hidden fees. Choose a monthly plan or pick one-time project pricing.
          </p>
        </div>

        {/* Plan cards */}
        <div className="pricing-grid grid md:grid-cols-3 gap-5 mb-16 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className="pricing-card flex flex-col relative overflow-hidden"
              style={p.featured ? {
                background: 'linear-gradient(160deg, #132038 0%, #0D1829 100%)',
                border: '1px solid rgba(123,159,204,0.4)',
                borderRadius: 16,
                padding: 'clamp(20px,4vw,28px)',
                boxShadow: '0 0 60px rgba(123,159,204,0.1), 0 24px 60px rgba(0,0,0,0.5)',
              } : {
                background: 'linear-gradient(160deg, #0D1829 0%, #080F1C 100%)',
                border: '1px solid rgba(123,159,204,0.14)',
                borderRadius: 16,
                padding: 'clamp(20px,4vw,28px)',
              }}
            >
              {/* Featured accent bar */}
              {p.featured && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(90deg, #4A6899, #7B9FCC, #9AB8D8)',
                }} />
              )}

              {/* Badge */}
              {p.featured && (
                <div className="mb-5">
                  <span
                    className="text-2xs font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(123,159,204,0.18)', color: 'var(--gold)', letterSpacing: '0.16em' }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className="text-2xs font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: p.featured ? 'var(--gold)' : 'rgba(238,242,248,0.4)' }}
              >
                {p.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-4">
                <span
                  style={{
                    fontSize: p.price === 'Custom' ? 'clamp(1.8rem,4vw,2.6rem)' : 'clamp(2rem,5vw,3rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: 'var(--text)',
                    fontFamily: 'system-ui',
                  }}
                >
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{p.period}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                {p.description}
              </p>

              {/* Divider */}
              <div className="mb-6" style={{ height: 1, background: 'var(--border)' }} />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check gold={p.featured} />
                    <span className="text-sm leading-snug" style={{ color: p.featured ? 'rgba(238,242,248,0.75)' : 'var(--text-muted)' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={p.href}
                className={p.featured ? 'btn-primary justify-center text-center' : 'btn-outline justify-center text-center'}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* One-time pricing */}
        <div className="pt-12" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-center" style={{ color: 'var(--gold)' }}>
            One-Time Projects
          </p>
          <p className="text-center text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            No subscription needed for standalone work.
          </p>
          <div className="onetime-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {oneTime.map((o) => (
              <div
                key={o.label}
                className="onetime-row group flex flex-col p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: 'rgba(13,24,41,0.7)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(123,159,204,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <p className="text-xs uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(238,242,248,0.45)' }}>
                  {o.label}
                </p>
                <p className="text-2xl font-bold mb-1.5" style={{ color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {o.price}
                </p>
                <p className="text-xs mt-auto pt-2" style={{ color: 'var(--text-muted)' }}>{o.note}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs mt-10" style={{ color: 'rgba(238,242,248,0.28)' }}>
          All plans include PPTX, PDF & Google Slides formats.{' '}
          <a href="#contact" className="underline decoration-[rgba(123,159,204,0.4)] hover:text-[var(--gold)] transition-colors duration-200">
            Custom quotes available.
          </a>
        </p>
      </div>
    </section>
  );
}
