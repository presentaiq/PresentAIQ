import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
type Category = 'All' | 'Pitch Decks' | 'Proposals' | 'Reports' | 'Social';

type SlideType =
  | 'cover' | 'problem' | 'solution' | 'market' | 'metrics'
  | 'timeline' | 'team' | 'financials' | 'cta' | 'comparison';

interface Slide { type: SlideType; }

interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, 'All'>;
  accent: string;         // css color
  accentRgb: string;      // "r,g,b" for rgba()
  slides: Slide[];
}

/* ─── Project data ─── */
const PROJECTS: Project[] = [
  {
    id: 'series-a',
    title: 'Series A Investor Deck',
    client: 'FinTech · Dubai',
    category: 'Pitch Decks',
    accent: '#7B9FCC',
    accentRgb: '123,159,204',
    slides: [
      { type: 'cover' },
      { type: 'problem' },
      { type: 'solution' },
      { type: 'market' },
      { type: 'metrics' },
      { type: 'financials' },
      { type: 'cta' },
    ],
  },
  {
    id: 'growth-strategy',
    title: 'Growth Strategy Deck',
    client: 'SaaS Startup · London',
    category: 'Pitch Decks',
    accent: '#9AB8D8',
    accentRgb: '154,184,216',
    slides: [
      { type: 'cover' },
      { type: 'market' },
      { type: 'metrics' },
      { type: 'timeline' },
      { type: 'team' },
      { type: 'cta' },
    ],
  },
  {
    id: 'rfp-response',
    title: 'Government RFP Response',
    client: 'Infrastructure Ministry',
    category: 'Proposals',
    accent: '#8ABCCC',
    accentRgb: '138,188,204',
    slides: [
      { type: 'cover' },
      { type: 'solution' },
      { type: 'comparison' },
      { type: 'timeline' },
      { type: 'metrics' },
      { type: 'cta' },
    ],
  },
  {
    id: 'annual-report',
    title: 'Annual Impact Report',
    client: 'NGO · Global',
    category: 'Reports',
    accent: '#7BA8D4',
    accentRgb: '123,168,212',
    slides: [
      { type: 'cover' },
      { type: 'metrics' },
      { type: 'market' },
      { type: 'timeline' },
      { type: 'team' },
      { type: 'cta' },
    ],
  },
  {
    id: 'board-pack',
    title: 'Board Pack Q4 2024',
    client: 'Manufacturing Corp',
    category: 'Reports',
    accent: '#6A94BC',
    accentRgb: '106,148,188',
    slides: [
      { type: 'cover' },
      { type: 'financials' },
      { type: 'metrics' },
      { type: 'comparison' },
      { type: 'market' },
      { type: 'cta' },
    ],
  },
  {
    id: 'linkedin-series',
    title: 'LinkedIn Carousel Series',
    client: 'Tech Brand · Global',
    category: 'Social',
    accent: '#5A85B8',
    accentRgb: '90,133,184',
    slides: [
      { type: 'cover' },
      { type: 'problem' },
      { type: 'solution' },
      { type: 'metrics' },
      { type: 'cta' },
    ],
  },
];

const CATEGORIES: Category[] = ['All', 'Pitch Decks', 'Proposals', 'Reports', 'Social'];

/* ─── Slide renderers (full-size, viewer context) ─── */

interface SlideProps { accent: string; rgb: string; idx: number; total: number; title: string; }

function CoverSlide({ accent, rgb, title, client }: SlideProps & { client: string }) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(145deg, #0A1525 0%, #0E1B30 60%, #132038 100%)`,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 20% 40%, ${a(0.12)} 0%, transparent 65%)` }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div style={{ position: 'absolute', bottom: 'clamp(1.5rem,4vw,3rem)', right: 'clamp(1.5rem,4vw,3rem)', opacity: 0.18 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="39" stroke={accent} strokeWidth="1" />
          <circle cx="40" cy="40" r="28" stroke={accent} strokeWidth="0.5" />
          <line x1="1" y1="40" x2="79" y2="40" stroke={accent} strokeWidth="0.5" />
          <line x1="40" y1="1" x2="40" y2="79" stroke={accent} strokeWidth="0.5" />
        </svg>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: 'clamp(1rem,3vw,2rem)' }}>
          <div style={{ width: '32px', height: '3px', background: accent, borderRadius: '2px' }} />
          <span style={{ fontSize: 'clamp(9px,1.2vw,13px)', letterSpacing: '0.22em', fontWeight: 700, color: a(0.7), textTransform: 'uppercase', fontFamily: 'monospace' }}>
            CONFIDENTIAL · 2024
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.03em', color: '#EEF2F8', marginBottom: 'clamp(0.6rem,1.5vw,1rem)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
        }}>
          {title}
        </h2>
        <p style={{ fontSize: 'clamp(0.8rem,1.5vw,1.1rem)', color: a(0.6), fontWeight: 300, marginBottom: 'clamp(1.5rem,4vw,3rem)' }}>
          {client}
        </p>
        <div style={{ display: 'flex', gap: 'clamp(1rem,2.5vw,2rem)' }}>
          {['Executive Summary', 'Prepared for Board', 'Q4 2024'].map((tag) => (
            <div key={tag} style={{ padding: '6px 14px', borderRadius: '980px', border: `1px solid ${a(0.25)}`, background: a(0.06) }}>
              <span style={{ fontSize: 'clamp(8px,1vw,11px)', letterSpacing: '0.1em', fontWeight: 600, color: a(0.65), textTransform: 'uppercase', fontFamily: 'monospace' }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProblemSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const points = [
    'Fragmented tools create inconsistent brand messaging across all touchpoints',
    'Manual slide creation consumes 15+ hours per week in leadership time',
    'Lack of data visualization skills leads to missed stakeholder opportunities',
    'Offshore design quality is unreliable with long turnaround cycles',
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(160deg, #0D1829 0%, #080F1C 100%)',
      display: 'flex', flexDirection: 'column',
      padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `radial-gradient(ellipse 80% 80% at 100% 50%, ${a(0.06)} 0%, transparent 70%)` }} />
      <div style={{ marginBottom: 'clamp(1rem,2.5vw,2rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>02 — THE PROBLEM</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          Presentations are costing<br /><span style={{ color: accent }}>you business.</span>
        </h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem,1.5vw,1.1rem)', zIndex: 1, flex: 1 }}>
        {points.map((pt, i) => (
          <div key={i} style={{ display: 'flex', gap: 'clamp(0.75rem,1.5vw,1.25rem)', alignItems: 'flex-start', padding: 'clamp(0.75rem,1.5vw,1rem) clamp(1rem,2vw,1.5rem)', borderRadius: '12px', background: a(0.05), border: `1px solid ${a(0.1)}` }}>
            <div style={{ width: 'clamp(20px,2.5vw,28px)', height: 'clamp(20px,2.5vw,28px)', borderRadius: '50%', background: a(0.15), border: `1px solid ${a(0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
              <span style={{ fontSize: 'clamp(8px,1vw,11px)', fontWeight: 700, color: accent, fontFamily: 'monospace' }}>0{i + 1}</span>
            </div>
            <p style={{ fontSize: 'clamp(0.72rem,1.3vw,0.95rem)', color: 'rgba(238,242,248,0.75)', lineHeight: 1.55, margin: 0 }}>{pt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const cols = [
    { icon: '◈', head: 'AI-Powered Design', body: 'Intelligent layouts and visual systems built around your brand guidelines' },
    { icon: '◉', head: 'Expert Human Touch', body: 'Senior designers refine every pixel ensuring executive-level polish' },
    { icon: '◎', head: '24-Hour Delivery', body: 'From brief to finished deck in one business day, guaranteed' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #0E1B30 0%, #0A1525 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 70% at 50% 100%, ${a(0.08)} 0%, transparent 65%)` }} />
      <div style={{ marginBottom: 'clamp(1.2rem,2.5vw,2rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>03 — OUR SOLUTION</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          One platform. <span style={{ color: accent }}>Infinite impact.</span>
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(0.75rem,1.5vw,1.25rem)', flex: 1, zIndex: 1 }}>
        {cols.map((c) => (
          <div key={c.head} style={{ padding: 'clamp(1rem,2vw,1.75rem)', borderRadius: '16px', background: a(0.06), border: `1px solid ${a(0.14)}`, display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.8rem)' }}>
            <span style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: accent }}>{c.icon}</span>
            <h4 style={{ fontSize: 'clamp(0.8rem,1.5vw,1.05rem)', fontWeight: 700, color: '#EEF2F8', margin: 0, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>{c.head}</h4>
            <p style={{ fontSize: 'clamp(0.68rem,1.2vw,0.85rem)', color: 'rgba(238,242,248,0.6)', margin: 0, lineHeight: 1.6 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const bars = [28, 45, 38, 62, 55, 80, 74, 92];
  const labels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(150deg, #080F1C 0%, #0D1829 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '-5%', top: '10%', width: '45%', height: '80%', background: `radial-gradient(ellipse 70% 70% at 70% 50%, ${a(0.1)} 0%, transparent 70%)` }} />
      <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>04 — MARKET OPPORTUNITY</span>
          <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.4rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
            $48B <span style={{ color: accent }}>TAM</span> by 2027
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 'clamp(0.8rem,1.8vw,1.3rem)', fontWeight: 700, color: accent }}>↑ 34% CAGR</div>
          <div style={{ fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', color: 'rgba(238,242,248,0.45)' }}>YoY growth rate</div>
        </div>
      </div>
      <div style={{ flex: 1, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 'clamp(4px,0.8vw,10px)', padding: 'clamp(1rem,2vw,1.5rem)', borderRadius: '14px', background: a(0.05), border: `1px solid ${a(0.1)}` }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '100%', height: `${h}%`, borderRadius: '4px 4px 0 0', background: i === 7 ? accent : a(0.25), transition: 'height 0.3s' }} />
              <span style={{ fontSize: 'clamp(6px,0.9vw,10px)', color: 'rgba(238,242,248,0.35)', fontFamily: 'monospace' }}>{labels[i]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
          {[['SAM', '$8.2B'], ['SOM', '$420M'], ['Pipeline', '$2.1M']].map(([l, v]) => (
            <div key={l} style={{ padding: 'clamp(0.6rem,1.2vw,1rem)', borderRadius: '10px', background: a(0.07), border: `1px solid ${a(0.12)}`, textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(0.9rem,2vw,1.4rem)', fontWeight: 800, color: accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 'clamp(7px,1vw,10px)', letterSpacing: '0.15em', color: 'rgba(238,242,248,0.4)', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: '3px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricsSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const kpis = [
    { val: '850+', label: 'Decks Delivered', sub: 'since 2021' },
    { val: '92%', label: 'Client Satisfaction', sub: 'NPS score' },
    { val: '24h', label: 'Avg Turnaround', sub: 'guaranteed SLA' },
    { val: '$2.3B', label: 'Capital Raised', sub: 'via our decks' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0A1525 0%, #0E1B30 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${a(0.09)} 0%, transparent 65%)` }} />
      <div style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>05 — KEY METRICS</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          Numbers that <span style={{ color: accent }}>speak for us.</span>
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(0.75rem,1.5vw,1.25rem)', flex: 1, zIndex: 1 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ padding: 'clamp(1.25rem,2.5vw,2rem)', borderRadius: '16px', background: a(0.06), border: `1px solid ${a(0.12)}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: accent, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>{k.val}</div>
            <div style={{ fontSize: 'clamp(0.75rem,1.4vw,1rem)', fontWeight: 600, color: '#EEF2F8', marginTop: '0.4rem' }}>{k.label}</div>
            <div style={{ fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', color: 'rgba(238,242,248,0.4)', marginTop: '2px' }}>{k.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const steps = [
    { phase: 'Phase 1', label: 'Discovery', detail: 'Brand audit & brief alignment', q: 'Q1 2024' },
    { phase: 'Phase 2', label: 'Design', detail: 'Wireframes, templates, slide system', q: 'Q2 2024' },
    { phase: 'Phase 3', label: 'Delivery', detail: 'Final deck + asset library handoff', q: 'Q3 2024' },
    { phase: 'Phase 4', label: 'Scale', detail: 'Training & ongoing retainer support', q: 'Q4 2024' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #0E1B30 0%, #080F1C 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '15%', top: '30%', width: '70%', height: '2px', background: `linear-gradient(90deg, transparent, ${a(0.3)}, transparent)`, zIndex: 0 }} />
      <div style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>06 — ROADMAP</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          12-month <span style={{ color: accent }}>execution plan.</span>
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(0.6rem,1.2vw,1rem)', flex: 1, zIndex: 1 }}>
        {steps.map((s, i) => (
          <div key={s.phase} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 'clamp(28px,3vw,38px)', height: 'clamp(28px,3vw,38px)', borderRadius: '50%', background: i === 0 ? accent : a(0.12), border: `2px solid ${i === 0 ? accent : a(0.25)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 'clamp(9px,1.1vw,13px)', fontWeight: 800, color: i === 0 ? '#060C18' : a(0.7), fontFamily: 'monospace' }}>0{i + 1}</span>
              </div>
            </div>
            <div style={{ padding: 'clamp(0.75rem,1.5vw,1.25rem)', borderRadius: '12px', background: a(i === 0 ? 0.1 : 0.04), border: `1px solid ${a(i === 0 ? 0.2 : 0.1)}`, flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: 'clamp(7px,0.9vw,10px)', letterSpacing: '0.15em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>{s.q}</div>
              <div style={{ fontSize: 'clamp(0.8rem,1.5vw,1rem)', fontWeight: 700, color: '#EEF2F8' }}>{s.label}</div>
              <div style={{ fontSize: 'clamp(0.65rem,1.1vw,0.8rem)', color: 'rgba(238,242,248,0.5)', lineHeight: 1.5 }}>{s.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const members = [
    { init: 'AK', name: 'Aisha Khan', role: 'Founder & Creative Director', exp: '12 yrs McKinsey' },
    { init: 'RV', name: 'Raj Verma', role: 'Head of Design', exp: 'ex-Google, Canva' },
    { init: 'SM', name: 'Sofia Müller', role: 'Data Visualisation Lead', exp: 'ex-Bloomberg' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #0A1525 0%, #0E1B30 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 65% 55% at 50% 110%, ${a(0.1)} 0%, transparent 70%)` }} />
      <div style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>07 — THE TEAM</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          Built by <span style={{ color: accent }}>world-class talent.</span>
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(0.75rem,1.5vw,1.25rem)', flex: 1, zIndex: 1 }}>
        {members.map((m) => (
          <div key={m.name} style={{ padding: 'clamp(1.25rem,2.5vw,2rem)', borderRadius: '16px', background: a(0.06), border: `1px solid ${a(0.12)}`, display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 'clamp(48px,6vw,72px)', height: 'clamp(48px,6vw,72px)', borderRadius: '50%', background: `linear-gradient(135deg, ${a(0.25)}, ${a(0.08)})`, border: `2px solid ${a(0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 'clamp(0.9rem,2vw,1.4rem)', fontWeight: 800, color: accent, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>{m.init}</span>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(0.8rem,1.5vw,1.05rem)', fontWeight: 700, color: '#EEF2F8', marginBottom: '3px' }}>{m.name}</div>
              <div style={{ fontSize: 'clamp(0.65rem,1.1vw,0.82rem)', color: a(0.65), fontWeight: 500, marginBottom: '3px' }}>{m.role}</div>
              <div style={{ fontSize: 'clamp(0.6rem,1vw,0.75rem)', color: 'rgba(238,242,248,0.38)' }}>{m.exp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinancialsSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const rows = [
    { label: 'Revenue', y1: '$240K', y2: '$680K', y3: '$1.8M', up: true },
    { label: 'Gross Margin', y1: '62%', y2: '71%', y3: '76%', up: true },
    { label: 'Operating Exp', y1: '$186K', y2: '$320K', y3: '$540K', up: false },
    { label: 'EBITDA', y1: '-$22K', y2: '$164K', y3: '$828K', up: true },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(150deg, #080F1C 0%, #0D1829 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 40% at 80% 0%, ${a(0.07)} 0%, transparent 65%)` }} />
      <div style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>06 — FINANCIALS</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          Strong unit economics, <span style={{ color: accent }}>clear path to profit.</span>
        </h3>
      </div>
      <div style={{ flex: 1, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem,0.8vw,0.65rem)' }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px', padding: '0 clamp(0.75rem,1.5vw,1.25rem)' }}>
          {['', 'FY 2022', 'FY 2023', 'FY 2024E'].map((h) => (
            <div key={h} style={{ fontSize: 'clamp(8px,1vw,11px)', letterSpacing: '0.15em', fontWeight: 700, color: a(0.5), textTransform: 'uppercase', fontFamily: 'monospace', textAlign: h ? 'right' : 'left' }}>{h}</div>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px', padding: 'clamp(0.6rem,1.2vw,1rem) clamp(0.75rem,1.5vw,1.25rem)', borderRadius: '10px', background: a(0.05), border: `1px solid ${a(0.08)}`, alignItems: 'center' }}>
            <div style={{ fontSize: 'clamp(0.72rem,1.3vw,0.9rem)', fontWeight: 600, color: '#EEF2F8' }}>{r.label}</div>
            {[r.y1, r.y2, r.y3].map((v, i) => (
              <div key={i} style={{ fontSize: 'clamp(0.72rem,1.3vw,0.9rem)', fontWeight: i === 2 ? 700 : 400, color: i === 2 ? (r.up ? accent : 'rgba(238,242,248,0.7)') : 'rgba(238,242,248,0.55)', textAlign: 'right', fontFamily: 'monospace' }}>{v}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonSlide({ accent, rgb }: SlideProps) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  const criteria = [
    { label: 'Turnaround Time', us: '24 hrs', them: '5–7 days' },
    { label: 'Brand Consistency', us: '100%', them: 'Variable' },
    { label: 'AI-Assisted Workflow', us: '✓', them: '✗' },
    { label: 'Dedicated Account Mgr', us: '✓', them: 'Extra cost' },
    { label: 'Revision Rounds', us: 'Unlimited', them: '2 included' },
    { label: 'Data Visualisation', us: 'Built-in', them: 'Additional fee' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #0D1829 0%, #080F1C 100%)', display: 'flex', flexDirection: 'column', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 55% 60% at 30% 70%, ${a(0.07)} 0%, transparent 65%)` }} />
      <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)', zIndex: 1 }}>
        <span style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>03 — WHY US</span>
        <h3 style={{ fontSize: 'clamp(1.2rem,2.8vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginTop: '0.5rem', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          We simply <span style={{ color: accent }}>outperform.</span>
        </h3>
      </div>
      <div style={{ flex: 1, zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', padding: '0 clamp(0.75rem,1.5vw,1.25rem)', marginBottom: '6px' }}>
          {['', 'PresentAIQ', 'Traditional Agency'].map((h, i) => (
            <div key={i} style={{ fontSize: 'clamp(8px,1vw,11px)', letterSpacing: '0.15em', fontWeight: 700, color: i === 1 ? accent : 'rgba(238,242,248,0.35)', textTransform: 'uppercase', fontFamily: 'monospace', textAlign: i > 0 ? 'center' : 'left' }}>{h}</div>
          ))}
        </div>
        {criteria.map((c, i) => (
          <div key={c.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', padding: 'clamp(0.5rem,1vw,0.75rem) clamp(0.75rem,1.5vw,1.25rem)', borderRadius: '8px', background: i % 2 === 0 ? a(0.04) : 'transparent', alignItems: 'center' }}>
            <div style={{ fontSize: 'clamp(0.68rem,1.2vw,0.85rem)', color: 'rgba(238,242,248,0.65)' }}>{c.label}</div>
            <div style={{ fontSize: 'clamp(0.68rem,1.2vw,0.85rem)', fontWeight: 700, color: accent, textAlign: 'center', fontFamily: 'monospace' }}>{c.us}</div>
            <div style={{ fontSize: 'clamp(0.68rem,1.2vw,0.85rem)', color: 'rgba(238,242,248,0.3)', textAlign: 'center', fontFamily: 'monospace' }}>{c.them}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaSlide({ accent, rgb, title }: SlideProps & { title: string }) {
  const a = (o: number) => `rgba(${rgb},${o})`;
  return (
    <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, #0A1525 0%, #0E1B30 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(2rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 65% at 50% 50%, ${a(0.13)} 0%, transparent 70%)` }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)` }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ width: 'clamp(40px,5vw,64px)', height: 'clamp(40px,5vw,64px)', borderRadius: '50%', border: `2px solid ${a(0.4)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(1rem,2vw,1.5rem)' }}>
          <div style={{ width: 'clamp(14px,2vw,22px)', height: 'clamp(14px,2vw,22px)', borderRadius: '50%', background: accent }} />
        </div>
        <h3 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#EEF2F8', marginBottom: 'clamp(0.6rem,1.5vw,1rem)', lineHeight: 1.1, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
          Ready to <span style={{ color: accent }}>get started?</span>
        </h3>
        <p style={{ fontSize: 'clamp(0.8rem,1.6vw,1.1rem)', color: 'rgba(238,242,248,0.55)', maxWidth: '420px', lineHeight: 1.6, marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
          Get your first slide free. No commitment, no credit card.<br />Just great design, fast.
        </p>
        <div style={{ display: 'inline-flex', gap: 'clamp(0.5rem,1vw,0.75rem)', padding: 'clamp(0.6rem,1.2vw,0.9rem) clamp(1.5rem,3vw,2.5rem)', borderRadius: '980px', background: accent, cursor: 'pointer' }}>
          <span style={{ fontSize: 'clamp(0.75rem,1.3vw,0.9rem)', fontWeight: 700, letterSpacing: '0.04em', color: '#060C18', textTransform: 'uppercase', fontFamily: 'monospace' }}>presentaiq.com · Get Started</span>
        </div>
        <div style={{ marginTop: 'clamp(1.5rem,3vw,2.5rem)', fontSize: 'clamp(0.65rem,1.1vw,0.78rem)', letterSpacing: '0.12em', color: a(0.35), textTransform: 'uppercase', fontFamily: 'monospace' }}>
          {title} · PresentAIQ
        </div>
      </div>
    </div>
  );
}

/* ─── Slide dispatcher ─── */
function SlideContent({ slide, project, idx, total }: { slide: Slide; project: Project; idx: number; total: number }) {
  const props: SlideProps = { accent: project.accent, rgb: project.accentRgb, idx, total, title: project.title };
  switch (slide.type) {
    case 'cover':      return <CoverSlide      {...props} client={project.client} />;
    case 'problem':    return <ProblemSlide    {...props} />;
    case 'solution':   return <SolutionSlide   {...props} />;
    case 'market':     return <MarketSlide     {...props} />;
    case 'metrics':    return <MetricsSlide    {...props} />;
    case 'timeline':   return <TimelineSlide   {...props} />;
    case 'team':       return <TeamSlide       {...props} />;
    case 'financials': return <FinancialsSlide {...props} />;
    case 'comparison': return <ComparisonSlide {...props} />;
    case 'cta':        return <CtaSlide        {...props} title={project.title} />;
    default:           return null;
  }
}

/* ─── Slide Viewer ─── */
function SlideViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);

  /* Entrance */
  useEffect(() => {
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.93, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' });
  }, []);

  const navigate = useCallback((dir: -1 | 1) => {
    if (isAnimating.current) return;
    const next = idx + dir;
    if (next < 0 || next >= project.slides.length) return;
    isAnimating.current = true;

    gsap.to(slideRef.current, {
      opacity: 0, x: dir * -60, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setIdx(next);
        gsap.fromTo(slideRef.current,
          { opacity: 0, x: dir * 60 },
          { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out', onComplete: () => { isAnimating.current = false; } }
        );
      },
    });
  }, [idx, project.slides.length]);

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'Escape')     close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const close = () => {
    gsap.to(containerRef.current, { opacity: 0, scale: 0.94, y: 12, duration: 0.3, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose });
  };

  return (
    <div
      ref={backdropRef}
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1rem,3vw,2.5rem)', background: 'rgba(4,8,18,0.88)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === backdropRef.current) close(); }}
    >
      <div
        ref={containerRef}
        style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 'clamp(9px,1.2vw,12px)', letterSpacing: '0.2em', fontWeight: 700, color: project.accent, textTransform: 'uppercase', fontFamily: 'monospace' }}>{project.category}</div>
            <div style={{ fontSize: 'clamp(0.9rem,1.8vw,1.15rem)', fontWeight: 700, color: '#EEF2F8', marginTop: '2px' }}>{project.title}</div>
          </div>
          <button
            onClick={close}
            aria-label="Close viewer"
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid rgba(123,159,204,0.2)`, background: 'rgba(123,159,204,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(238,242,248,0.7)', fontSize: '18px', lineHeight: 1, flexShrink: 0 }}
          >
            ×
          </button>
        </div>

        {/* Slide frame */}
        <div
          style={{ width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', border: `1px solid rgba(${project.accentRgb},0.2)`, position: 'relative', boxShadow: `0 0 60px rgba(${project.accentRgb},0.12), 0 32px 80px rgba(0,0,0,0.6)` }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
          }}
        >
          <div ref={slideRef} style={{ width: '100%', height: '100%' }}>
            <SlideContent slide={project.slides[idx]} project={project} idx={idx} total={project.slides.length} />
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => navigate(-1)}
            disabled={idx === 0}
            aria-label="Previous slide"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: `1px solid rgba(${project.accentRgb},0.25)`, background: 'rgba(4,8,18,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: idx === 0 ? 'default' : 'pointer', opacity: idx === 0 ? 0.25 : 0.85, color: '#EEF2F8', transition: 'opacity 0.2s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={() => navigate(1)}
            disabled={idx === project.slides.length - 1}
            aria-label="Next slide"
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: `1px solid rgba(${project.accentRgb},0.25)`, background: 'rgba(4,8,18,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: idx === project.slides.length - 1 ? 'default' : 'pointer', opacity: idx === project.slides.length - 1 ? 0.25 : 0.85, color: '#EEF2F8', transition: 'opacity 0.2s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dot nav + counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {project.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i === idx || isAnimating.current) return;
                  const dir = i > idx ? 1 : -1;
                  isAnimating.current = true;
                  gsap.to(slideRef.current, {
                    opacity: 0, x: dir * -60, duration: 0.22, ease: 'power2.in',
                    onComplete: () => {
                      setIdx(i);
                      gsap.fromTo(slideRef.current, { opacity: 0, x: dir * 60 }, { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out', onComplete: () => { isAnimating.current = false; } });
                    },
                  });
                }}
                aria-label={`Go to slide ${i + 1}`}
                style={{ width: i === idx ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === idx ? project.accent : `rgba(${project.accentRgb},0.3)`, border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }}
              />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(238,242,248,0.35)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            {idx + 1} / {project.slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card thumbnail (small, for grid) ─── */
function ProjectCardThumb({ project }: { project: Project }) {
  const a = (o: number) => `rgba(${project.accentRgb},${o})`;
  const bars = [45, 70, 55, 88, 62, 100];
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg,#0A1525,#0E1B30)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px', justifyContent: 'space-between' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 55% at 25% 35%, ${a(0.1)} 0%, transparent 65%)` }} />
      <div style={{ zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '12px', height: '2px', borderRadius: '1px', background: project.accent }} />
          <span style={{ fontSize: '4.5px', letterSpacing: '0.18em', fontWeight: 700, color: a(0.65), textTransform: 'uppercase', fontFamily: 'monospace' }}>{project.category}</span>
        </div>
        <div style={{ fontSize: '5.5px', fontWeight: 800, color: '#EEF2F8', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '75%' }}>{project.title}</div>
      </div>
      <div style={{ zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '1.5px 1.5px 0 0', background: i === 5 ? a(0.85) : a(0.22) }} />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 7, right: 7, zIndex: 1 }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: a(0.5) }} />
      </div>
      <div style={{ position: 'absolute', bottom: 6, right: 7, zIndex: 1 }}>
        <span style={{ fontSize: '4px', color: a(0.45), fontFamily: 'monospace', letterSpacing: '0.1em' }}>{project.slides.length} slides</span>
      </div>
    </div>
  );
}

/* ─── Portfolio Card (grid tile) ─── */
function PortfolioCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      className="portfolio-card group text-left w-full bg-transparent border-0 p-0 cursor-pointer"
      onClick={onOpen}
      aria-label={`Open ${project.title}`}
    >
      <div
        style={{
          aspectRatio: '16/10',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
          position: 'relative',
        }}
        className="group-hover:border-[rgba(123,159,204,0.45)] group-hover:shadow-[0_0_24px_rgba(123,159,204,0.15)] group-hover:-translate-y-1"
      >
        <ProjectCardThumb project={project} />

        {/* Hover play indicator */}
        <div
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', background: 'rgba(4,8,18,0.45)' }}
          className="group-hover:opacity-100"
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(238,242,248,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(238,242,248,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" fill="white" stroke="none" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', color: project.accent, fontFamily: 'monospace', marginBottom: '3px' }}>
          {project.category} · {project.slides.length} slides
        </p>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
          {project.title}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
          {project.client}
        </p>
      </div>
    </button>
  );
}

/* ─── Main Section ─── */
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCat, setActiveCat] = useState<Category>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = activeCat === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCat);

  /* Scroll-entry animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-head',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.portfolio-head', start: 'top 82%' } }
      );
      gsap.fromTo('.portfolio-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: '.portfolio-grid', start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate on category change */
  useEffect(() => {
    gsap.fromTo('.portfolio-card',
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05 }
    );
  }, [activeCat]);

  /* Lock body scroll when viewer is open */
  useEffect(() => {
    document.body.style.overflow = openProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openProject]);

  return (
    <>
      <section id="portfolio" ref={sectionRef} className="scene bg-[var(--bg)]" aria-label="Portfolio">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          <div className="portfolio-head mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-5 font-sans">Portfolio</p>
            <h2 className="text-display-sm">
              Designs that{' '}
              <em className="not-italic" style={{ color: 'var(--gold)' }}>close deals.</em>
            </h2>
            <p className="text-sm mt-3 max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Click any project to browse its slides.
            </p>
          </div>

          {/* Filter pills */}
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
                    flexShrink: 0, padding: '6px 16px', borderRadius: '980px',
                    fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif',
                    cursor: 'pointer',
                    border: isActive ? 'none' : '1px solid rgba(123,159,204,0.2)',
                    background: isActive ? 'var(--gold)' : 'rgba(123,159,204,0.08)',
                    color: isActive ? '#060C18' : 'var(--text-muted)',
                    transition: 'background 0.25s ease, color 0.25s ease',
                    outline: 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="portfolio-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map(project => (
              <PortfolioCard key={project.id} project={project} onOpen={() => setOpenProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* Slide viewer modal */}
      {openProject && (
        <SlideViewer project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </>
  );
}
