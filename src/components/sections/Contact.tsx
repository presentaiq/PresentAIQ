import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: 'presentaiq@gmail.com',
    href: 'mailto:presentaiq@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+91 95483 75009',
    href: 'https://wa.me/919548375009',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Website',
    value: 'www.presentaiq.com',
    href: 'https://www.presentaiq.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-header', start: 'top 80%' } }
      );
      gsap.fromTo('.contact-cols',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-cols', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1400);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 8, outline: 'none',
    fontSize: '0.9375rem', color: 'var(--text)',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        position: 'relative', overflow: 'hidden',
      }}
      aria-label="Contact"
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 65%)',
      }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="contact-header" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.6875rem', fontWeight: 600,
            color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Let's Work Together
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.036em', lineHeight: 1.1,
            color: 'var(--text)', marginBottom: 20,
          }}>
            Get your first slide{' '}
            <span style={{ color: 'var(--accent)' }}>free.</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.65,
            maxWidth: '42ch', margin: '0 auto',
          }}>
            Send us your brief. We'll return a polished slide within 24 hours — no commitment required.
          </p>
        </div>

        <div className="contact-cols" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(2.5rem, 5vw, 5rem)', alignItems: 'start',
        }}>
          {/* Info column */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: 28 }}>
              Reach Us Directly
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {CONTACT_ITEMS.map(item => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      target={item.label !== 'Email' ? '_blank' : undefined}
                      rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: '0.9375rem', color: 'var(--text)',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{
              marginTop: 36, paddingTop: 28,
              borderTop: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Response time', value: 'Under 4 hours' },
                  { label: 'First slide', value: '24 hours' },
                  { label: 'Full deck', value: '48–72 hours' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{r.label}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)' }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div>
            {status === 'sent' ? (
              <div style={{
                border: '1px solid var(--accent-border)',
                borderRadius: 16, padding: 'clamp(2rem, 4vw, 3rem)',
                textAlign: 'center',
                background: 'var(--accent-bg)',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--accent)', margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                  Message Received
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  We'll be in touch within 4 hours. Your first slide is already on our radar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label htmlFor="cnt-name" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                    Your Name
                  </label>
                  <input
                    id="cnt-name" type="text" required placeholder="e.g. Alex Johnson"
                    style={inputStyle}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label htmlFor="cnt-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                    Email Address
                  </label>
                  <input
                    id="cnt-email" type="email" required placeholder="you@company.com"
                    style={inputStyle}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label htmlFor="cnt-message" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
                    Project Brief
                  </label>
                  <textarea
                    id="cnt-message" required rows={5}
                    placeholder="Tell us about your project — deck type, deadline, key goals..."
                    style={{ ...inputStyle, resize: 'none' }}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  aria-busy={status === 'sending'}
                  style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.65 : 1, padding: '0.75rem', fontSize: '0.9375rem' }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
