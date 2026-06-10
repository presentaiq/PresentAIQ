import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function useTheme() {
  const [light, setLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  return { light, toggle: () => setLight(v => !v) };
}

function ThemeToggle({ light, toggle }: { light: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{
        width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)',
        background: 'rgba(123,159,204,0.08)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)',
        transition: 'all 0.25s ease', flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(123,159,204,0.16)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(123,159,204,0.08)')}
    >
      {light ? (
        /* Moon — switch to dark */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        /* Sun — switch to light */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

const links = [
  { label: 'About Us',  href: '#manifesto'    },
  { label: 'Services',  href: '#services'     },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact'      },
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
  const { light, toggle } = useTheme();

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
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500"
        style={scrolled || menuOpen ? {
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        } : undefined}
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
          <ThemeToggle light={light} toggle={toggle} />

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
        style={{ background: 'var(--menu-bg)', backdropFilter: 'blur(20px)' }}
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
