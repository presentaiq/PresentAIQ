import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './styles/globals.css';

/* ─── Color helpers ─────────────────────────────────────── */
const rgba = (rgb: string, o: number) => `rgba(${rgb},${o})`;
const B = '123,159,204';
const L = '154,184,216';
const D = '90,133,184';

type V = 1 | 2 | 3;

/* ─── Ticker card thumbnails ─────────────────────────────── */

function DeckCard({ v }: { v: V }) {
  const pals: Record<V, { bg: string; rgb: string; label: string }> = {
    1: { bg: 'linear-gradient(145deg,#0E1B30,#142240)', rgb: B, label: 'INVESTOR DECK' },
    2: { bg: 'linear-gradient(145deg,#122030,#0A1520)', rgb: L, label: 'STRATEGY DECK' },
    3: { bg: 'linear-gradient(145deg,#0D1A2E,#080F1C)', rgb: D, label: 'BOARD PACK' },
  };
  const p = pals[v];
  const bars = [55, 70, 45, 85, 60, 100];
  return (
    <div style={{ width: '100%', height: '100%', background: p.bg, borderRadius: 10, position: 'relative', overflow: 'hidden', padding: '9px 11px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: `0 0 0 1px ${rgba(p.rgb, .22)},0 20px 60px rgba(0,0,0,.6)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 30% 40%,${rgba(p.rgb, .08)},transparent 70%)` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <span style={{ fontSize: 5, letterSpacing: '0.15em', fontWeight: 700, color: rgba(p.rgb, .5), textTransform: 'uppercase', fontFamily: 'monospace' }}>CONFIDENTIAL · 2024</span>
        <div style={{ display: 'flex', gap: 3 }}>{[.6, .35, .18].map((o, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: rgba(p.rgb, o) }} />)}</div>
      </div>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, padding: '4px 0' }}>
        <span style={{ fontSize: 4.5, letterSpacing: '0.18em', fontWeight: 800, color: rgba(p.rgb, .7), textTransform: 'uppercase', fontFamily: 'monospace' }}>{p.label}</span>
        <div style={{ height: .5, background: `linear-gradient(90deg,${rgba(p.rgb, .5)},transparent)`, width: '70%' }} />
        <div style={{ height: 5, width: '80%', borderRadius: 2, background: rgba(p.rgb, .12) }} />
        <div style={{ height: 3.5, width: '55%', borderRadius: 2, background: rgba(p.rgb, .08) }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 13, position: 'relative' }}>
        {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '1.5px 1.5px 0 0', background: i === 5 ? rgba(p.rgb, .85) : rgba(p.rgb, .22) }} />)}
      </div>
      <div style={{ position: 'absolute', top: 6, left: 6, width: 8, height: 8, borderTop: `1px solid ${rgba(p.rgb, .55)}`, borderLeft: `1px solid ${rgba(p.rgb, .55)}` }} />
      <div style={{ position: 'absolute', bottom: 6, right: 6, width: 8, height: 8, borderBottom: `1px solid ${rgba(p.rgb, .55)}`, borderRight: `1px solid ${rgba(p.rgb, .55)}` }} />
    </div>
  );
}

function SocialCard({ v }: { v: V }) {
  const pals: Record<V, { bg: string; rgb: string; num: string; metric: string; platform: string }> = {
    1: { bg: 'linear-gradient(135deg,#0D1A30,#142040)', rgb: B, num: '12K', metric: 'FOLLOWERS', platform: 'LinkedIn' },
    2: { bg: 'linear-gradient(135deg,#1E1A0A,#241E0E)', rgb: '212,169,106', num: '4.8×', metric: 'ENGAGEMENT', platform: 'Instagram' },
    3: { bg: 'linear-gradient(135deg,#0A1E18,#071512)', rgb: '138,189,168', num: '850+', metric: 'IMPRESSIONS', platform: 'All Platforms' },
  };
  const p = pals[v];
  return (
    <div style={{ width: '100%', height: '100%', background: p.bg, borderRadius: 10, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 1px ${rgba(p.rgb, .22)},0 20px 60px rgba(0,0,0,.6)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 65% at 50% 50%,${rgba(p.rgb, .14)},transparent 75%)` }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 18, height: 1.5, background: rgba(p.rgb, .7) }} />
        <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: rgba(p.rgb, .9), fontFamily: '-apple-system,sans-serif' }}>{p.num}</div>
        <span style={{ fontSize: 3.8, letterSpacing: '0.16em', fontWeight: 700, color: rgba(p.rgb, .5), textTransform: 'uppercase', fontFamily: 'monospace', textAlign: 'center' }}>{p.metric}</span>
        <div style={{ width: 24, height: .5, background: rgba(p.rgb, .25) }} />
        <div style={{ padding: '2px 6px', borderRadius: 20, background: rgba(p.rgb, .12), border: `0.5px solid ${rgba(p.rgb, .38)}` }}>
          <span style={{ fontSize: 4, letterSpacing: '0.08em', fontWeight: 600, color: rgba(p.rgb, .75), textTransform: 'uppercase', fontFamily: 'monospace' }}>{p.platform}</span>
        </div>
      </div>
    </div>
  );
}

function BrochureCard({ v }: { v: V }) {
  const pals: Record<V, { bg: string; rgb: string; strip: string }> = {
    1: { bg: 'linear-gradient(145deg,#141E30,#0D1829)', rgb: L, strip: rgba(L, .9) },
    2: { bg: 'linear-gradient(145deg,#0F1C2E,#0A1220)', rgb: B, strip: rgba(B, .85) },
    3: { bg: 'linear-gradient(145deg,#0E1B2C,#091520)', rgb: '138,188,204', strip: rgba('138,188,204', .88) },
  };
  const p = pals[v];
  const lines = [88, 72, 92, 64, 80];
  return (
    <div style={{ width: '100%', height: '100%', background: p.bg, borderRadius: 10, overflow: 'hidden', display: 'flex', boxShadow: `0 0 0 1px ${rgba(p.rgb, .22)},0 20px 60px rgba(0,0,0,.6)` }}>
      <div style={{ width: 4, flexShrink: 0, background: `linear-gradient(180deg,${p.strip},${rgba(p.rgb, .4)})` }} />
      <div style={{ flex: 1, padding: '9px 10px 8px', display: 'flex', flexDirection: 'column', gap: 5, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 55% at 70% 30%,${rgba(p.rgb, .06)},transparent 70%)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, position: 'relative' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, border: `1.5px solid ${rgba(p.rgb, .5)}`, background: rgba(p.rgb, .07) }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <div style={{ height: 5, width: '90%', borderRadius: 1.5, background: rgba(p.rgb, .2) }} />
            <div style={{ height: 3.5, width: '65%', borderRadius: 1.5, background: rgba(p.rgb, .12) }} />
          </div>
        </div>
        <div style={{ height: .5, background: rgba(p.rgb, .18), position: 'relative' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5, flex: 1, position: 'relative' }}>
          {lines.map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 1.5, background: rgba(p.rgb, i === 0 ? .18 : .1) }} />)}
        </div>
        <div style={{ height: 16, borderRadius: 3, border: `1px solid ${rgba(p.rgb, .2)}`, background: rgba(p.rgb, .05), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 14, height: .5, background: rgba(p.rgb, .3) }} />
        </div>
      </div>
    </div>
  );
}

function ProposalCard({ v }: { v: V }) {
  const pals: Record<V, { bg: string; rgb: string; header: string; pages: string }> = {
    1: { bg: 'linear-gradient(145deg,#101E32,#0A1525)', rgb: L, header: 'RFP RESPONSE', pages: '1 of 24' },
    2: { bg: 'linear-gradient(145deg,#0E1A2E,#080F20)', rgb: B, header: 'BID DOCUMENT', pages: '1 of 18' },
    3: { bg: 'linear-gradient(145deg,#1C1410,#120E0C)', rgb: '184,160,154', header: 'PROPOSAL', pages: '1 of 31' },
  };
  const p = pals[v];
  const l1 = [92, 78, 85, 68], l2 = [80, 90, 72, 86];
  return (
    <div style={{ width: '100%', height: '100%', background: p.bg, borderRadius: 10, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: `0 0 0 1px ${rgba(p.rgb, .22)},0 20px 60px rgba(0,0,0,.6)` }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 50% at 40% 30%,${rgba(p.rgb, .07)},transparent 70%)` }} />
      <div style={{ height: 20, flexShrink: 0, background: rgba(p.rgb, .15), borderBottom: `1px solid ${rgba(p.rgb, .22)}`, display: 'flex', alignItems: 'center', padding: '0 9px', justifyContent: 'space-between', position: 'relative' }}>
        <span style={{ fontSize: 4, letterSpacing: '0.18em', fontWeight: 800, color: rgba(p.rgb, .8), textTransform: 'uppercase', fontFamily: 'monospace' }}>{p.header}</span>
        <div style={{ display: 'flex', gap: 2.5 }}>{[.5, .3].map((o, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: rgba(p.rgb, o) }} />)}</div>
      </div>
      <div style={{ flex: 1, padding: '6px 9px', display: 'flex', flexDirection: 'column', gap: 5, position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <div style={{ height: 3.5, width: '45%', borderRadius: 1.5, background: rgba(p.rgb, .3) }} />
          {l1.map((w, i) => <div key={i} style={{ height: 2.5, width: `${w}%`, borderRadius: 1, background: rgba(p.rgb, i === 0 ? .15 : .09) }} />)}
        </div>
        <div style={{ height: .5, background: rgba(p.rgb, .14) }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <div style={{ height: 3.5, width: '38%', borderRadius: 1.5, background: rgba(p.rgb, .3) }} />
          {l2.map((w, i) => <div key={i} style={{ height: 2.5, width: `${w}%`, borderRadius: 1, background: rgba(p.rgb, i === 0 ? .15 : .09) }} />)}
        </div>
      </div>
      <div style={{ height: 14, flexShrink: 0, borderTop: `0.5px solid ${rgba(p.rgb, .15)}`, padding: '0 9px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ width: 11, height: 11, border: `1px solid ${rgba(p.rgb, .35)}`, borderRadius: 2, background: rgba(p.rgb, .08) }} />
        <span style={{ fontSize: 3.8, letterSpacing: '0.1em', color: rgba(p.rgb, .45), fontFamily: 'monospace' }}>Page {p.pages}</span>
      </div>
    </div>
  );
}

/* ─── Ticker row ─────────────────────────────────────────── */
const CW = 246, CH = 154, CG = 14;

function TickerRow({ cards, dir, speed }: { cards: React.ReactNode[]; dir: 'left' | 'right'; speed: string }) {
  const doubled = [...cards, ...cards];
  return (
    <div style={{ overflow: 'hidden', width: '100%', flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: CG, width: 'max-content', animation: `ticker-${dir} ${speed} linear infinite`, willChange: 'transform' }}>
        {doubled.map((card, i) => (
          <div key={i} style={{ width: CW, height: CH, flexShrink: 0 }}>{card}</div>
        ))}
      </div>
    </div>
  );
}

const ROW1 = [<DeckCard v={1} />, <SocialCard v={1} />, <BrochureCard v={1} />, <ProposalCard v={1} />, <DeckCard v={2} />, <SocialCard v={2} />, <BrochureCard v={2} />, <ProposalCard v={2} />];
const ROW2 = [<SocialCard v={3} />, <DeckCard v={3} />, <ProposalCard v={3} />, <BrochureCard v={3} />, <SocialCard v={1} />, <DeckCard v={1} />, <ProposalCard v={1} />, <BrochureCard v={1} />];
const ROW3 = [<BrochureCard v={2} />, <ProposalCard v={2} />, <DeckCard v={2} />, <SocialCard v={2} />, <BrochureCard v={3} />, <ProposalCard v={3} />, <DeckCard v={1} />, <SocialCard v={3} />];

/* ─── CONCEPT A — Infinite Gallery Ticker ───────────────── */
function ConceptA() {
  const BG = '#080F1C';
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, padding: '8px 0', background: BG }}>
      <TickerRow cards={ROW1} dir="left" speed="28s" />
      <TickerRow cards={ROW2} dir="right" speed="35s" />
      <TickerRow cards={ROW3} dir="left" speed="22s" />

      {/* Edge fades */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '28%', background: `linear-gradient(180deg,${BG},transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', background: `linear-gradient(0deg,${BG},transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '11%', background: `linear-gradient(90deg,${BG},transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '11%', background: `linear-gradient(270deg,${BG},transparent)`, zIndex: 2, pointerEvents: 'none' }} />

      {/* Centered text overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ position: 'absolute', inset: '15% 10%', background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(6,12,24,0.93) 25%, rgba(6,12,24,0.55) 60%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,3.4rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#EEF2F8', marginBottom: '0.75rem', fontFamily: '-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif' }}>
            Intelligent Design,<br />
            <span style={{ color: '#7B9FCC' }}>Executive Presentation,</span><br />
            Delivered at Speed of Thought
          </h1>
          <p style={{ color: 'rgba(238,242,248,.52)', fontSize: '0.92rem', marginBottom: '1.6rem', maxWidth: '36ch', marginLeft: 'auto', marginRight: 'auto' }}>
            AI-assisted pitch decks, slide design & data visualization — all under one roof.
          </p>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2.25rem', background: '#7B9FCC', color: '#060C18', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.025em', borderRadius: 980, textDecoration: 'none' }}>
            Get Your First Slide Free
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── CONCEPT B — Live Slide Build ──────────────────────── */
function ConceptB() {
  const slideRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bars = [42, 58, 50, 76, 68, 100];
  const stats = [{ v: '+127%', l: 'Growth' }, { v: '$2.4M', l: 'Revenue' }, { v: '89%', l: 'Retention' }];

  useEffect(() => {
    if (!slideRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(slideRef.current, { opacity: 0, scale: 0.9, y: 24 });
      gsap.set(headerRef.current, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0 });
      barsRef.current.forEach(b => b && gsap.set(b, { scaleY: 0, transformOrigin: '50% 100%', opacity: 0 }));
      statsRef.current.forEach(s => s && gsap.set(s, { opacity: 0, scale: 0.8, y: 8 }));

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      tl
        .to(slideRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'expo.out' })
        .to(headerRef.current, { opacity: 1, duration: 0.45, ease: 'power2.out' }, '+=0.15')
        .to(textRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to(barsRef.current, { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.055 }, '+=0.1')
        .to(statsRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.7)', stagger: 0.09 }, '+=0.15')
        .to({}, { duration: 2.5 })
        .to([slideRef.current], { opacity: 0, scale: 0.92, y: -16, duration: 0.5, ease: 'power2.in' })
        .set(slideRef.current, { scale: 0.9, y: 24 })
        .set(barsRef.current, { scaleY: 0, opacity: 0 })
        .set(statsRef.current, { opacity: 0, scale: 0.8, y: 8 })
        .set([headerRef.current, textRef.current], { opacity: 0 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, background: '#080F1C', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(123,159,204,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem,3.5vw,3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.028em', color: '#EEF2F8', fontFamily: '-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif' }}>
          Watch your deck<br /><span style={{ color: '#7B9FCC' }}>come to life.</span>
        </h1>
        <p style={{ color: 'rgba(238,242,248,.5)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Every element placed. Every pixel purposeful.</p>
      </div>

      <div ref={slideRef} style={{ width: 'min(500px,86vw)', position: 'relative' }}>
        <div style={{ aspectRatio: '16/9', borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(165deg,#0E1B30,#142240)', boxShadow: '0 0 0 1px rgba(123,159,204,.22),0 40px 100px rgba(0,0,0,.75)', display: 'flex', flexDirection: 'column' }}>
          <div ref={headerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', borderBottom: '1px solid rgba(123,159,204,.1)', background: 'rgba(123,159,204,.04)' }}>
            <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.15em', color: '#7B9FCC', textTransform: 'uppercase', fontFamily: 'system-ui' }}>Q4 2024 — Performance Review</span>
            <div style={{ display: 'flex', gap: 5 }}>{[.9, .4, .18].map((o, i) => <div key={i} style={{ width: 6.5, height: 6.5, borderRadius: '50%', background: `rgba(123,159,204,${o})` }} />)}</div>
          </div>
          <div ref={textRef} style={{ padding: '12px 18px 4px' }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, color: 'rgba(123,159,204,.6)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'system-ui' }}>Revenue Performance</div>
          </div>
          <div style={{ flex: 1, padding: '4px 18px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: '100%' }}>
              {bars.map((h, i) => (
                <div key={i} ref={el => { barsRef.current[i] = el; }} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i === 5 ? 'linear-gradient(180deg,#9AB8D8,#5A85B8)' : `rgba(123,159,204,${.18 + i * .07})` }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', padding: '4px 18px 12px', gap: 7 }}>
            {stats.map(({ v, l }, i) => (
              <div key={l} ref={el => { statsRef.current[i] = el; }} style={{ flex: 1, background: i === 0 ? 'rgba(123,159,204,.14)' : 'rgba(123,159,204,.07)', borderRadius: 9, padding: '6px 9px', border: '1px solid rgba(123,159,204,.12)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 6, color: 'rgba(123,159,204,.5)', fontFamily: 'system-ui', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span style={{ fontSize: '0.65rem', color: 'rgba(123,159,204,.35)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>● DESIGNING IN REAL-TIME</span>
        </div>
      </div>

      <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2.25rem', background: '#7B9FCC', color: '#060C18', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.025em', borderRadius: 980, textDecoration: 'none', position: 'relative' }}>
        Get Your First Slide Free
      </a>
    </div>
  );
}

/* ─── CONCEPT C — Before / After Split ──────────────────── */
function ConceptC() {
  const briefLines = ['Hey,', '', 'Can you make our', 'Q4 data "look good"?', '', '• Add some charts', '• Make it pop!', '• Investor-ready pls', '• Quick turnaround', '', 'Thanks!'];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, background: '#080F1C', position: 'relative', padding: '0 24px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,159,204,.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem,3.5vw,3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.028em', color: '#EEF2F8', fontFamily: '-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif' }}>
          Your brief.<br /><span style={{ color: '#7B9FCC' }}>Our slide.</span>
        </h1>
        <p style={{ color: 'rgba(238,242,248,.5)', fontSize: '0.875rem', marginTop: '0.5rem' }}>The transformation — from raw idea to boardroom-ready.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', width: '100%', maxWidth: 860 }}>
        {/* Before */}
        <div style={{ flex: 1, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(145deg,#0A1020,#0D1525)', border: '1px solid rgba(123,159,204,.12)', padding: '18px 20px', minHeight: 220, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(123,159,204,.4)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>THE BRIEF</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', lineHeight: 1.9, color: 'rgba(238,242,248,.38)', flex: 1 }}>
            {briefLines.map((line, i) => <div key={i} style={{ minHeight: line === '' ? '0.5rem' : 'auto' }}>{line}</div>)}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 2, alignSelf: 'stretch', background: 'linear-gradient(180deg,transparent,rgba(123,159,204,.55) 25%,rgba(154,184,216,.9) 50%,rgba(123,159,204,.55) 75%,transparent)', position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 30, height: 30, borderRadius: '50%', background: '#080F1C', border: '1.5px solid rgba(123,159,204,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#7B9FCC' }}>→</div>
        </div>

        {/* After */}
        <div style={{ flex: 1.5, aspectRatio: '16/10' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(165deg,#0E1B30,#142240)', boxShadow: '0 0 0 1px rgba(123,159,204,.22),0 30px 80px rgba(0,0,0,.7)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(123,159,204,.1)', background: 'rgba(123,159,204,.04)' }}>
              <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.15em', color: '#7B9FCC', textTransform: 'uppercase', fontFamily: 'system-ui' }}>Q4 2024 — Performance Review</span>
              <div style={{ display: 'flex', gap: 4 }}>{[.9, .4, .18].map((o, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: `rgba(123,159,204,${o})` }} />)}</div>
            </div>
            <div style={{ flex: 1, padding: '10px 16px 6px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 68 }}>
                {[42, 58, 50, 76, 68, 100].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i === 5 ? 'linear-gradient(180deg,#9AB8D8,#5A85B8)' : `rgba(123,159,204,${.18 + i * .07})` }} />)}
              </div>
            </div>
            <div style={{ display: 'flex', padding: '2px 16px 10px', gap: 6 }}>
              {[{ v: '+127%', l: 'Growth' }, { v: '$2.4M', l: 'Revenue' }, { v: '89%', l: 'Retention' }].map(({ v, l }, i) => (
                <div key={l} style={{ flex: 1, background: i === 0 ? 'rgba(123,159,204,.14)' : 'rgba(123,159,204,.07)', borderRadius: 8, padding: '5px 8px', border: '1px solid rgba(123,159,204,.12)' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 5.5, color: 'rgba(123,159,204,.5)', fontFamily: 'system-ui', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2.25rem', background: '#7B9FCC', color: '#060C18', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.025em', borderRadius: 980, textDecoration: 'none', position: 'relative' }}>
        Get Your First Slide Free
      </a>
    </div>
  );
}

/* ─── CONCEPT D — Outcome Numbers ───────────────────────── */
const STATS = [
  { num: '$48M+', label: 'Raised by Clients',  sub: 'through our investor decks',     rgb: B },
  { num: '850+',  label: 'Decks Delivered',     sub: 'across 40+ industries globally', rgb: L },
  { num: '92%',   label: 'Client Retention',    sub: 'return for the next project',    rgb: D },
  { num: '24h',   label: 'Average Delivery',    sub: 'from brief to inbox, every time',rgb: B },
];

function ConceptD() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p + 1) % STATS.length); setVisible(true); }, 420);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  const s = STATS[idx];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#080F1C', position: 'relative', overflow: 'hidden', gap: 0 }}>
      {/* Blurred background cards */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: .12, filter: 'blur(3px)', transform: 'scale(1.1)', pointerEvents: 'none' }}>
        <div style={{ width: 280, height: 175 }}><DeckCard v={1} /></div>
        <div style={{ width: 340, height: 212 }}><DeckCard v={2} /></div>
        <div style={{ width: 280, height: 175 }}><SocialCard v={1} /></div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(8,15,28,.75) 30%, rgba(8,15,28,.95) 80%)', pointerEvents: 'none' }} />

      {/* Stat display */}
      <div style={{ textAlign: 'center', position: 'relative', transition: 'opacity 0.4s ease, transform 0.4s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-14px)', padding: '0 24px' }}>
        <div style={{ fontSize: 'clamp(4.5rem,12vw,9rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.05em', background: `linear-gradient(135deg,${rgba(L,.95)} 0%,${rgba(B,.8)} 60%,${rgba(D,.9)} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: '-apple-system,BlinkMacSystemFont,"SF Pro Display",Inter,sans-serif', marginBottom: '0.6rem' }}>
          {s.num}
        </div>
        <div style={{ fontSize: 'clamp(1rem,2.5vw,1.6rem)', fontWeight: 600, color: '#EEF2F8', letterSpacing: '-0.015em', marginBottom: '0.4rem', fontFamily: '-apple-system,sans-serif' }}>{s.label}</div>
        <div style={{ fontSize: '0.875rem', color: 'rgba(238,242,248,.45)', maxWidth: '32ch', margin: '0 auto' }}>{s.sub}</div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 8, marginTop: 40, position: 'relative' }}>
        {STATS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, background: i === idx ? '#7B9FCC' : 'rgba(123,159,204,.25)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
        ))}
      </div>

      {/* Headline + CTA below */}
      <div style={{ textAlign: 'center', position: 'relative', marginTop: 40 }}>
        <p style={{ color: 'rgba(238,242,248,.45)', fontSize: '0.875rem', marginBottom: '1.2rem' }}>
          Intelligent Design, Executive Presentation, Delivered at Speed of Thought
        </p>
        <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2.25rem', background: '#7B9FCC', color: '#060C18', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.025em', borderRadius: 980, textDecoration: 'none' }}>
          Get Your First Slide Free
        </a>
      </div>
    </div>
  );
}

/* ─── Preview Page ───────────────────────────────────────── */
const OPTIONS = [
  { id: 'optA', label: 'A — Gallery',  short: 'A' },
  { id: 'optB', label: 'B — Live Build', short: 'B' },
  { id: 'optC', label: 'C — Before/After', short: 'C' },
  { id: 'optD', label: 'D — Numbers',  short: 'D' },
];

export default function PreviewPage() {
  const [active, setActive] = useState('optA');

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.5 });
    OPTIONS.forEach(o => { const el = document.getElementById(o.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes ticker-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes ticker-right { from { transform: translateX(-50%) } to { transform: translateX(0)    } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #080F1C; color: #EEF2F8; overflow-x: hidden; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Sticky nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'rgba(8,15,28,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(123,159,204,.14)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(238,242,248,.5)', textTransform: 'uppercase', fontFamily: 'monospace' }}>Hero Concept Preview</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {OPTIONS.map(o => (
            <a key={o.id} href={`#${o.id}`} style={{ padding: '5px 14px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none', transition: 'all 0.25s ease', background: active === o.id ? '#7B9FCC' : 'rgba(123,159,204,.1)', color: active === o.id ? '#060C18' : 'rgba(238,242,248,.6)', border: active === o.id ? 'none' : '1px solid rgba(123,159,204,.2)', fontFamily: '-apple-system,sans-serif' }}>
              <span className="hidden sm:inline">{o.label}</span>
              <span className="sm:hidden">{o.short}</span>
            </a>
          ))}
        </div>
      </nav>

      <section id="optA" style={{ height: '100vh', paddingTop: 44 }}><ConceptA /></section>
      <section id="optB" style={{ height: '100vh', paddingTop: 44 }}><ConceptB /></section>
      <section id="optC" style={{ height: '100vh', paddingTop: 44 }}><ConceptC /></section>
      <section id="optD" style={{ height: '100vh', paddingTop: 44 }}><ConceptD /></section>
    </>
  );
}
