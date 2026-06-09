import { useState, useEffect, useRef } from 'react';
import GrainOverlay from '../components/ui/GrainOverlay';

// ─── Types ───────────────────────────────────────────────────────────────────
type Category = 'All' | 'Logo Design' | 'Brochure' | 'Presentation' | 'Branding' | 'Packaging' | 'UI Design';

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, 'All'>;
  client: string;
  views: string;
  appreciations: string;
  year: string;
  tags: string[];
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  'All', 'Logo Design', 'Brochure', 'Presentation', 'Branding', 'Packaging', 'UI Design',
];

const PROJECTS: Project[] = [
  { id: 1,  title: 'TechNova Brand Identity',      category: 'Logo Design',  client: 'TechNova Labs · Dubai',   views: '4.2K', appreciations: '312', year: '2024', tags: ['Logomark', 'Wordmark', 'Identity'],    featured: true },
  { id: 2,  title: 'Maison Luxe Restaurant Logo',  category: 'Logo Design',  client: 'Maison Luxe · Paris',     views: '3.8K', appreciations: '284', year: '2024', tags: ['Logotype', 'Hospitality', 'Luxury'] },
  { id: 3,  title: 'Horizon Annual Report 2024',   category: 'Brochure',     client: 'Horizon Corp · London',   views: '5.1K', appreciations: '421', year: '2024', tags: ['Print', 'Corporate', 'Editorial'],     featured: true },
  { id: 4,  title: 'Elegance Product Catalog',     category: 'Brochure',     client: 'Elegance FMCG · Mumbai',  views: '3.4K', appreciations: '198', year: '2024', tags: ['Catalog', 'Product', 'Print'] },
  { id: 5,  title: 'Series A Investor Pitch Deck', category: 'Presentation', client: 'FundFlow · Dubai',        views: '6.8K', appreciations: '578', year: '2024', tags: ['Pitch Deck', 'Investor', 'Startup'],  featured: true },
  { id: 6,  title: 'Growth Strategy Keynote',      category: 'Presentation', client: 'Vertex SaaS · London',    views: '4.5K', appreciations: '340', year: '2024', tags: ['Keynote', 'Strategy', 'Slides'] },
  { id: 7,  title: 'Velour Fashion Brand System',  category: 'Branding',     client: 'Velour Studio · Milan',   views: '7.2K', appreciations: '631', year: '2024', tags: ['Brand Guidelines', 'Fashion', 'System'], featured: true },
  { id: 8,  title: 'NexaBank Corporate Identity',  category: 'Branding',     client: 'NexaBank · Singapore',    views: '5.6K', appreciations: '492', year: '2023', tags: ['Finance', 'Corporate', 'Rebrand'] },
  { id: 9,  title: 'Botanica Tea Collection',      category: 'Packaging',    client: 'Botanica Teas · UK',      views: '8.4K', appreciations: '712', year: '2024', tags: ['Packaging', 'FMCG', 'Organic'],       featured: true },
  { id: 10, title: 'Lumière Skincare Range',       category: 'Packaging',    client: 'Lumière Beauty · Paris',  views: '6.1K', appreciations: '543', year: '2024', tags: ['Luxury', 'Beauty', 'Premium'] },
  { id: 11, title: 'Finlo Mobile Banking App',     category: 'UI Design',    client: 'Finlo FinTech · UAE',     views: '9.3K', appreciations: '834', year: '2024', tags: ['Mobile UI', 'iOS', 'FinTech'],        featured: true },
  { id: 12, title: 'Orbit Analytics Dashboard',   category: 'UI Design',    client: 'Orbit Analytics · US',    views: '7.8K', appreciations: '695', year: '2024', tags: ['Dashboard', 'Web App', 'SaaS'] },
];

// ─── Category accent colours ──────────────────────────────────────────────────
const CAT_COLOUR: Record<Exclude<Category, 'All'>, string> = {
  'Logo Design':  '#A78BFA',
  'Brochure':     '#7B9FCC',
  'Presentation': '#38BDF8',
  'Branding':     '#FBBF24',
  'Packaging':    '#6EBF88',
  'UI Design':    '#5BB5CC',
};

// ─── Thumbnail components ─────────────────────────────────────────────────────

function LogoDesignThumb({ variant }: { variant: 1 | 2 }) {
  if (variant === 1) {
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#1A0B3E,#0D0621)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 65% at 50% 45%, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: 'rgba(167,139,250,0.5)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Logo Design</div>
        {/* Geometric mark */}
        <svg width="46" height="46" viewBox="0 0 46 46" style={{ zIndex: 1, flexShrink: 0 }}>
          <defs>
            <linearGradient id="vg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <polygon points="23,3 43,40 3,40" fill="none" stroke="url(#vg1)" strokeWidth="1.5" />
          <polygon points="23,14 36,37 10,37" fill="url(#vg1)" opacity="0.45" />
          <circle cx="23" cy="23" r="3.5" fill="#C4B5FD" />
          <line x1="23" y1="3" x2="23" y2="37" stroke="rgba(196,181,253,0.2)" strokeWidth="0.5" />
        </svg>
        {/* Wordmark */}
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.22em', color: '#EEF2F8', textTransform: 'uppercase', fontFamily: 'monospace' }}>TECHNOVA</div>
          <div style={{ fontSize: 5, letterSpacing: '0.38em', color: 'rgba(167,139,250,0.65)', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: 2 }}>LABS</div>
        </div>
        {/* Colour swatches */}
        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, display: 'flex', gap: 3 }}>
          {[['rgba(139,92,246,0.9)', 'rgba(167,139,250,0.25)'], ['rgba(196,181,253,0.75)', 'rgba(139,92,246,0.2)'], ['rgba(238,242,248,0.6)', 'rgba(238,242,248,0.12)']].map(([fill, border], i) => (
            <div key={i} style={{ flex: 1, height: 14, borderRadius: 3, background: fill, border: `0.5px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, background: border }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 7, right: 7, width: 8, height: 8, borderBottom: '1px solid rgba(139,92,246,0.5)', borderRight: '1px solid rgba(139,92,246,0.5)' }} />
        <div style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, borderTop: '1px solid rgba(139,92,246,0.5)', borderRight: '1px solid rgba(139,92,246,0.5)' }} />
      </div>
    );
  }
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#1C1208,#0E0A06)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(212,169,106,0.09) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: 'rgba(212,169,106,0.45)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Logo Design</div>
      <div style={{ zIndex: 1, textAlign: 'center', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <div style={{ height: '0.5px', flex: 1, background: 'rgba(212,169,106,0.35)' }} />
          <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0.5 7.5,4 4,7.5 0.5,4" fill="none" stroke="rgba(212,169,106,0.7)" strokeWidth="0.7" /></svg>
          <div style={{ height: '0.5px', flex: 1, background: 'rgba(212,169,106,0.35)' }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: '0.38em', color: '#D4A96A', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>MAISON</div>
        <div style={{ fontSize: 7.5, letterSpacing: '0.55em', color: 'rgba(212,169,106,0.55)', textTransform: 'uppercase', fontFamily: 'Georgia, serif', marginTop: 1 }}>LUXE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <div style={{ height: '0.5px', flex: 1, background: 'rgba(212,169,106,0.35)' }} />
          <div style={{ width: 16, height: '0.5px', background: 'rgba(212,169,106,0.7)' }} />
          <div style={{ height: '0.5px', flex: 1, background: 'rgba(212,169,106,0.35)' }} />
        </div>
        <div style={{ fontSize: 4, letterSpacing: '0.4em', color: 'rgba(212,169,106,0.38)', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: 6 }}>RESTAURANT · EST. MMXXIV</div>
      </div>
    </div>
  );
}

function BrochureThumb({ variant }: { variant: 1 | 2 }) {
  if (variant === 1) {
    const a = (o: number) => `rgba(123,159,204,${o})`;
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#0E1B30,#0A1320)', position: 'relative', overflow: 'hidden', display: 'flex' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 35% 40%, ${a(0.08)} 0%, transparent 70%)` }} />
        {/* Left page */}
        <div style={{ flex: 6, padding: '10px 8px 8px', display: 'flex', flexDirection: 'column', gap: 5, zIndex: 1, borderRight: `0.5px solid ${a(0.18)}` }}>
          <div style={{ fontSize: 4, letterSpacing: '0.2em', color: a(0.5), fontFamily: 'monospace', textTransform: 'uppercase' }}>ANNUAL REPORT</div>
          <div style={{ height: 6, width: '85%', borderRadius: 2, background: a(0.22) }} />
          <div style={{ height: 3.5, width: '60%', borderRadius: 1.5, background: a(0.12) }} />
          <div style={{ flex: 1 }} />
          {/* Bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 22 }}>
            {[45, 62, 38, 78, 55, 90, 70].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '1.5px 1.5px 0 0', background: i === 5 ? a(0.85) : a(0.22) }} />
            ))}
          </div>
          <div style={{ height: '0.5px', background: a(0.15) }} />
          {[88, 72, 64].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: `${w}%`, borderRadius: 1, background: a(i === 0 ? 0.14 : 0.08) }} />
          ))}
        </div>
        {/* Right page */}
        <div style={{ flex: 4, padding: '10px 7px 8px', display: 'flex', flexDirection: 'column', gap: 4, zIndex: 1 }}>
          <div style={{ height: 26, borderRadius: 3, background: a(0.07), border: `0.5px solid ${a(0.14)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: '0.5px', background: a(0.25) }} />
          </div>
          {[80, 92, 68, 85, 74].map((w, i) => (
            <div key={i} style={{ height: 2.5, width: `${w}%`, borderRadius: 1, background: a(i === 0 ? 0.16 : 0.09) }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: 7, right: 7, fontSize: 4, letterSpacing: '0.12em', color: a(0.4), fontFamily: 'monospace' }}>2024</div>
      </div>
    );
  }
  const a = (o: number) => `rgba(100,140,190,${o})`;
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#0C1520,#080E18)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header strip */}
      <div style={{ height: 18, background: a(0.18), borderBottom: `1px solid ${a(0.2)}`, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: 1, border: `1px solid ${a(0.5)}`, background: a(0.08) }} />
        <div style={{ height: 3.5, width: 55, borderRadius: 1.5, background: a(0.3) }} />
        <div style={{ flex: 1 }} />
        <div style={{ height: 3, width: 20, borderRadius: 1, background: a(0.2) }} />
      </div>
      {/* Image area */}
      <div style={{ height: 38, background: a(0.05), borderBottom: `0.5px solid ${a(0.12)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Diagonal lines placeholder */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: '120%', height: '0.5px', background: a(0.08), transform: `rotate(-20deg) translateY(${i * 9 - 22}px)` }} />
        ))}
        <div style={{ zIndex: 1, fontSize: 4, letterSpacing: '0.1em', color: a(0.35), fontFamily: 'monospace' }}>IMAGE</div>
      </div>
      {/* Product grid */}
      <div style={{ flex: 1, padding: '6px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ borderRadius: 2, background: a(0.06), border: `0.5px solid ${a(0.12)}`, display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
            <div style={{ height: 10, borderRadius: 1, background: a(0.08) }} />
            <div style={{ height: 2.5, width: '80%', borderRadius: 1, background: a(0.12) }} />
            <div style={{ height: 2, width: '55%', borderRadius: 1, background: a(0.08) }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PresentationThumb({ variant }: { variant: 1 | 2 }) {
  if (variant === 1) {
    const a = (o: number) => `rgba(56,189,248,${o})`;
    const slides = [
      // Title slide
      <div key="s1" style={{ background: 'rgba(8,22,42,0.9)', borderRadius: 2, padding: '5px 5px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2.5, border: `0.5px solid ${a(0.18)}` }}>
        <div style={{ height: 4.5, width: '70%', borderRadius: 1.5, background: a(0.25) }} />
        <div style={{ height: 3, width: '50%', borderRadius: 1, background: a(0.12) }} />
        <div style={{ height: '0.5px', width: '60%', background: a(0.18), marginTop: 1 }} />
        <div style={{ height: 2.5, width: '40%', borderRadius: 1, background: a(0.1) }} />
      </div>,
      // Big number slide
      <div key="s2" style={{ background: 'rgba(6,18,36,0.9)', borderRadius: 2, padding: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, border: `0.5px solid ${a(0.18)}` }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: a(0.9), lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'monospace' }}>$12M</div>
        <div style={{ fontSize: 3.5, letterSpacing: '0.12em', color: a(0.45), textTransform: 'uppercase', fontFamily: 'monospace' }}>TARGET ARR</div>
      </div>,
      // Chart slide
      <div key="s3" style={{ background: 'rgba(8,22,42,0.9)', borderRadius: 2, padding: '5px 4px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, border: `0.5px solid ${a(0.18)}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, flex: 1 }}>
          {[25, 40, 35, 55, 48, 70, 62, 85].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '1px 1px 0 0', background: i >= 6 ? a(0.7) : a(0.2) }} />
          ))}
        </div>
        <div style={{ height: '0.5px', background: a(0.2) }} />
      </div>,
      // Team slide
      <div key="s4" style={{ background: 'rgba(6,18,36,0.9)', borderRadius: 2, padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, border: `0.5px solid ${a(0.18)}` }}>
        <div style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          {[0.7, 0.5, 0.35].map((o, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', border: `1px solid ${a(o)}`, background: a(o * 0.2) }} />
          ))}
        </div>
        <div style={{ height: 3, width: '60%', borderRadius: 1, background: a(0.15), alignSelf: 'center' }} />
      </div>,
    ];
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#040E1E,#08162A)', position: 'relative', overflow: 'hidden', padding: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4 }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${a(0.07)} 0%, transparent 70%)` }} />
        {slides}
        <div style={{ position: 'absolute', top: 5, left: 5, fontSize: 4, letterSpacing: '0.12em', color: a(0.4), fontFamily: 'monospace', textTransform: 'uppercase', zIndex: 2 }}>Presentation</div>
      </div>
    );
  }
  const a = (o: number) => `rgba(91,181,204,${o})`;
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#061820,#04101A)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 8px 8px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 55% at 40% 40%, ${a(0.09)} 0%, transparent 70%)` }} />
      <div style={{ fontSize: 4, letterSpacing: '0.12em', color: a(0.45), fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 5, zIndex: 1 }}>Presentation</div>
      {/* Main slide */}
      <div style={{ flex: 1, borderRadius: 4, border: `1px solid ${a(0.22)}`, background: 'rgba(6,24,32,0.95)', padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[0.7, 0.35, 0.18].map((o, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: a(o) }} />
          ))}
        </div>
        <div style={{ height: '0.5px', width: '40%', background: a(0.3) }} />
        <div style={{ height: 7, width: '88%', borderRadius: 2, background: a(0.22) }} />
        <div style={{ height: 5, width: '70%', borderRadius: 1.5, background: a(0.14) }} />
        <div style={{ height: 3.5, width: '50%', borderRadius: 1, background: a(0.1) }} />
        <div style={{ marginTop: 4, display: 'flex', gap: 2 }}>
          {[100, 78, 88, 64, 92, 55, 80].map((h, i) => (
            <div key={i} style={{ width: 5, height: `${(h / 100) * 16}px`, borderRadius: '1px 1px 0 0', background: i === 6 ? a(0.8) : a(0.2) }} />
          ))}
        </div>
      </div>
      {/* Mini slides row */}
      <div style={{ display: 'flex', gap: 3, marginTop: 5, zIndex: 1 }}>
        {[0.4, 0.7, 0.25].map((o, i) => (
          <div key={i} style={{ flex: 1, height: 14, borderRadius: 2, border: `1px solid ${a(i === 1 ? 0.45 : 0.15)}`, background: `rgba(6,24,32,${i === 1 ? 0.95 : 0.6})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '55%', height: 2.5, borderRadius: 1, background: a(o) }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandingThumb({ variant }: { variant: 1 | 2 }) {
  if (variant === 1) {
    const SWATCHES = ['#C9974A', '#E6C98A', '#D4A96A', '#8B6432', '#2C1A08'];
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#1C1208,#100A06)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 50% at 50% 35%, rgba(212,169,106,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: 'rgba(212,169,106,0.45)', fontFamily: 'monospace', textTransform: 'uppercase', zIndex: 2 }}>Branding</div>
        {/* Logo zone */}
        <div style={{ flex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, zIndex: 1, paddingTop: 6 }}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <defs>
              <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6C98A" />
                <stop offset="100%" stopColor="#C9974A" />
              </linearGradient>
            </defs>
            <polygon points="14,2 26,24 2,24" fill="none" stroke="url(#bg1)" strokeWidth="1.2" />
            <polygon points="14,9 21,22 7,22" fill="url(#bg1)" opacity="0.5" />
          </svg>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: '#E6C98A', textTransform: 'uppercase', fontFamily: 'monospace' }}>VELOUR</div>
            <div style={{ fontSize: 4.5, letterSpacing: '0.4em', color: 'rgba(212,169,106,0.5)', textTransform: 'uppercase', fontFamily: 'monospace' }}>STUDIO</div>
          </div>
        </div>
        {/* Divider */}
        <div style={{ height: '0.5px', background: 'rgba(212,169,106,0.2)', margin: '0 10px', zIndex: 1 }} />
        {/* Colour swatches */}
        <div style={{ flex: 2, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 3, zIndex: 1 }}>
          {SWATCHES.map((c, i) => (
            <div key={i} style={{ flex: 1, height: 16, borderRadius: 2, background: c, opacity: 0.9 }} />
          ))}
        </div>
        {/* Divider */}
        <div style={{ height: '0.5px', background: 'rgba(212,169,106,0.2)', margin: '0 10px', zIndex: 1 }} />
        {/* Type specimen */}
        <div style={{ flex: 3, padding: '5px 10px', zIndex: 1, display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(212,169,106,0.25)', lineHeight: 1, fontFamily: 'Georgia, serif', flexShrink: 0 }}>Aa</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[80, 60, 90, 45].map((w, i) => (
              <div key={i} style={{ height: i === 0 ? 3.5 : 2.5, width: `${w}%`, borderRadius: 1, background: `rgba(212,169,106,${i === 0 ? 0.22 : 0.11})` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  const a = (o: number) => `rgba(91,140,200,${o})`;
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#0C1828,#080F1C)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 8 }}>
      <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: a(0.45), fontFamily: 'monospace', textTransform: 'uppercase', zIndex: 2 }}>Branding</div>
      {/* 3 logo variants */}
      <div style={{ display: 'flex', gap: 4, marginTop: 6, zIndex: 1 }}>
        {[['#0D1829', a(0.8)], ['rgba(123,159,204,0.9)', '#060C18'], [a(0.12), a(0.7)]].map(([bg, fg], i) => (
          <div key={i} style={{ flex: 1, height: 22, borderRadius: 3, background: bg as string, border: `0.5px solid ${a(0.2)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: 1, background: fg as string, opacity: 0.85 }} />
            <div style={{ width: 14, height: 3, borderRadius: 1, background: fg as string, opacity: 0.65 }} />
          </div>
        ))}
      </div>
      {/* Brand pattern area */}
      <div style={{ flex: 1, borderRadius: 3, border: `0.5px solid ${a(0.14)}`, background: a(0.04), marginTop: 5, zIndex: 1, overflow: 'hidden', position: 'relative' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: '100%', height: '0.5px', background: a(0.07), top: `${20 + i * 15}%` }} />
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', height: '100%', width: '0.5px', background: a(0.07), left: `${15 + i * 18}%` }} />
        ))}
        {[{x:'20%',y:'25%'}, {x:'55%',y:'55%'}, {x:'78%',y:'20%'}].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', left: pos.x, top: pos.y, width: 10, height: 10, borderRadius: '50%', background: a(0.15), border: `0.5px solid ${a(0.35)}` }} />
        ))}
      </div>
      {/* Colour dots */}
      <div style={{ display: 'flex', gap: 4, marginTop: 5, zIndex: 1, alignItems: 'center' }}>
        {['#0D1829', '#142240', '#1A3060', '#7B9FCC', '#9AB8D8', '#EEF2F8'].map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, border: `0.5px solid ${a(0.2)}` }} />
        ))}
      </div>
    </div>
  );
}

function PackagingThumb({ variant }: { variant: 1 | 2 }) {
  if (variant === 1) {
    const a = (o: number) => `rgba(110,191,136,${o})`;
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#0A1A0A,#060E06)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${a(0.12)} 0%, transparent 70%)` }} />
        <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: a(0.45), fontFamily: 'monospace', textTransform: 'uppercase' }}>Packaging</div>
        {/* Three cans in perspective arrangement */}
        {[{ w: 22, h: 42, o: 0.7, scale: 0.85 }, { w: 26, h: 50, o: 1, scale: 1 }, { w: 22, h: 38, o: 0.5, scale: 0.75 }].map((can, ci) => (
          <div key={ci} style={{ position: 'relative', width: can.w, height: can.h, opacity: can.o, zIndex: ci === 1 ? 2 : 1 }}>
            {/* Can body */}
            <div style={{ width: '100%', height: '100%', borderRadius: `${can.w / 2}px`, background: `linear-gradient(160deg, ${a(0.25)}, ${a(0.08)})`, border: `1px solid ${a(0.35)}`, position: 'relative', overflow: 'hidden' }}>
              {/* Label band */}
              <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, bottom: '20%', background: a(0.12), borderTop: `0.5px solid ${a(0.4)}`, borderBottom: `0.5px solid ${a(0.4)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                {/* Leaf motif */}
                <svg width="10" height="8" viewBox="0 0 10 8"><path d="M5 1 Q8 4 5 7 Q2 4 5 1Z" fill={a(0.6)} /></svg>
                <div style={{ fontSize: 4, fontWeight: 700, letterSpacing: '0.1em', color: a(0.85), textTransform: 'uppercase', fontFamily: 'monospace' }}>BOTANICA</div>
              </div>
              {/* Highlight */}
              <div style={{ position: 'absolute', top: 0, left: '15%', width: '20%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: `${can.w}px` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#100A0C,#0A0608)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 50% 45%, rgba(212,190,150,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: 'rgba(212,190,150,0.4)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Packaging</div>
      {/* Front flat label */}
      <div style={{ width: 28, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <div style={{ fontSize: 4, letterSpacing: '0.2em', color: 'rgba(212,190,150,0.4)', fontFamily: 'monospace', textTransform: 'uppercase' }}>FLAT</div>
        <div style={{ width: '100%', padding: '6px 5px', border: '0.5px solid rgba(212,190,150,0.25)', borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: 'center', background: 'rgba(212,190,150,0.04)' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', border: '0.5px solid rgba(212,190,150,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(212,190,150,0.4)' }} />
          </div>
          <div style={{ height: 3, width: '75%', borderRadius: 1, background: 'rgba(212,190,150,0.3)' }} />
          <div style={{ height: '0.5px', width: '60%', background: 'rgba(212,190,150,0.2)' }} />
          <div style={{ height: 2.5, width: '55%', borderRadius: 1, background: 'rgba(212,190,150,0.15)' }} />
          <div style={{ height: 2, width: '40%', borderRadius: 1, background: 'rgba(212,190,150,0.1)' }} />
        </div>
      </div>
      {/* Bottle silhouette */}
      <div style={{ width: 20, height: 60, position: 'relative', flexShrink: 0, zIndex: 2 }}>
        {/* Cap */}
        <div style={{ width: 10, height: 8, background: 'rgba(212,190,150,0.6)', borderRadius: '3px 3px 0 0', margin: '0 auto' }} />
        {/* Neck */}
        <div style={{ width: 8, height: 8, background: 'linear-gradient(160deg,rgba(212,190,150,0.15),rgba(212,190,150,0.06))', border: '0.5px solid rgba(212,190,150,0.3)', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '15%', top: 0, bottom: 0, width: '20%', background: 'rgba(255,255,255,0.05)' }} />
        </div>
        {/* Body */}
        <div style={{ width: '100%', flex: 1, height: 38, background: 'linear-gradient(160deg,rgba(212,190,150,0.15),rgba(212,190,150,0.05))', border: '0.5px solid rgba(212,190,150,0.3)', borderRadius: '2px 2px 4px 4px', position: 'relative', overflow: 'hidden' }}>
          {/* Label */}
          <div style={{ position: 'absolute', top: '22%', left: '8%', right: '8%', bottom: '22%', border: '0.5px solid rgba(212,190,150,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <div style={{ fontSize: 4.5, letterSpacing: '0.3em', color: 'rgba(212,190,150,0.7)', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 300 }}>LUMIÈRE</div>
            <div style={{ height: '0.5px', width: '70%', background: 'rgba(212,190,150,0.3)' }} />
            <div style={{ fontSize: 3.5, letterSpacing: '0.15em', color: 'rgba(212,190,150,0.4)', fontFamily: 'monospace' }}>PARIS</div>
          </div>
          {/* Highlight */}
          <div style={{ position: 'absolute', top: 0, left: '12%', width: '18%', height: '100%', background: 'rgba(255,255,255,0.04)' }} />
        </div>
      </div>
    </div>
  );
}

function UIDesignThumb({ variant }: { variant: 1 | 2 }) {
  if (variant === 1) {
    const a = (o: number) => `rgba(56,189,248,${o})`;
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#051018,#041020)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 60% at 45% 50%, ${a(0.09)} 0%, transparent 70%)` }} />
        <div style={{ position: 'absolute', top: 7, left: 7, fontSize: 4, letterSpacing: '0.12em', color: a(0.45), fontFamily: 'monospace', textTransform: 'uppercase' }}>UI Design</div>
        {/* Main phone */}
        <div style={{ width: 40, height: 70, borderRadius: 7, border: `1.5px solid ${a(0.4)}`, background: '#060C18', overflow: 'hidden', position: 'relative', zIndex: 2, flexShrink: 0 }}>
          {/* Status bar */}
          <div style={{ height: 7, background: a(0.12), display: 'flex', alignItems: 'center', padding: '0 4px', justifyContent: 'space-between' }}>
            <div style={{ width: 8, height: 2.5, borderRadius: 1, background: a(0.5) }} />
            <div style={{ width: 6, height: 2.5, borderRadius: 1, background: a(0.3) }} />
          </div>
          {/* Balance card */}
          <div style={{ margin: '4px 3px', padding: '4px 4px', background: `linear-gradient(135deg, ${a(0.2)}, ${a(0.06)})`, borderRadius: 4, border: `0.5px solid ${a(0.25)}` }}>
            <div style={{ fontSize: 3.5, color: a(0.55), fontFamily: 'monospace', letterSpacing: '0.1em' }}>BALANCE</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: a(0.9), lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'monospace' }}>$12,485</div>
            <div style={{ height: 2, width: '50%', borderRadius: 1, background: a(0.15), marginTop: 2 }} />
          </div>
          {/* Transactions */}
          <div style={{ padding: '2px 3px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[['Netflix', '−$15', 0.4], ['Salary', '+$3.2K', 0.7], ['Grocery', '−$82', 0.35]].map(([label, amt, o], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '1.5px 0' }}>
                <div style={{ width: 8, height: 8, borderRadius: 1.5, background: a(Number(o) * 0.3), flexShrink: 0 }} />
                <div style={{ flex: 1, height: 2.5, borderRadius: 1, background: a(0.12) }} />
                <div style={{ fontSize: 4, color: a(Number(o)), fontFamily: 'monospace', flexShrink: 0 }}>{amt as string}</div>
              </div>
            ))}
          </div>
          {/* Bottom nav */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 12, background: a(0.08), borderTop: `0.5px solid ${a(0.2)}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            {[1, 0.4, 0.3, 0.25].map((o, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: i === 0 ? 1.5 : '50%', background: a(o) }} />
            ))}
          </div>
        </div>
        {/* Secondary phone offset */}
        <div style={{ width: 32, height: 56, borderRadius: 6, border: `1px solid ${a(0.2)}`, background: '#060C18', overflow: 'hidden', opacity: 0.65, zIndex: 1, flexShrink: 0 }}>
          <div style={{ height: 6, background: a(0.1) }} />
          <div style={{ padding: '4px 3px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 5, width: '70%', borderRadius: 1.5, background: a(0.2) }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ height: 14, borderRadius: 3, background: a(0.08), border: `0.5px solid ${a(0.15)}` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  const a = (o: number) => `rgba(91,181,204,${o})`;
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#061418,#040C10)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 7 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 55% at 50% 40%, ${a(0.08)} 0%, transparent 70%)` }} />
      <div style={{ fontSize: 4, letterSpacing: '0.12em', color: a(0.45), fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 4, zIndex: 1 }}>UI Design</div>
      {/* Browser chrome */}
      <div style={{ flex: 1, borderRadius: 4, border: `1px solid ${a(0.25)}`, background: '#040C12', overflow: 'hidden', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Titlebar */}
        <div style={{ height: 10, background: a(0.1), borderBottom: `0.5px solid ${a(0.18)}`, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 3 }}>
          {[0.7, 0.4, 0.25].map((o, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: a(o) }} />
          ))}
          <div style={{ height: 3.5, flex: 1, borderRadius: 2, background: a(0.08), marginLeft: 3 }} />
        </div>
        {/* Dashboard */}
        <div style={{ flex: 1, display: 'flex' }}>
          {/* Sidebar */}
          <div style={{ width: 16, background: a(0.05), borderRight: `0.5px solid ${a(0.14)}`, padding: '5px 3px', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 1.5, background: a(0.5), margin: '0 auto' }} />
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ width: '80%', height: 5, borderRadius: 1, background: a(i === 0 ? 0.25 : 0.1), margin: '0 auto' }} />
            ))}
          </div>
          {/* Main content */}
          <div style={{ flex: 1, padding: '5px 5px', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2.5 }}>
              {[0.7, 0.45, 0.3].map((o, i) => (
                <div key={i} style={{ height: 16, borderRadius: 2, background: a(0.06), border: `0.5px solid ${a(0.15)}`, padding: '2px 3px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1.5 }}>
                  <div style={{ height: 4, width: '70%', borderRadius: 1, background: a(o) }} />
                  <div style={{ height: 2, width: '50%', borderRadius: 1, background: a(0.12) }} />
                </div>
              ))}
            </div>
            {/* Chart */}
            <div style={{ flex: 1, borderRadius: 3, background: a(0.04), border: `0.5px solid ${a(0.12)}`, padding: '3px 4px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, flex: 1 }}>
                {[30, 45, 38, 60, 52, 75, 65, 85, 72, 90].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '1px 1px 0 0', background: i >= 8 ? a(0.7) : a(0.18) }} />
                ))}
              </div>
              <div style={{ height: '0.5px', background: a(0.18) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Thumbnail dispatcher ─────────────────────────────────────────────────────
function Thumbnail({ category, variant }: { category: Exclude<Category, 'All'>; variant: 1 | 2 }) {
  switch (category) {
    case 'Logo Design':  return <LogoDesignThumb  variant={variant} />;
    case 'Brochure':     return <BrochureThumb     variant={variant} />;
    case 'Presentation': return <PresentationThumb variant={variant} />;
    case 'Branding':     return <BrandingThumb     variant={variant} />;
    case 'Packaging':    return <PackagingThumb    variant={variant} />;
    case 'UI Design':    return <UIDesignThumb     variant={variant} />;
  }
}

// ─── Heart icon ───────────────────────────────────────────────────────────────
function HeartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 11S1 7.5 1 4a2.5 2.5 0 0 1 5.5-.5A2.5 2.5 0 0 1 12 4c0 3.5-5.5 7-5.5 7Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 6.5C1 6.5 3.5 2 6.5 2S12 6.5 12 6.5 9.5 11 6.5 11 1 6.5 1 6.5Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const variant = (project.id % 2 === 0 ? 2 : 1) as 1 | 2;
  const accent = CAT_COLOUR[project.category];

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {/* Thumbnail wrapper */}
      <div style={{
        aspectRatio: '16/10',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        border: `1px solid ${hovered ? accent + '55' : 'rgba(123,159,204,0.16)'}`,
        boxShadow: hovered ? `0 0 24px ${accent}22` : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}>
        <Thumbnail category={project.category} variant={variant} />
        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(4,8,16,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EEF2F8', fontSize: 12, fontWeight: 500 }}>
            <HeartIcon />
            <span>{project.appreciations}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EEF2F8', fontSize: 12, fontWeight: 500 }}>
            <EyeIcon />
            <span>{project.views}</span>
          </div>
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            padding: '3px 8px', borderRadius: 20,
            background: 'rgba(4,8,16,0.75)',
            border: `0.5px solid ${accent}88`,
            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
            color: accent, fontFamily: 'monospace', textTransform: 'uppercase',
          }}>
            Featured
          </div>
        )}
      </div>

      {/* Meta */}
      <div>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>
          {project.client}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '2px 7px', borderRadius: 20,
              background: `${accent}18`,
              border: `0.5px solid ${accent}44`,
              color: accent, fontWeight: 500, letterSpacing: '0.01em',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Behance Nav ──────────────────────────────────────────────────────────────
function BehanceNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 52,
      background: scrolled ? 'rgba(8,15,28,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(123,159,204,0.1)' : '1px solid transparent',
      transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      display: 'flex', alignItems: 'center', padding: '0 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Logo */}
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: 'rgba(123,159,204,0.2)',
          border: '1px solid rgba(123,159,204,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#7B9FCC', fontFamily: 'monospace' }}>P</span>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)' }}>PresentAIQ</span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', borderLeft: '1px solid rgba(123,159,204,0.2)', paddingLeft: 8, marginLeft: 4 }}>Portfolio</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <a
          href="/PresentAIQ/"
          style={{
            fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '6px 14px', borderRadius: 20,
            border: '1px solid rgba(123,159,204,0.2)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(123,159,204,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(123,159,204,0.2)'; }}
        >
          Main Site
        </a>
        <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '7px 18px' }}>
          Hire Me
        </button>
      </div>
    </nav>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────
function ProfileSection() {
  return (
    <section style={{ paddingTop: 52 }}>
      {/* Cover banner */}
      <div style={{
        height: 200,
        background: 'linear-gradient(135deg, #080F1C 0%, #0D1829 30%, #142240 60%, #0A1830 80%, #060C18 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Mesh dots */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i % 4) * 28 + 6}%`,
            top: `${Math.floor(i / 4) * 36 + 10}%`,
            width: 1, height: 1,
            borderRadius: '50%',
            background: 'rgba(123,159,204,0.4)',
          }} />
        ))}
        {/* Gradient line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(123,159,204,0.3), transparent)' }} />
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: '10%', top: '20%', width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(123,159,204,0.08)' }} />
        <div style={{ position: 'absolute', right: '8%', top: '15%', width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(123,159,204,0.05)' }} />
        {/* Category colour strips */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, display: 'flex' }}>
          {Object.values(CAT_COLOUR).map((c, i) => (
            <div key={i} style={{ flex: 1, background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Profile info row */}
      <div style={{ background: 'var(--bg-1)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'flex-end', gap: 20, paddingBottom: 20, position: 'relative' }}>
          {/* Avatar */}
          <div style={{
            width: 90, height: 90, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(145deg,#142240,#0D1829)',
            border: '3px solid var(--bg-1)',
            outline: '2px solid rgba(123,159,204,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: -45, position: 'relative', zIndex: 10,
          }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#7B9FCC', fontFamily: 'monospace' }}>P</span>
          </div>

          {/* Name & details */}
          <div style={{ flex: 1, paddingTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
                PresentAIQ Studio
              </h1>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
                background: 'rgba(110,191,136,0.15)', border: '1px solid rgba(110,191,136,0.3)',
                color: '#6EBF88', letterSpacing: '0.06em',
              }}>
                Available for Work
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 3 }}>
              Graphic Design Studio · Dubai, UAE
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Logo · Branding · Print · Packaging · Presentation · UI/UX
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, paddingTop: 10 }}>
            {[['47.8K', 'Views'], ['3.2K', 'Appreciations'], ['892', 'Followers']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>{val}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, paddingTop: 10 }}>
            <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '7px 18px' }}>Follow</button>
            <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '7px 18px' }}>Contact</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BehancePage() {
  const [activeCat, setActiveCat] = useState<Category>('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCat === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCat);

  const handleCatChange = (cat: Category) => {
    setActiveCat(cat);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <GrainOverlay />
      <BehanceNav />
      <ProfileSection />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Category filter bar */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 32,
          overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'none',
        } as React.CSSProperties}>
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCat;
            const accent = cat !== 'All' ? CAT_COLOUR[cat] : '#7B9FCC';
            return (
              <button
                key={cat}
                onClick={() => handleCatChange(cat)}
                style={{
                  flexShrink: 0,
                  padding: '7px 16px',
                  borderRadius: 980,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  border: isActive ? 'none' : `1px solid ${accent}33`,
                  background: isActive ? accent : `${accent}0F`,
                  color: isActive ? '#060C18' : accent,
                  transition: 'all 0.22s ease',
                  outline: 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
                }}
              >
                {cat}
                {cat !== 'All' && (
                  <span style={{ marginLeft: 5, opacity: 0.7, fontSize: 10, fontWeight: 400 }}>
                    {PROJECTS.filter(p => p.category === cat).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }} ref={gridRef}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
            {filtered.length} Projects
          </p>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px',
        textAlign: 'center',
        background: 'var(--bg-1)',
      }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
          © 2024 PresentAIQ Studio · Graphic Design Portfolio
          <span style={{ margin: '0 10px', opacity: 0.4 }}>·</span>
          <a href="/PresentAIQ/" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.75rem' }}>Main Site</a>
        </p>
      </footer>
    </>
  );
}
