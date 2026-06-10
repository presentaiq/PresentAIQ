export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--panel-dark)',
        borderTop: '1px solid rgba(241,245,249,0.06)',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) 0',
      }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
        }}>
          {/* Logo */}
          <a
            href="#hero"
            aria-label="PresentAIQ home"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontWeight: 700, fontSize: '0.9375rem',
              letterSpacing: '0.04em', color: 'rgba(241,245,249,0.8)',
            }}>
              PRESENT
            </span>
            <span style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontWeight: 800, fontSize: '0.85rem',
              letterSpacing: '0.04em', color: 'var(--accent)',
            }}>
              AIQ
            </span>
          </a>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Why Us', href: '#manifesto' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.8125rem', fontWeight: 500,
                      color: 'rgba(241,245,249,0.4)',
                      textDecoration: 'none', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(241,245,249,0.8)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(241,245,249,0.4)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p style={{ fontSize: '0.75rem', color: 'rgba(241,245,249,0.3)' }}>
            © {year} PresentAIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
