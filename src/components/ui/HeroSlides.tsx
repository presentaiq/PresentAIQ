import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Slide card components ─── */

function SlideRevenue({ large }: { large?: boolean }) {
  const bars = [42, 58, 50, 76, 68, 100];
  const p = large ? 1.25 : 1;
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(165deg,#0E1B30 0%,#142240 100%)', boxShadow: '0 0 0 1px rgba(123,159,204,0.22), 0 40px 100px rgba(0,0,0,0.75)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${11*p}px ${20*p}px`, borderBottom: '1px solid rgba(123,159,204,0.1)', background: 'rgba(123,159,204,0.04)' }}>
        <span style={{ fontSize: 8*p, fontWeight: 700, letterSpacing: '0.15em', color: '#7B9FCC', textTransform: 'uppercase', fontFamily: 'system-ui' }}>Q4 2024 — Performance Review</span>
        <div style={{ display: 'flex', gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7*p, height: 7*p, borderRadius: '50%', background: i===0?'rgba(123,159,204,0.9)':i===1?'rgba(123,159,204,0.4)':'rgba(123,159,204,0.18)' }} />)}</div>
      </div>
      <div style={{ flex: 1, padding: `${14*p}px ${20*p}px ${10*p}px` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6*p, height: 72*p }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 5, height: `${h}%`, position: 'relative', background: i===5?'linear-gradient(180deg,#9AB8D8 0%,#5A85B8 100%)':`rgba(123,159,204,${0.18+i*0.07})` }}>
              {i===5 && <div style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#9AB8D8' }} />}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {['Jan','Feb','Mar','Apr','May','Jun'].map(m => <span key={m} style={{ fontSize: 6.5*p, color: 'rgba(123,159,204,0.4)', fontFamily: 'system-ui' }}>{m}</span>)}
        </div>
      </div>
      <div style={{ display: 'flex', padding: `2px ${20*p}px ${14*p}px`, gap: 8*p }}>
        {[{v:'+127%',l:'Growth',c:'rgba(123,159,204,0.14)'},{v:'$2.4M',l:'Revenue',c:'rgba(123,159,204,0.09)'},{v:'89%',l:'Retention',c:'rgba(123,159,204,0.09)'}].map(({v,l,c}) => (
          <div key={l} style={{ flex: 1, background: c, borderRadius: 10*p, padding: `${7*p}px ${10*p}px`, border: '1px solid rgba(123,159,204,0.12)' }}>
            <div style={{ fontSize: 14*p, fontWeight: 800, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 6.5*p, color: 'rgba(123,159,204,0.5)', fontFamily: 'system-ui', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTitle() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'linear-gradient(150deg,#1E304E 0%,#0D1829 55%,#142038 100%)', boxShadow: '0 0 0 1px rgba(123,159,204,0.18), 0 30px 70px rgba(0,0,0,0.65)' }}>
      <div style={{ width: 36, height: 1.5, borderRadius: 1, background: 'linear-gradient(90deg,transparent,rgba(123,159,204,0.6),transparent)' }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#EEF2F8', letterSpacing: '0.1em', fontFamily: 'system-ui', textTransform: 'uppercase', lineHeight: 1 }}>PITCH</div>
        <div style={{ fontSize: 7.5, fontWeight: 500, color: 'rgba(123,159,204,0.65)', letterSpacing: '0.2em', fontFamily: 'system-ui', textTransform: 'uppercase', marginTop: 8 }}>Investor Deck · 2024</div>
      </div>
      <div style={{ width: 24, height: 1, background: 'rgba(123,159,204,0.2)' }} />
      <div style={{ fontSize: 6, color: 'rgba(238,242,248,0.25)', letterSpacing: '0.12em', fontFamily: 'system-ui', textTransform: 'uppercase' }}>Series A · Confidential</div>
    </div>
  );
}

function SlideMetrics() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(160deg,#0A1424 0%,#0D1829 100%)', boxShadow: '0 0 0 1px rgba(123,159,204,0.15), 0 30px 70px rgba(0,0,0,0.65)' }}>
      <div style={{ padding: '13px 18px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(123,159,204,0.7)', letterSpacing: '0.16em', fontFamily: 'system-ui', textTransform: 'uppercase' }}>Key Metrics</div>
          <div style={{ width: 16, height: 1, background: 'rgba(123,159,204,0.25)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{n:'850+',l:'Projects / yr'},{n:'200+',l:'Global Clients'},{n:'10+',l:'Years Exp.'},{n:'24h',l:'Turnaround'}].map(({n,l},i) => (
            <div key={l} style={{ background: i===0?'rgba(123,159,204,0.12)':'rgba(123,159,204,0.06)', borderRadius: 10, padding: '10px 12px', border: `1px solid rgba(123,159,204,${i===0?0.18:0.08})` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: i===0?'#9AB8D8':'#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.025em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 6.5, color: 'rgba(123,159,204,0.45)', fontFamily: 'system-ui', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Desktop 3-card config ─── */
const SLIDES = [
  {
    el: <SlideRevenue />,
    rest:     { x:   0, y:   0, z: 100, rotX: -5,  rotY:  -2, rotZ:  0   },
    exploded: { x:   0, y: -320, z: 700, rotX:  22, rotY:   0, rotZ:  0   },
    w: 500, h: 281,
  },
  {
    el: <SlideTitle />,
    rest:     { x: -330, y: 32, z: -90,  rotX: -4,  rotY: -45, rotZ: -2.5 },
    exploded: { x:-1050, y: -60, z:-300, rotX: -3,  rotY: -78, rotZ: -16  },
    w: 280, h: 157,
  },
  {
    el: <SlideMetrics />,
    rest:     { x:  330, y: 32, z: -90,  rotX: -4,  rotY:  45, rotZ:  2.5 },
    exploded: { x: 1050, y: -60, z:-300, rotX: -3,  rotY:  78, rotZ:  16  },
    w: 280, h: 157,
  },
];

interface Props {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function HeroSlides({ sectionRef }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const posWrapRef    = useRef<HTMLDivElement>(null);
  const sceneRef      = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile]     = useState(false);
  const [sceneScale, setSceneScale] = useState(1);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSceneScale(Math.min(1, Math.max(0.52, window.innerWidth / 1100)));
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Mobile animation: single card zoom-through ── */
  useEffect(() => {
    if (!isMobile || !mobileCardRef.current || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(mobileCardRef.current,
        { opacity: 0, y: 40, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'expo.out', delay: 0.4 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(mobileCardRef.current, { scale: 1.35, opacity: 0, y: -60, ease: 'power2.in' }, 0)
        .to('.hero-text-content', { opacity: 0, y: -50, ease: 'power2.in' }, 0.3);
    });

    return () => ctx.revert();
  }, [isMobile, sectionRef]);

  /* ── Desktop animation: 3-card 3D explosion ── */
  useEffect(() => {
    if (isMobile || !containerRef.current || !sceneRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slideEls = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('.hero-slide-3d')
    );

    const ctx = gsap.context(() => {
      gsap.set(sceneRef.current, { opacity: 0 });
      gsap.set(slideEls, { opacity: 0, scale: 0.4, x: 0, y: 20, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 });

      /* Cinematic entry — center first, then sides fan out */
      const entry = gsap.timeline({ delay: 0.35 });
      entry.to(sceneRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      entry.to(slideEls[0], {
        opacity: 1, scale: 1,
        x: SLIDES[0].rest.x, y: SLIDES[0].rest.y, z: SLIDES[0].rest.z,
        rotationX: SLIDES[0].rest.rotX, rotationY: SLIDES[0].rest.rotY, rotationZ: SLIDES[0].rest.rotZ,
        duration: 1.5, ease: 'expo.out',
      }, 0.08);
      [1, 2].forEach((idx, j) => {
        entry.to(slideEls[idx], {
          opacity: 1, scale: 1,
          x: SLIDES[idx].rest.x, y: SLIDES[idx].rest.y, z: SLIDES[idx].rest.z,
          rotationX: SLIDES[idx].rest.rotX, rotationY: SLIDES[idx].rest.rotY, rotationZ: SLIDES[idx].rest.rotZ,
          duration: 1.7, ease: 'expo.out',
        }, 0.2 + j * 0.1);
      });

      /* Ambient orbital — single tween on whole scene */
      const ambient = gsap.to(sceneRef.current, {
        rotationY: 4, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.6,
      });

      if (!sectionRef.current) return;

      const explodeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onEnter:     () => ambient.pause(),
          onLeaveBack: () => ambient.resume(),
        },
      });

      /* Center surges through the camera; sides scatter */
      explodeTl.to(slideEls[0], {
        x: SLIDES[0].exploded.x, y: SLIDES[0].exploded.y, z: SLIDES[0].exploded.z,
        rotationX: SLIDES[0].exploded.rotX, ease: 'power2.inOut',
      }, 0);
      [1, 2].forEach(idx => {
        explodeTl.to(slideEls[idx], {
          x: SLIDES[idx].exploded.x, y: SLIDES[idx].exploded.y, z: SLIDES[idx].exploded.z,
          rotationX: SLIDES[idx].exploded.rotX, rotationY: SLIDES[idx].exploded.rotY, rotationZ: SLIDES[idx].exploded.rotZ,
          ease: 'power3.inOut',
        }, 0);
      });

      explodeTl
        .to(sceneRef.current, { rotationX: -20, ease: 'power1.inOut' }, 0)
        .to('.hero-text-content', { opacity: 0, y: -50, ease: 'power2.in' }, 0.3)
        .to(sceneRef.current, { opacity: 0, ease: 'power2.in' }, 0.76);
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, sectionRef]);

  /* ── Mobile layout ── */
  if (isMobile) {
    const mw = Math.min(window.innerWidth * 0.88, 380);
    const mh = Math.round(mw * (281 / 500));
    return (
      <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
        {/* Glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,159,204,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div
          ref={mobileCardRef}
          style={{ width: mw, height: mh, flexShrink: 0, willChange: 'transform, opacity' }}
        >
          <SlideRevenue large />
        </div>
      </div>
    );
  }

  /* ── Desktop layout ── */
  return (
    <div ref={containerRef} className="relative w-full h-full" aria-hidden="true">
      {/* Static glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '65%', height: '70%', background: 'radial-gradient(ellipse, rgba(123,159,204,0.07) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, perspective: '1200px', perspectiveOrigin: '50% 46%' }}>
        <div
          ref={posWrapRef}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) scale(${sceneScale})` }}
        >
          <div ref={sceneRef} style={{ transformStyle: 'preserve-3d', position: 'relative' }}>
            {SLIDES.map((cfg, i) => (
              <div
                key={i}
                className="hero-slide-3d"
                style={{
                  position: 'absolute',
                  width: cfg.w, height: cfg.h,
                  marginLeft: -cfg.w / 2, marginTop: -cfg.h / 2,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
              >
                {cfg.el}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
