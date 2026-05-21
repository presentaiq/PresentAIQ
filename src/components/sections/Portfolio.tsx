import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
type Category = 'All' | 'Pitch Decks' | 'Brochures' | 'Social Posts' | 'Proposals';

interface PortfolioItem {
  id: number;
  category: Exclude<Category, 'All'>;
  title: string;
  client: string;
  variant: 1 | 2 | 3;
}

/* ─── Data ─── */
const CATEGORIES: Category[] = ['All', 'Pitch Decks', 'Brochures', 'Social Posts', 'Proposals'];

const ITEMS: PortfolioItem[] = [
  // Pitch Decks
  { id: 1,  category: 'Pitch Decks',   title: 'Series A Investor Deck',      client: 'FinTech · Dubai',             variant: 1 },
  { id: 2,  category: 'Pitch Decks',   title: 'Growth Strategy Deck',         client: 'SaaS Startup · London',       variant: 2 },
  { id: 3,  category: 'Pitch Decks',   title: 'Board Pack Q4 2024',           client: 'Manufacturing Corp',          variant: 3 },
  // Brochures
  { id: 4,  category: 'Brochures',     title: 'Company Profile Brochure',     client: 'Real Estate Group',           variant: 1 },
  { id: 5,  category: 'Brochures',     title: 'Service Capability Guide',     client: 'Management Consulting',       variant: 2 },
  { id: 6,  category: 'Brochures',     title: 'Product Catalog 2024',         client: 'FMCG Brand',                 variant: 3 },
  // Social Posts
  { id: 7,  category: 'Social Posts',  title: 'LinkedIn Carousel Series',     client: 'Tech Brand · Global',         variant: 1 },
  { id: 8,  category: 'Social Posts',  title: 'Brand Launch Campaign',        client: 'Retail Chain · India',        variant: 2 },
  { id: 9,  category: 'Social Posts',  title: 'Product Feature Posts',        client: 'HealthTech Startup',          variant: 3 },
  // Proposals
  { id: 10, category: 'Proposals',     title: 'Government RFP Response',      client: 'Infrastructure Ministry',     variant: 1 },
  { id: 11, category: 'Proposals',     title: 'Oil & Gas Bid Document',       client: 'Energy Corporation',          variant: 2 },
  { id: 12, category: 'Proposals',     title: 'IT Services Proposal',         client: 'Banking Sector',              variant: 3 },
];

/* ─── Palette helpers ─── */
const DECK_PALETTES = {
  1: { bg: 'linear-gradient(145deg,#0E1B30,#142240)', accent: 'rgba(123,159,204,', label: 'INVESTOR DECK' },
  2: { bg: 'linear-gradient(145deg,#122030,#0A1520)', accent: 'rgba(154,184,216,', label: 'STRATEGY DECK' },
  3: { bg: 'linear-gradient(145deg,#0D1A2E,#080F1C)', accent: 'rgba(90,133,184,',  label: 'BOARD PACK' },
} as const;

const BROCHURE_PALETTES = {
  1: { bg: 'linear-gradient(145deg,#141E30,#0D1829)', accent: 'rgba(154,184,216,', strip: 'rgba(154,184,216,0.9)' },
  2: { bg: 'linear-gradient(145deg,#0F1C2E,#0A1220)', accent: 'rgba(123,159,204,', strip: 'rgba(123,159,204,0.85)' },
  3: { bg: 'linear-gradient(145deg,#0E1B2C,#091520)', accent: 'rgba(138,188,204,', strip: 'rgba(138,188,204,0.88)' },
} as const;

const SOCIAL_PALETTES = {
  1: { bg: 'linear-gradient(135deg,#0D1A30,#142040)', accent: 'rgba(123,159,204,', number: '12K',   metric: 'FOLLOWERS GAINED',  platform: 'LinkedIn' },
  2: { bg: 'linear-gradient(135deg,#1E1A0A,#241E0E)', accent: 'rgba(212,169,106,', number: '4.8×',  metric: 'ENGAGEMENT UPLIFT', platform: 'Instagram' },
  3: { bg: 'linear-gradient(135deg,#0A1E18,#071512)', accent: 'rgba(138,189,168,', number: '850+',  metric: 'DAILY IMPRESSIONS', platform: 'All Platforms' },
} as const;

const PROPOSAL_PALETTES = {
  1: { bg: 'linear-gradient(145deg,#101E32,#0A1525)', accent: 'rgba(154,184,216,', header: 'RFP RESPONSE',  pages: '1 of 24' },
  2: { bg: 'linear-gradient(145deg,#0E1A2E,#080F20)', accent: 'rgba(123,159,204,', header: 'BID DOCUMENT',  pages: '1 of 18' },
  3: { bg: 'linear-gradient(145deg,#1C1410,#120E0C)', accent: 'rgba(184,160,154,', header: 'PROPOSAL',      pages: '1 of 31' },
} as const;

/* ─── Thumbnail components ─── */

function DeckThumb({ variant }: { variant: 1 | 2 | 3 }) {
  const p = DECK_PALETTES[variant];
  const a = (o: number) => `${p.accent}${o})`;

  return (
    <div
      style={{
        width: '100%', height: '100%',
        background: p.bg,
        position: 'relative', overflow: 'hidden',
        padding: '10px 10px 9px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${a(0.07)} 0%, transparent 70%)`,
      }} />

      {/* Top row: confidential label + dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <span style={{
          fontSize: '4.5px', letterSpacing: '0.14em', fontWeight: 700,
          color: a(0.55), textTransform: 'uppercase', fontFamily: 'monospace',
        }}>
          CONFIDENTIAL · 2024
        </span>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[0.55, 0.35, 0.2].map((o, i) => (
            <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: a(o) }} />
          ))}
        </div>
      </div>

      {/* Middle: deck label + separator + content blocks */}
      <div style={{ zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', padding: '6px 0' }}>
        <span style={{
          fontSize: '5px', letterSpacing: '0.18em', fontWeight: 800,
          color: a(0.7), textTransform: 'uppercase', fontFamily: 'monospace',
        }}>
          {p.label}
        </span>
        {/* Separator */}
        <div style={{ height: '0.5px', background: `linear-gradient(90deg, ${a(0.5)}, transparent)`, width: '70%' }} />
        {/* Content blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
          <div style={{ height: '5px', width: '82%', borderRadius: '2px', background: a(0.12), position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: a(0.09), borderRadius: '2px' }} />
          </div>
          <div style={{ height: '3.5px', width: '58%', borderRadius: '2px', background: a(0.08) }} />
        </div>
      </div>

      {/* Bottom: mini bar chart */}
      <div style={{ zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '14px' }}>
        {[55, 70, 45, 85, 60, 100].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: `${h}%`, borderRadius: '1.5px 1.5px 0 0',
              background: i === 5 ? a(0.8) : a(0.22),
            }}
          />
        ))}
      </div>

      {/* Corner bracket accents */}
      {/* Top-left */}
      <div style={{ position: 'absolute', top: 7, left: 7, width: 9, height: 9,
        borderTop: `1px solid ${a(0.6)}`, borderLeft: `1px solid ${a(0.6)}` }} />
      {/* Bottom-right */}
      <div style={{ position: 'absolute', bottom: 7, right: 7, width: 9, height: 9,
        borderBottom: `1px solid ${a(0.6)}`, borderRight: `1px solid ${a(0.6)}` }} />
    </div>
  );
}

function BrochureThumb({ variant }: { variant: 1 | 2 | 3 }) {
  const p = BROCHURE_PALETTES[variant];
  const a = (o: number) => `${p.accent}${o})`;

  const LINE_WIDTHS = [88, 72, 92, 64, 80];

  return (
    <div
      style={{
        width: '100%', height: '100%',
        background: p.bg,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'row',
      }}
    >
      {/* Left vertical accent strip */}
      <div style={{
        width: '4px', flexShrink: 0,
        background: `linear-gradient(180deg, ${p.strip} 0%, ${a(0.4)} 100%)`,
      }} />

      {/* Content area */}
      <div style={{ flex: 1, padding: '10px 10px 9px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {/* Subtle glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 70% 55% at 70% 30%, ${a(0.06)} 0%, transparent 70%)`,
        }} />

        {/* Logo circle + headline block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', zIndex: 1 }}>
          <div style={{
            width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
            border: `1.5px solid ${a(0.5)}`,
            background: a(0.07),
          }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
            <div style={{ height: '5px', width: '90%', borderRadius: '1.5px', background: a(0.2) }} />
            <div style={{ height: '3.5px', width: '65%', borderRadius: '1.5px', background: a(0.12) }} />
          </div>
        </div>

        {/* Thin separator */}
        <div style={{ height: '0.5px', background: a(0.18), marginTop: '1px', zIndex: 1 }} />

        {/* Body text lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px', zIndex: 1, flex: 1 }}>
          {LINE_WIDTHS.map((w, i) => (
            <div key={i} style={{
              height: '3px', width: `${w}%`, borderRadius: '1.5px',
              background: a(i === 0 ? 0.18 : 0.1),
            }} />
          ))}
        </div>

        {/* Image placeholder rect */}
        <div style={{
          height: '18px', borderRadius: '3px', zIndex: 1,
          border: `1px solid ${a(0.2)}`,
          background: a(0.05),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: '16px', height: '0.5px', background: a(0.3) }} />
        </div>
      </div>
    </div>
  );
}

function SocialThumb({ variant }: { variant: 1 | 2 | 3 }) {
  const p = SOCIAL_PALETTES[variant];
  const a = (o: number) => `${p.accent}${o})`;

  return (
    <div
      style={{
        width: '100%', height: '100%',
        background: p.bg,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Radial glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 70% 65% at 50% 50%, ${a(0.13)} 0%, transparent 75%)`,
      }} />

      {/* Content stack */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '100%', padding: '0 10px' }}>
        {/* Top accent dash */}
        <div style={{ width: '18px', height: '1.5px', borderRadius: '1px', background: a(0.7), marginBottom: '1px' }} />

        {/* Large metric number */}
        <div style={{
          fontSize: variant === 2 ? '19px' : '18px',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: a(0.9),
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
        }}>
          {p.number}
        </div>

        {/* Metric label */}
        <span style={{
          fontSize: '3.8px', letterSpacing: '0.16em', fontWeight: 700,
          color: a(0.5), textTransform: 'uppercase', fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          {p.metric}
        </span>

        {/* Divider */}
        <div style={{ width: '24px', height: '0.5px', background: a(0.25), margin: '1px 0' }} />

        {/* Platform badge */}
        <div style={{
          padding: '2px 6px', borderRadius: '20px',
          background: a(0.12),
          border: `0.5px solid ${a(0.35)}`,
          display: 'inline-flex', alignItems: 'center',
        }}>
          <span style={{
            fontSize: '4px', letterSpacing: '0.08em', fontWeight: 600,
            color: a(0.75), textTransform: 'uppercase', fontFamily: 'monospace',
          }}>
            {p.platform}
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{
        position: 'absolute', top: 6, right: 6,
        width: '8px', height: '8px',
        borderTop: `0.5px solid ${a(0.35)}`, borderRight: `0.5px solid ${a(0.35)}`,
      }} />
      <div style={{
        position: 'absolute', bottom: 6, left: 6,
        width: '8px', height: '8px',
        borderBottom: `0.5px solid ${a(0.35)}`, borderLeft: `0.5px solid ${a(0.35)}`,
      }} />
    </div>
  );
}

function ProposalThumb({ variant }: { variant: 1 | 2 | 3 }) {
  const p = PROPOSAL_PALETTES[variant];
  const a = (o: number) => `${p.accent}${o})`;

  const SECTION_LINES = [92, 78, 85, 68];
  const SECTION_LINES_2 = [80, 90, 72, 86];

  return (
    <div
      style={{
        width: '100%', height: '100%',
        background: p.bg,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 65% 50% at 40% 30%, ${a(0.07)} 0%, transparent 70%)`,
      }} />

      {/* Header strip */}
      <div style={{
        height: '22px', flexShrink: 0, zIndex: 1,
        background: a(0.15),
        borderBottom: `1px solid ${a(0.22)}`,
        display: 'flex', alignItems: 'center',
        padding: '0 9px',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '4.5px', letterSpacing: '0.18em', fontWeight: 800,
          color: a(0.8), textTransform: 'uppercase', fontFamily: 'monospace',
        }}>
          {p.header}
        </span>
        <div style={{ display: 'flex', gap: '2.5px', alignItems: 'center' }}>
          {[0.5, 0.3].map((o, i) => (
            <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: a(o) }} />
          ))}
        </div>
      </div>

      {/* Content sections */}
      <div style={{ flex: 1, padding: '7px 9px', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 1 }}>

        {/* Section 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          <div style={{ height: '4px', width: '45%', borderRadius: '1.5px', background: a(0.3), marginBottom: '1px' }} />
          {SECTION_LINES.map((w, i) => (
            <div key={i} style={{
              height: '2.5px', width: `${w}%`, borderRadius: '1px',
              background: a(i === 0 ? 0.15 : 0.09),
            }} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '0.5px', background: a(0.14) }} />

        {/* Section 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          <div style={{ height: '4px', width: '38%', borderRadius: '1.5px', background: a(0.3), marginBottom: '1px' }} />
          {SECTION_LINES_2.map((w, i) => (
            <div key={i} style={{
              height: '2.5px', width: `${w}%`, borderRadius: '1px',
              background: a(i === 0 ? 0.15 : 0.09),
            }} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        height: '16px', flexShrink: 0, zIndex: 1,
        borderTop: `0.5px solid ${a(0.15)}`,
        padding: '0 9px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo placeholder */}
        <div style={{
          width: '12px', height: '12px',
          border: `1px solid ${a(0.35)}`,
          borderRadius: '2px',
          background: a(0.08),
        }} />
        <span style={{
          fontSize: '3.8px', letterSpacing: '0.1em', fontWeight: 500,
          color: a(0.45), fontFamily: 'monospace',
        }}>
          Page {p.pages}
        </span>
      </div>
    </div>
  );
}

/* ─── Card thumbnail dispatcher ─── */
function Thumbnail({ item }: { item: PortfolioItem }) {
  switch (item.category) {
    case 'Pitch Decks':  return <DeckThumb     variant={item.variant} />;
    case 'Brochures':    return <BrochureThumb  variant={item.variant} />;
    case 'Social Posts': return <SocialThumb    variant={item.variant} />;
    case 'Proposals':    return <ProposalThumb  variant={item.variant} />;
  }
}

/* ─── Portfolio Card ─── */
function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="portfolio-card group cursor-pointer">
      {/* Thumbnail */}
      <div
        style={{
          aspectRatio: '16/10',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        }}
        className="group-hover:border-[rgba(123,159,204,0.45)] group-hover:shadow-[0_0_20px_rgba(123,159,204,0.12)]"
      >
        <Thumbnail item={item} />
      </div>

      {/* Meta */}
      <div style={{ marginTop: '10px' }}>
        <p style={{
          fontSize: '9px', letterSpacing: '0.14em', fontWeight: 700,
          textTransform: 'uppercase', color: 'var(--gold)',
          fontFamily: 'monospace', marginBottom: '3px',
        }}>
          {item.category}
        </p>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
          {item.title}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
          {item.client}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCat, setActiveCat] = useState<Category>('All');

  const filtered = activeCat === 'All'
    ? ITEMS
    : ITEMS.filter(it => it.category === activeCat);

  /* Scroll-entry animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-head',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-head', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.portfolio-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: '.portfolio-grid', start: 'top 82%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Re-animate on category change */
  useEffect(() => {
    gsap.fromTo(
      '.portfolio-card',
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05 }
    );
  }, [activeCat]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="scene bg-[var(--bg)]"
      aria-label="Portfolio"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="portfolio-head mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">
            Portfolio
          </p>
          <h2 className="text-display-sm">
            Designs that{' '}
            <em className="not-italic" style={{ color: 'var(--gold)' }}>close deals.</em>
          </h2>
        </div>

        {/* Filter pills — horizontally scrollable on mobile */}
        <div
          className="portfolio-head flex gap-2 mb-8 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          role="tablist"
          aria-label="Portfolio categories"
        >
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCat(cat)}
                style={{
                  flexShrink: 0,
                  padding: '6px 16px',
                  borderRadius: '980px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif',
                  cursor: 'pointer',
                  border: isActive ? 'none' : '1px solid rgba(123,159,204,0.2)',
                  background: isActive ? 'var(--gold)' : 'rgba(123,159,204,0.08)',
                  color: isActive ? '#060C18' : 'var(--text-muted)',
                  transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                  outline: 'none',
                }}
                onFocus={e => (e.currentTarget.style.outline = '2px solid var(--gold)')}
                onBlur={e => (e.currentTarget.style.outline = 'none')}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          className="portfolio-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
        >
          {filtered.map(item => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
