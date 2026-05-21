import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Slide card components ─── */

function SlideRevenue({ large }: { large?: boolean }) {
  const bars = [42, 58, 50, 76, 68, 100];
  const p = large ? 1.35 : 1;
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(165deg,#0E1B30 0%,#142240 100%)', boxShadow: '0 0 0 1px rgba(123,159,204,0.22), 0 40px 100px rgba(0,0,0,0.75)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${11*p}px ${20*p}px`, borderBottom: '1px solid rgba(123,159,204,0.1)', background: 'rgba(123,159,204,0.04)' }}>
        <span style={{ fontSize: 7.5*p, fontWeight: 700, letterSpacing: '0.15em', color: '#7B9FCC', textTransform: 'uppercase', fontFamily: 'system-ui' }}>Q4 2024 — Performance Review</span>
        <div style={{ display: 'flex', gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7*p, height: 7*p, borderRadius: '50%', background: i===0?'rgba(123,159,204,0.9)':i===1?'rgba(123,159,204,0.4)':'rgba(123,159,204,0.18)' }} />)}</div>
      </div>
      <div style={{ flex: 1, padding: `${14*p}px ${20*p}px ${10*p}px` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6*p, height: 72*p, position: 'relative' }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 5, height: `${h}%`, background: i===5?'linear-gradient(180deg,#9AB8D8 0%,#5A85B8 100%)':`rgba(123,159,204,${0.18+i*0.07})`, position: 'relative' }}>
              {i===5 && <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 5*p, height: 5*p, borderRadius: '50%', background: '#9AB8D8', boxShadow: '0 0 8px rgba(154,184,216,0.8)' }} />}
            </div>
          ))}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }} preserveAspectRatio="none" aria-hidden="true">
            <polyline
              points="8.3,58 24.9,42 41.6,50 58.3,24 74.9,32 91.6,0"
              fill="none" stroke="rgba(154,184,216,0.3)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {['Jan','Feb','Mar','Apr','May','Jun'].map(m => <span key={m} style={{ fontSize: 6.5*p, color: 'rgba(123,159,204,0.4)', fontFamily: 'system-ui' }}>{m}</span>)}
        </div>
      </div>
      <div style={{ display: 'flex', padding: `2px ${20*p}px ${14*p}px`, gap: 8*p }}>
        {[{v:'+127%',l:'Growth',hi:true},{v:'$2.4M',l:'Revenue',hi:false},{v:'89%',l:'Retention',hi:false}].map(({v,l,hi}) => (
          <div key={l} style={{ flex: 1, background: hi?'rgba(123,159,204,0.14)':'rgba(123,159,204,0.07)', borderRadius: 10*p, padding: `${7*p}px ${10*p}px`, border: '1px solid rgba(123,159,204,0.12)' }}>
            <div style={{ fontSize: 14*p, fontWeight: 800, color: '#EEF2F8', fontFamily: 'system-ui', letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 6.5*p, color: 'rgba(123,159,204,0.5)', fontFamily: 'system-ui', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlidePitch() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg,#1C3052 0%,#0D1829 55%,#091520 100%)', boxShadow: '0 0 0 1px rgba(123,159,204,0.2), 0 30px 70px rgba(0,0,0,0.7)' }}>
      {/* Background glow blob */}
      <div style={{ position:'absolute', top:-10, right:-10, width:90, height:90, borderRadius:'50%', background:'rgba(123,159,204,0.09)', filter:'blur(24px)', pointerEvents:'none' }} />
      {/* Corner brackets */}
      <div style={{ position:'absolute', top:11, left:11, width:16, height:16, borderTop:'1.5px solid rgba(123,159,204,0.5)', borderLeft:'1.5px solid rgba(123,159,204,0.5)' }} />
      <div style={{ position:'absolute', top:11, right:11, width:16, height:16, borderTop:'1.5px solid rgba(123,159,204,0.3)', borderRight:'1.5px solid rgba(123,159,204,0.3)' }} />
      <div style={{ position:'absolute', bottom:11, left:11, width:16, height:16, borderBottom:'1.5px solid rgba(123,159,204,0.3)', borderLeft:'1.5px solid rgba(123,159,204,0.3)' }} />
      <div style={{ position:'absolute', bottom:11, right:11, width:16, height:16, borderBottom:'1.5px solid rgba(123,159,204,0.5)', borderRight:'1.5px solid rgba(123,159,204,0.5)' }} />
      {/* Content */}
      <div style={{ textAlign:'center', padding:'0 18px', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:5, marginBottom:11, background:'rgba(123,159,204,0.1)', border:'1px solid rgba(123,159,204,0.22)', borderRadius:20, padding:'3px 10px' }}>
          <div style={{ width:4, height:4, borderRadius:'50%', background:'#7B9FCC' }} />
          <span style={{ fontSize:6, fontWeight:700, color:'#7B9FCC', letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'system-ui' }}>Series A</span>
        </div>
        <div style={{ fontSize:30, fontWeight:900, color:'#EEF2F8', letterSpacing:'-0.04em', fontFamily:'system-ui', lineHeight:1, marginBottom:9 }}>NOVA</div>
        <div style={{ width:28, height:1.5, background:'linear-gradient(90deg,transparent,rgba(123,159,204,0.7),transparent)', margin:'0 auto 9px' }} />
        <div style={{ fontSize:6.5, fontWeight:500, color:'rgba(154,184,216,0.65)', letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'system-ui' }}>Investor Deck · 2024</div>
      </div>
      {/* Bottom accent */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2.5, background:'linear-gradient(90deg,transparent,rgba(123,159,204,0.45),rgba(154,184,216,0.65),rgba(123,159,204,0.45),transparent)' }} />
    </div>
  );
}

function SlideRoadmap() {
  const phases = [
    { q:'Q1', label:'Discovery', done:true },
    { q:'Q2', label:'Build',     done:true },
    { q:'Q3', label:'Launch',    done:false },
    { q:'Q4', label:'Scale',     done:false },
  ];
  return (
    <div style={{ width:'100%', height:'100%', borderRadius:14, overflow:'hidden', background:'linear-gradient(155deg,#0A1424 0%,#0D1829 100%)', boxShadow:'0 0 0 1px rgba(123,159,204,0.15), 0 30px 70px rgba(0,0,0,0.65)', padding:'13px 16px 12px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:13 }}>
        <div style={{ fontSize:7, fontWeight:700, color:'rgba(123,159,204,0.7)', letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'system-ui' }}>2024 Roadmap</div>
        <div style={{ fontSize:6, color:'rgba(123,159,204,0.35)', fontFamily:'system-ui', letterSpacing:'0.08em' }}>50% complete</div>
      </div>
      {/* Timeline track */}
      <div style={{ position:'relative', marginBottom:14 }}>
        <div style={{ position:'absolute', top:8, left:9, right:9, height:1, background:'rgba(123,159,204,0.12)' }} />
        <div style={{ position:'absolute', top:8, left:9, width:'50%', height:1, background:'linear-gradient(90deg,rgba(123,159,204,0.55),rgba(123,159,204,0.2))' }} />
        <div style={{ display:'flex', justifyContent:'space-between', position:'relative' }}>
          {phases.map(({ q, label, done }) => (
            <div key={q} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ width:17, height:17, borderRadius:'50%', background:done?'rgba(123,159,204,0.2)':'rgba(123,159,204,0.05)', border:`1.5px solid rgba(123,159,204,${done?0.55:0.18})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {done && <div style={{ width:5, height:5, borderRadius:'50%', background:'#7B9FCC' }} />}
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:9, fontWeight:700, color:done?'#9AB8D8':'rgba(123,159,204,0.3)', fontFamily:'system-ui', lineHeight:1 }}>{q}</div>
                <div style={{ fontSize:5.5, color:'rgba(123,159,204,0.38)', fontFamily:'system-ui', marginTop:2, letterSpacing:'0.04em' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
        {[{n:'850+',l:'Projects',hi:true},{n:'$12M',l:'Raised',hi:false},{n:'200+',l:'Clients',hi:false},{n:'24h',l:'Delivery',hi:false}].map(({n,l,hi}) => (
          <div key={l} style={{ background:hi?'rgba(123,159,204,0.1)':'rgba(123,159,204,0.05)', borderRadius:7, padding:'7px 9px', border:`1px solid rgba(123,159,204,${hi?0.14:0.07})` }}>
            <div style={{ fontSize:15, fontWeight:800, color:hi?'#9AB8D8':'#EEF2F8', fontFamily:'system-ui', letterSpacing:'-0.025em', lineHeight:1 }}>{n}</div>
            <div style={{ fontSize:6, color:'rgba(123,159,204,0.4)', fontFamily:'system-ui', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Desktop 3-card config: beautiful fanned arrangement ─── */
const SLIDES = [
  {
    el: <SlideRevenue />,
    // Center card — large, prominent, slightly forward
    rest:   { x:   0, y:-18, z:  80, rotX:-8,  rotY:-2,  rotZ:  0  },
    scroll: { x:   0, y:-85, z:  50, rotX:-26, rotY:-2,  rotZ:  0  },
    w: 520, h: 293,
  },
  {
    el: <SlidePitch />,
    // Left — angled behind-left, shows its face
    rest:   { x:-268, y: 22, z:-100, rotX:-4,  rotY:-42, rotZ:-3.5 },
    scroll: { x:-380, y: 58, z: -60, rotX:-12, rotY:-60, rotZ: -9  },
    w: 295, h: 166,
  },
  {
    el: <SlideRoadmap />,
    // Right — angled behind-right
    rest:   { x: 268, y: 22, z:-100, rotX:-4,  rotY: 42, rotZ:  3.5 },
    scroll: { x: 380, y: 58, z: -60, rotX:-12, rotY: 60, rotZ:  9  },
    w: 295, h: 166,
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

  /* ── Mobile: single card with gentle float entry + scroll fade ── */
  useEffect(() => {
    if (!isMobile || !mobileCardRef.current || !sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(mobileCardRef.current,
        { opacity: 0, y: 50, scale: 0.9, rotateX: 12 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.4, ease: 'expo.out', delay: 0.5 }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .to(mobileCardRef.current, { scale: 1.28, opacity: 0, y: -55, rotateX: -18, ease: 'power2.in' }, 0)
        .to('.hero-text-content',  { opacity: 0, y: -40, ease: 'power2.in' }, 0.28);
    });

    return () => ctx.revert();
  }, [isMobile, sectionRef]);

  /* ── Desktop: 3-card cinematic tilt-and-fade ── */
  useEffect(() => {
    if (isMobile || !containerRef.current || !sceneRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slideEls = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('.hero-slide-3d')
    );

    const ctx = gsap.context(() => {
      /* Set initial hidden state — cards emerge from depth */
      gsap.set(sceneRef.current, { opacity: 0 });
      slideEls.forEach(el => {
        gsap.set(el, { opacity: 0, y: 70, z: -160, scale: 0.82, rotationX: 18 });
      });

      /* Cinematic entry — cards rise from the dark, center first */
      const entry = gsap.timeline({ delay: 0.4 });
      entry.to(sceneRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' });

      const cfgs = SLIDES;
      entry.to(slideEls[0], {
        opacity: 1, scale: 1, y: cfgs[0].rest.y, z: cfgs[0].rest.z, rotationX: cfgs[0].rest.rotX,
        rotationY: cfgs[0].rest.rotY, rotationZ: cfgs[0].rest.rotZ,
        duration: 1.6, ease: 'expo.out',
      }, 0.1);
      [1, 2].forEach((idx, j) => {
        entry.to(slideEls[idx], {
          opacity: 1, scale: 1,
          x: cfgs[idx].rest.x, y: cfgs[idx].rest.y, z: cfgs[idx].rest.z,
          rotationX: cfgs[idx].rest.rotX, rotationY: cfgs[idx].rest.rotY, rotationZ: cfgs[idx].rest.rotZ,
          duration: 1.8, ease: 'expo.out',
        }, 0.22 + j * 0.12);
      });

      /* Slow ambient orbital — scene-level rotationY only */
      const ambient = gsap.to(sceneRef.current, {
        rotationY: 5, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 3,
      });

      if (!sectionRef.current) return;

      /* Scroll: "camera pull-back" — scene tilts back, cards fan wider, everything fades */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter:     () => gsap.to(ambient, { timeScale: 0, duration: 0.6, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(ambient, { timeScale: 1, duration: 0.6, ease: 'power2.out' }),
        },
      });

      /* Cards drift to their scroll positions */
      scrollTl.to(slideEls[0], {
        x: cfgs[0].scroll.x, y: cfgs[0].scroll.y, z: cfgs[0].scroll.z,
        rotationX: cfgs[0].scroll.rotX, ease: 'power2.inOut',
      }, 0);
      [1, 2].forEach(idx => {
        scrollTl.to(slideEls[idx], {
          x: cfgs[idx].scroll.x, y: cfgs[idx].scroll.y, z: cfgs[idx].scroll.z,
          rotationX: cfgs[idx].scroll.rotX, rotationY: cfgs[idx].scroll.rotY, rotationZ: cfgs[idx].scroll.rotZ,
          ease: 'power2.inOut',
        }, 0);
      });

      /* Scene tilts back — cinematic "stepping back to view the table" */
      scrollTl
        .to(sceneRef.current, { rotationX: -20, scale: 0.88, ease: 'power1.inOut' }, 0)
        .to('.hero-text-content', { opacity: 0, y: -45, ease: 'power2.in' }, 0.28)
        .to(sceneRef.current, { opacity: 0, ease: 'power2.in' }, 0.62);
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, sectionRef]);

  /* ── Mobile layout ── */
  if (isMobile) {
    const mw = Math.min(window.innerWidth * 0.88, 380);
    const mh = Math.round(mw * (293 / 520));
    return (
      <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,159,204,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
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
      {/* Ambient glow */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'70%', height:'75%', background:'radial-gradient(ellipse, rgba(123,159,204,0.065) 0%, transparent 68%)', pointerEvents:'none' }} />

      <div style={{ position:'absolute', inset:0, perspective:'1100px', perspectiveOrigin:'50% 46%' }}>
        <div
          ref={posWrapRef}
          style={{ position:'absolute', top:'50%', left:'50%', transform:`translate(-50%,-50%) scale(${sceneScale})` }}
        >
          <div ref={sceneRef} style={{ transformStyle:'preserve-3d', position:'relative' }}>
            {SLIDES.map((cfg, i) => (
              <div
                key={i}
                className="hero-slide-3d"
                style={{
                  position:'absolute',
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
