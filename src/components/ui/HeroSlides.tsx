import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Slide content components ─── */

function SlideRevenue() {
  const bars = [48, 62, 55, 80, 72, 95];
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #0D1829 0%, #132038 100%)', border: '1px solid rgba(123,159,204,0.22)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', borderBottom: '1px solid rgba(123,159,204,0.12)', background: 'rgba(123,159,204,0.04)' }}>
        <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: '#7B9FCC', textTransform: 'uppercase', fontFamily: 'system-ui' }}>Q4 2024 Performance Review</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#7B9FCC' : 'rgba(123,159,204,0.3)' }} />)}
        </div>
      </div>
      <div style={{ flex: 1, padding: '12px 18px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 70 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 4, height: `${h}%`, background: i === 5 ? 'linear-gradient(180deg, #9AB8D8, #7B9FCC)' : `rgba(123,159,204,${0.22 + i * 0.06})` }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          {['Jan','Feb','Mar','Apr','May','Jun'].map(m => <span key={m} style={{ fontSize: 6, color: 'rgba(123,159,204,0.45)', fontFamily: 'system-ui' }}>{m}</span>)}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '0 18px 12px', gap: 8 }}>
        {[{v:'+127%',l:'Growth'},{v:'$2.4M',l:'Revenue'},{v:'89%',l:'Retention'}].map(({v,l}) => (
          <div key={l} style={{ flex: 1, background: 'rgba(123,159,204,0.07)', borderRadius: 8, padding: '5px 8px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.01em' }}>{v}</div>
            <div style={{ fontSize: 6, color: 'rgba(123,159,204,0.55)', fontFamily: 'system-ui', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTitle() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'linear-gradient(145deg, #1A2B4A 0%, #0D1829 60%, #132038 100%)' }}>
      <div style={{ width: 32, height: 2, borderRadius: 1, background: 'rgba(123,159,204,0.5)' }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#EEF2F8', letterSpacing: '0.08em', fontFamily: 'system-ui', textTransform: 'uppercase', lineHeight: 1 }}>PITCH</div>
        <div style={{ fontSize: 8.5, fontWeight: 500, color: 'rgba(123,159,204,0.7)', letterSpacing: '0.18em', fontFamily: 'system-ui', textTransform: 'uppercase', marginTop: 7 }}>Investor Presentation · 2024</div>
      </div>
      <div style={{ width: 32, height: 1, background: 'rgba(123,159,204,0.25)' }} />
      <div style={{ fontSize: 6.5, color: 'rgba(238,242,248,0.3)', letterSpacing: '0.12em', fontFamily: 'system-ui', textTransform: 'uppercase' }}>Series A · Confidential</div>
    </div>
  );
}

function SlideMetrics() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: '#0A1222', border: '1px solid rgba(123,159,204,0.15)' }}>
      <div style={{ padding: '12px 18px 8px' }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: '#7B9FCC', letterSpacing: '0.14em', fontFamily: 'system-ui', textTransform: 'uppercase', marginBottom: 12 }}>Key Metrics</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{n:'850+',l:'Projects / yr'},{n:'200+',l:'Global Clients'},{n:'10+',l:'Years Exp.'},{n:'24h',l:'Turnaround'}].map(({n,l}) => (
            <div key={l} style={{ background: 'rgba(123,159,204,0.07)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(123,159,204,0.1)' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 6, color: 'rgba(123,159,204,0.55)', fontFamily: 'system-ui', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideProcess() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(160deg, #060C18 0%, #0F1C35 100%)', border: '1px solid rgba(123,159,204,0.12)' }}>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: '#7B9FCC', letterSpacing: '0.14em', fontFamily: 'system-ui', textTransform: 'uppercase', marginBottom: 16 }}>Our Process</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['Brief','Design','Review','Deliver'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
              <div style={{ textAlign: 'center', minWidth: 38 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', margin: '0 auto 5px', border: `1.5px solid ${i === 1 ? '#7B9FCC' : 'rgba(123,159,204,0.35)'}`, background: i === 1 ? 'rgba(123,159,204,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: i === 1 ? '#7B9FCC' : 'rgba(238,242,248,0.5)', fontFamily: 'system-ui' }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 6, color: i === 1 ? '#7B9FCC' : 'rgba(238,242,248,0.45)', fontFamily: 'system-ui', fontWeight: i === 1 ? 600 : 400 }}>{step}</div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 1, background: 'rgba(123,159,204,0.2)', margin: '0 3px 18px' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideProposal() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(145deg, #132038, #1A2B4A)' }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, #7B9FCC, #9AB8D8)' }} />
      <div style={{ padding: '12px 18px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.01em', marginBottom: 10 }}>Executive Summary</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
          {[90, 75, 60, 45].map((w, i) => (
            <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: `rgba(123,159,204,${0.18 + i * 0.04})` }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, height: 34, borderRadius: 8, background: 'rgba(123,159,204,0.08)', border: '1px solid rgba(123,159,204,0.15)' }} />
          <div style={{ flex: 1, height: 34, borderRadius: 8, background: 'rgba(123,159,204,0.12)', border: '1px solid rgba(123,159,204,0.2)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Slide configuration ─── */
interface SlideConfig {
  content: React.ReactNode;
  /* resting position (after page-load entry) */
  rest: { x: number; y: number; z: number; rotX: number; rotY: number; rotZ: number };
  /* fully exploded position (at end of scroll) */
  exploded: { x: number; y: number; z: number; rotX: number; rotY: number; rotZ: number };
  entryDelay: number;
  w: number;
  h: number;
}

const SLIDES: SlideConfig[] = [
  {
    content: <SlideRevenue />,
    rest:     { x: 0,    y: 0,    z: 60,   rotX: -8,  rotY: -3,  rotZ: 1.5 },
    exploded: { x: 20,   y: 30,   z: 220,  rotX: -14, rotY: -4,  rotZ: 2 },
    entryDelay: 0,
    w: 420, h: 236,
  },
  {
    content: <SlideTitle />,
    rest:     { x: -260,  y: -30,  z: -55,  rotX: -4,  rotY: -34, rotZ: -3 },
    exploded: { x: -600,  y: -140, z: -140, rotX: -6,  rotY: -56, rotZ: -9 },
    entryDelay: 0.06,
    w: 310, h: 174,
  },
  {
    content: <SlideMetrics />,
    rest:     { x: 260,   y: -20,  z: -55,  rotX: -5,  rotY: 34,  rotZ: 3 },
    exploded: { x: 600,   y: -110, z: -140, rotX: -6,  rotY: 56,  rotZ: 9 },
    entryDelay: 0.10,
    w: 310, h: 174,
  },
  {
    content: <SlideProcess />,
    rest:     { x: -400,  y: -80,  z: -160, rotX: -3,  rotY: -48, rotZ: -5 },
    exploded: { x: -860,  y: -240, z: -380, rotX: -4,  rotY: -66, rotZ: -12 },
    entryDelay: 0.16,
    w: 270, h: 152,
  },
  {
    content: <SlideProposal />,
    rest:     { x: 370,   y: 70,   z: -140, rotX: -12, rotY: 44,  rotZ: 4 },
    exploded: { x: 780,   y: 200,  z: -340, rotX: -16, rotY: 62,  rotZ: 10 },
    entryDelay: 0.20,
    w: 270, h: 152,
  },
];

interface Props {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function HeroSlides({ sectionRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slideEls = gsap.utils.toArray<HTMLElement>('.hero-slide');

    /* ── 1. Starting state: all stacked at origin ── */
    gsap.set(slideEls, {
      opacity: 0, scale: 0.4,
      x: 0, y: 0, z: 0,
      rotationX: 0, rotationY: 0, rotationZ: 0,
    });
    gsap.set(sceneRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      /* ── 2. Page-load entry: slides burst to resting positions ── */
      gsap.to(sceneRef.current, { opacity: 1, duration: 0.5, delay: 0.6 });

      SLIDES.forEach((cfg, i) => {
        gsap.to(slideEls[i], {
          opacity: 1, scale: 1,
          x: cfg.rest.x, y: cfg.rest.y, z: cfg.rest.z,
          rotationX: cfg.rest.rotX, rotationY: cfg.rest.rotY, rotationZ: cfg.rest.rotZ,
          duration: 1.6,
          ease: 'power4.out',
          delay: 0.7 + cfg.entryDelay,
        });
      });

      /* ── 3. Gentle idle float (starts after entry settles) ── */
      const floatDelays = [0, 0.4, 0.7, 1.1, 0.9];
      const floatAmounts = [-10, -7, -8, -5, -6];
      const floatDurations = [3.2, 3.8, 3.5, 4.1, 3.7];
      SLIDES.forEach((_, i) => {
        gsap.to(slideEls[i], {
          y: `+=${floatAmounts[i]}`,
          duration: floatDurations[i],
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.8 + floatDelays[i],
        });
      });

      /* ── 4. Scroll-driven EXPLOSION ── */
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',   // full 200vh section
          scrub: 1.8,
        },
      });

      /* Slide 0 (front): pushes toward viewer */
      tl.to(slideEls[0], {
        x: SLIDES[0].exploded.x, y: SLIDES[0].exploded.y, z: SLIDES[0].exploded.z,
        rotationX: SLIDES[0].exploded.rotX, rotationY: SLIDES[0].exploded.rotY,
        ease: 'none',
      }, 0);

      /* Slides 1-4: blast outward */
      SLIDES.slice(1).forEach((cfg, i) => {
        tl.to(slideEls[i + 1], {
          x: cfg.exploded.x, y: cfg.exploded.y, z: cfg.exploded.z,
          rotationX: cfg.exploded.rotX, rotationY: cfg.exploded.rotY, rotationZ: cfg.exploded.rotZ,
          ease: 'none',
        }, 0);
      });

      /* Scene: tilt forward as explosion progresses */
      tl.to(sceneRef.current, {
        rotationX: -30,
        ease: 'none',
      }, 0.05);

      /* Content text fades out mid-explosion */
      tl.to('.hero-text-content', {
        opacity: 0,
        y: -50,
        ease: 'none',
      }, 0.45);

      /* Scene itself fades at end */
      tl.to(sceneRef.current, {
        opacity: 0,
        ease: 'none',
      }, 0.80);

    }, containerRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex-shrink-0"
      style={{ height: 'clamp(400px, 58vh, 600px)' }}
      aria-hidden="true"
    >
      {/* perspective wrapper */}
      <div style={{ position: 'absolute', inset: 0, perspective: '1400px', perspectiveOrigin: '50% 42%' }}>
        <div
          ref={sceneRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transformStyle: 'preserve-3d',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {SLIDES.map((cfg, i) => (
            <div
              key={i}
              className="hero-slide"
              style={{
                position: 'absolute',
                width: cfg.w,
                height: cfg.h,
                marginLeft: -cfg.w / 2,
                marginTop: -cfg.h / 2,
                transformStyle: 'preserve-3d',
                filter: `drop-shadow(0 ${20 + i * 4}px ${50 + i * 10}px rgba(0,0,0,${0.6 - i * 0.05}))`,
                willChange: 'transform, opacity',
              }}
            >
              {cfg.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
