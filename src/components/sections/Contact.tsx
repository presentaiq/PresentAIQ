import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1400);
  };

  const inputCls = 'form-input';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scene relative overflow-hidden bg-[var(--bg-1)]"
      aria-label="Contact"
    >
      {/* Top rule */}
      <div className="gold-line max-w-6xl mx-auto mb-0" />

      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(123,159,204,0.06) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="contact-content max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* CTA headline */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
            Let's Work Together
          </p>
          <h2
            className="text-display-sm"
          >
            Get Your First Slide<br />
            <em className="not-italic text-[var(--gold)]">Free.</em>
          </h2>
          <p className="mt-6 text-[var(--text-muted)] text-base max-w-md mx-auto">
            Send us your brief. We'll return a polished slide within 24 hours—no commitment required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Contact info */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[var(--text)] mb-8">
              Reach Us Directly
            </h3>

            <ul className="space-y-6" role="list">
              {[
                {
                  label: 'Email',
                  value: 'presentaiq@gmail.com',
                  href: 'mailto:presentaiq@gmail.com',
                  icon: '◈',
                },
                {
                  label: 'WhatsApp',
                  value: '+91 95483 75009',
                  href: 'https://wa.me/919548375009',
                  icon: '◉',
                },
                {
                  label: 'Website',
                  value: 'www.presentaiq.com',
                  href: 'https://www.presentaiq.com',
                  icon: '◇',
                },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="text-[var(--gold)] mt-0.5 text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-2xs uppercase tracking-[0.12em] text-[var(--text-muted)] mb-1 font-sans">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      className="text-[var(--text)] hover:text-[var(--gold)] transition-colors duration-300 text-sm"
                      target={item.label !== 'Email' ? '_blank' : undefined}
                      rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Typical response: <span className="text-[var(--text)]">under 4 hours</span>
                <br />
                First slide turnaround: <span className="text-[var(--text)]">24 hours</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {status === 'sent' ? (
              <div className="border border-[var(--border)] rounded-sm p-10 text-center">
                <div className="text-[var(--gold)] text-3xl mb-4" aria-hidden="true">◈</div>
                <h3 className="font-serif text-xl text-[var(--text)] mb-3">
                  Message Received
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  We'll be in touch within 4 hours. Your first slide is already on our radar.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Your Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className={`${inputCls} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary justify-center disabled:opacity-60"
                  aria-busy={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg text-[var(--text)]">
            Present<span className="text-[var(--gold)]">AIQ</span>
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} PresentAIQ. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
