import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'Services', href: '#services' },
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[rgba(8,15,28,0.92)] backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop links */}
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

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary !py-2 !px-5 !text-xs hidden sm:inline-flex">
            Get Started Free
          </a>

          {/* Hamburger – mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block h-0.5 w-6 mx-auto rounded-full bg-[var(--text)] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 w-6 mx-auto rounded-full bg-[var(--text)] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-6 mx-auto rounded-full bg-[var(--text)] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(6,12,24,0.97)', backdropFilter: 'blur(20px)' }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            className="text-2xl font-semibold text-[var(--text)] hover:text-[var(--gold)] transition-colors duration-300 py-1"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={closeMenu}
          className="btn-primary mt-4 text-base"
        >
          Get Started Free
        </a>
      </div>
    </>
  );
}
