import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Individual slide contents ─── */

function SlideRevenue() {
  const bars = [48, 62, 55, 80, 72, 95];
  return (
    <div className="w-full h-full rounded-xl overflow-hidden flex flex-col"
         style={{ background: 'linear-gradient(160deg, #0D1829 0%, #132038 100%)', border: '1px solid rgba(123,159,204,0.2)' }}>
      <div className="flex items-center justify-between px-4 py-2.5"
           style={{ borderBottom: '1px solid rgba(123,159,204,0.12)', background: 'rgba(123,159,204,0.04)' }}>
        <span style={{ fontSize: '6.5px', fontWeight: 700, letterSpacing: '0.14em', color: '#7B9FCC', textTransform: 'uppercase', fontFamily: 'system-ui' }}>
          Q4 2024 Performance Review
        </span>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === 0 ? '#7B9FCC' : 'rgba(123,159,204,0.3)' }} />)}
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px 14px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 54 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 3, height: `${h}%`,
              background: i === 5 ? 'linear-gradient(180deg, #9AB8D8, #7B9FCC)' : `rgba(123,159,204,${0.22 + i * 0.06})` }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          {['Jan','Feb','Mar','Apr','May','Jun'].map(m => (
            <span key={m} style={{ fontSize: 5, color: 'rgba(123,159,204,0.45)', fontFamily: 'system-ui' }}>{m}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '0 14px 10px', gap: 6 }}>
        {[{v:'+127%',l:'Growth'},{v:'$2.4M',l:'Revenue'},{v:'89%',l:'Retention'}].map(({v,l}) => (
          <div key={l} style={{ flex: 1, background: 'rgba(123,159,204,0.07)', borderRadius: 6, padding: '4px 6px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.01em' }}>{v}</div>
            <div style={{ fontSize: 5, color: 'rgba(123,159,204,0.55)', fontFamily: 'system-ui', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTitle() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3"
         style={{ background: 'linear-gradient(145deg, #1A2B4A 0%, #0D1829 60%, #132038 100%)' }}>
      <div style={{ width: 28, height: 2, borderRadius: 1, background: 'rgba(123,159,204,0.5)' }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#EEF2F8', letterSpacing: '0.08em', fontFamily: 'system-ui', textTransform: 'uppercase', lineHeight: 1 }}>
          PITCH
        </div>
        <div style={{ fontSize: 7, fontWeight: 500, color: 'rgba(123,159,204,0.7)', letterSpacing: '0.18em', fontFamily: 'system-ui', textTransform: 'uppercase', marginTop: 5 }}>
          Investor Presentation · 2024
        </div>
      </div>
      <div style={{ width: 28, height: 1, background: 'rgba(123,159,204,0.25)' }} />
      <div style={{ fontSize: 5.5, color: 'rgba(238,242,248,0.3)', letterSpacing: '0.12em', fontFamily: 'system-ui', textTransform: 'uppercase' }}>
        Series A · Confidential
      </div>
    </div>
  );
}

function SlideMetrics() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden"
         style={{ background: '#0A1222', border: '1px solid rgba(123,159,204,0.15)' }}>
      <div style={{ padding: '10px 14px 6px' }}>
        <div style={{ fontSize: 6, fontWeight: 700, color: '#7B9FCC', letterSpacing: '0.14em', fontFamily: 'system-ui', textTransform: 'uppercase', marginBottom: 10 }}>
          Key Metrics
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[{n:'850+',l:'Projects / yr'},{n:'200+',l:'Global Clients'},{n:'10+',l:'Years Exp.'},{n:'24h',l:'Turnaround'}].map(({n,l}) => (
            <div key={l} style={{ background: 'rgba(123,159,204,0.07)', borderRadius: 8, padding: '8px 10px', border: '1px solid rgba(123,159,204,0.1)' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 5, color: 'rgba(123,159,204,0.55)', fontFamily: 'system-ui', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideProcess() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden"
         style={{ background: 'linear-gradient(160deg, #060C18 0%, #0F1C35 100%)', border: '1px solid rgba(123,159,204,0.12)' }}>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 6, fontWeight: 700, color: '#7B9FCC', letterSpacing: '0.14em', fontFamily: 'system-ui', textTransform: 'uppercase', marginBottom: 14 }}>
          Our Process
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['Brief','Design','Review','Deliver'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? '1' : 'none' }}>
              <div style={{ textAlign: 'center', minWidth: 32 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', margin: '0 auto 4px',
                  border: `1.5px solid ${i === 1 ? '#7B9FCC' : 'rgba(123,159,204,0.35)'}`,
                  background: i === 1 ? 'rgba(123,159,204,0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 7, fontWeight: 700, color: i === 1 ? '#7B9FCC' : 'rgba(238,242,248,0.5)', fontFamily: 'system-ui' }}>
                    {i + 1}
                  </span>
                </div>
                <div style={{ fontSize: 5, color: i === 1 ? '#7B9FCC' : 'rgba(238,242,248,0.45)', fontFamily: 'system-ui', fontWeight: i === 1 ? 600 : 400 }}>
                  {step}
                </div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 1, background: 'rgba(123,159,204,0.2)', margin: '0 2px 16px' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideProposal() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden"
         style={{ background: 'linear-gradient(145deg, #132038, #1A2B4A)' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg, #7B9FCC, #9AB8D8)' }} />
      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.01em', marginBottom: 8 }}>
          Executive Summary
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
          {[90, 75, 60, 45].map((w, i) => (
            <div key={i} style={{ height: 3.5, width: `${w}%`, borderRadius: 2, background: `rgba(123,159,204,${0.18 + i * 0.04})` }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, height: 28, borderRadius: 6, background: 'rgba(123,159,204,0.08)', border: '1px solid rgba(123,159,204,0.15)' }} />
          <div style={{ flex: 1, height: 28, borderRadius: 6, background: 'rgba(123,159,204,0.12)', border: '1px solid rgba(123,159,204,0.2)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Slide config ─── */
interface SlideConfig {
  content: React.ReactNode;
  final: { x: number; y: number; z: number; rotX: number; rotY: number; rotZ: number };
  float: { y: number; duration: number; delay: number };
  delay: number;
  w: number;
  h: number;
}

const SLIDES: SlideConfig[] = [
  {
    content: <SlideRevenue />,
    final: { x: 0, y: 0, z: 60, rotX: -8, rotY: -3, rotZ: 1.5 },
    float: { y: -10, duration: 3.2, delay: 0 },
    delay: 0,
    w: 320, h: 180,
  },
  {
    content: <SlideTitle />,
    final: { x: -210, y: -25, z: -50, rotX: -4, rotY: -32, rotZ: -3 },
    float: { y: -7, duration: 3.8, delay: 0.4 },
    delay: 0.07,
    w: 240, h: 135,
  },
  {
    content: <SlideMetrics />,
    final: { x: 215, y: -15, z: -55, rotX: -5, rotY: 32, rotZ: 3 },
    float: { y: -8, duration: 3.5, delay: 0.7 },
    delay: 0.12,
    w: 240, h: 135,
  },
  {
    content: <SlideProcess />,
    final: { x: -340, y: -70, z: -140, rotX: -3, rotY: -46, rotZ: -5 },
    float: { y: -5, duration: 4.1, delay: 1.1 },
    delay: 0.18,
    w: 210, h: 118,
  },
  {
    content: <SlideProposal />,
    final: { x: 310, y: 65, z: -120, rotX: -12, rotY: 43, rotZ: 4 },
    float: { y: -6, duration: 3.7, delay: 0.9 },
    delay: 0.22,
    w: 210, h: 118,
  },
];

export default function HeroSlides() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slides = document.querySelectorAll('.hero-slide');

    // Set initial state: all stacked at origin, invisible
    gsap.set(slides, { opacity: 0, scale: 0.55, x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 });
    gsap.set(sceneRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Fade in container
      gsap.to(sceneRef.current, { opacity: 1, duration: 0.6, delay: 0.8 });

      // Explosion: stagger slides to final positions
      SLIDES.forEach((cfg, i) => {
        gsap.to(slides[i], {
          opacity: 1,
          scale: 1,
          x: cfg.final.x,
          y: cfg.final.y,
          z: cfg.final.z,
          rotationX: cfg.final.rotX,
          rotationY: cfg.final.rotY,
          rotationZ: cfg.final.rotZ,
          duration: 1.4,
          ease: 'power4.out',
          delay: 1.0 + cfg.delay,
        });
      });

      // Gentle floating after explosion settles
      SLIDES.forEach((cfg, i) => {
        gsap.to(slides[i], {
          y: `+=${cfg.float.y}`,
          duration: cfg.float.duration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.6 + cfg.float.delay,
        });
      });

      // Scroll parallax: tilt forward
      if (containerRef.current) {
        gsap.to(sceneRef.current, {
          rotationX: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
        // Front slide parallax Y
        gsap.to(slides[0], {
          y: `+=40`,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: 'clamp(340px, 52vh, 520px)' }}
      aria-hidden="true"
    >
      <div
        ref={sceneRef}
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transformStyle: 'preserve-3d',
          transform: 'translate(-50%, -50%)',
          perspective: '1200px',
        }}
      >
        {SLIDES.map((cfg, i) => (
          <div
            key={i}
            className="hero-slide absolute"
            style={{
              width: cfg.w,
              height: cfg.h,
              marginLeft: -cfg.w / 2,
              marginTop: -cfg.h / 2,
              borderRadius: 12,
              transformStyle: 'preserve-3d',
              filter: `drop-shadow(0 ${16 + i * 4}px ${40 + i * 8}px rgba(0,0,0,${0.55 - i * 0.04}))`,
              willChange: 'transform, opacity',
            }}
          >
            {cfg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
