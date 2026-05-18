import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#stats' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
      );
    });

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(14,14,14,0.92)] backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <a href="#hero" className="font-serif text-lg font-semibold tracking-tight text-[var(--text)] hover:text-[var(--gold)] transition-colors duration-300">
        Present<span className="text-[var(--gold)]">AIQ</span>
      </a>

      <ul className="hidden md:flex items-center gap-8" role="list">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-300"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="btn-primary !py-2.5 !px-5 !text-xs hidden sm:inline-flex"
      >
        Get Started
      </a>
    </nav>
  );
}
