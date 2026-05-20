import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-0" aria-label="PresentAIQ home">
      <span
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", sans-serif',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.06em',
          color: 'var(--text)',
        }}
      >
        PRESENT
      </span>
      <span className="logo-aiq-badge ml-1.5">
        <span
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", sans-serif',
            fontWeight: 800,
            fontSize: '0.9rem',
            letterSpacing: '0.06em',
            color: 'var(--gold)',
          }}
        >
          AIQ
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    });

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(8,15,28,0.88)] backdrop-blur-xl border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <Logo />

      <ul className="hidden md:flex items-center gap-8" role="list">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-xs font-medium tracking-wide text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-300"
              style={{ letterSpacing: '0.01em' }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="btn-primary !py-2 !px-5 !text-xs hidden sm:inline-flex">
        Get Started Free
      </a>
    </nav>
  );
}
