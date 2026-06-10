import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return { dark, toggle: () => setDark(v => !v) };
}

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width:34, height:34, borderRadius:'50%',
        border:'1px solid var(--border-2)', background:'transparent',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', color:'var(--text-muted)',
        transition:'background 0.2s, color 0.2s', flexShrink:0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background='var(--surface-2)'; e.currentTarget.style.color='var(--text)'; }}
      onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text-muted)'; }}
    >
      {dark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

const NAV_LINKS = [
  { label: 'Why Us',    href: '#manifesto' },
  { label: 'Services',  href: '#services'  },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact'   },
];

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-0" aria-label="PresentAIQ home">
      <span style={{ fontFamily:'Inter,-apple-system,sans-serif', fontWeight:700, fontSize:'0.9375rem', letterSpacing:'0.04em', color:'var(--text)' }}>
        PRESENT
      </span>
      <span className="logo-aiq-badge ml-1.5">
        <span style={{ fontFamily:'Inter,-apple-system,sans-serif', fontWeight:800, fontSize:'0.85rem', letterSpacing:'0.04em', color:'var(--accent)' }}>
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
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { opacity:0, y:-12 },
        { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:0.3 }
      );
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const navStyle: React.CSSProperties = scrolled || menuOpen ? {
    background: 'var(--nav-bg)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
  } : {};

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between transition-all duration-300"
        style={navStyle}
        aria-label="Main navigation"
      >
        <Logo />

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{ fontSize:'0.8125rem', fontWeight:500, color:'var(--text-muted)', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color='var(--text-muted)')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggle} />
          <a href="#contact" className="btn-primary hidden sm:inline-flex" style={{ padding:'0.5rem 1.25rem', fontSize:'0.8125rem' }}>
            Get Started
          </a>
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 -mr-1 ml-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block h-px w-5 mx-auto rounded bg-[var(--text)] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px w-5 mx-auto rounded bg-[var(--text)] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-px w-5 mx-auto rounded bg-[var(--text)] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-7 transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background:'var(--menu-bg)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}
      >
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            style={{ fontSize:'1.75rem', fontWeight:700, color:'var(--text)', letterSpacing:'-0.025em', transition:'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color='var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color='var(--text)')}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={close} className="btn-primary mt-4">
          Get Started Free
        </a>
      </div>
    </>
  );
}
