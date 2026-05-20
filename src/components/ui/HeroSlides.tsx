import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Slide content components ─── */

function SlideRevenue() {
  const bars = [42, 58, 50, 76, 68, 100];
  return (
    <div style={{ width:'100%', height:'100%', borderRadius:16, overflow:'hidden', display:'flex', flexDirection:'column', background:'linear-gradient(165deg,#0E1B30 0%,#142240 100%)', boxShadow:'0 0 0 1px rgba(123,159,204,0.2), 0 40px 80px rgba(0,0,0,0.7)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 20px', borderBottom:'1px solid rgba(123,159,204,0.1)', background:'rgba(123,159,204,0.04)' }}>
        <span style={{ fontSize:8, fontWeight:700, letterSpacing:'0.15em', color:'#7B9FCC', textTransform:'uppercase', fontFamily:'system-ui' }}>Q4 2024 — Performance Review</span>
        <div style={{ display:'flex', gap:5 }}>
          {[0,1,2].map(i=><div key={i} style={{ width:7, height:7, borderRadius:'50%', background: i===0?'rgba(123,159,204,0.9)':i===1?'rgba(123,159,204,0.4)':'rgba(123,159,204,0.18)' }}/>)}
        </div>
      </div>
      <div style={{ flex:1, padding:'14px 20px 10px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:72 }}>
          {bars.map((h,i)=>(
            <div key={i} style={{ flex:1, borderRadius:5, height:`${h}%`, position:'relative', background: i===5?'linear-gradient(180deg,#9AB8D8 0%,#5A85B8 100%)':`rgba(123,159,204,${0.18+i*0.07})` }}>
              {i===5&&<div style={{ position:'absolute', top:-3, left:'50%', transform:'translateX(-50%)', width:4, height:4, borderRadius:'50%', background:'#9AB8D8' }}/>}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
          {['Jan','Feb','Mar','Apr','May','Jun'].map(m=><span key={m} style={{ fontSize:6.5, color:'rgba(123,159,204,0.4)', fontFamily:'system-ui', letterSpacing:'0.04em' }}>{m}</span>)}
        </div>
      </div>
      <div style={{ display:'flex', padding:'2px 20px 14px', gap:8 }}>
        {[{v:'+127%',l:'Growth',c:'rgba(123,159,204,0.14)'},{v:'$2.4M',l:'Revenue',c:'rgba(123,159,204,0.09)'},{v:'89%',l:'Retention',c:'rgba(123,159,204,0.09)'}].map(({v,l,c})=>(
          <div key={l} style={{ flex:1, background:c, borderRadius:10, padding:'7px 10px', border:'1px solid rgba(123,159,204,0.12)' }}>
            <div style={{ fontSize:14, fontWeight:800, color:'#EEF2F8', fontFamily:'system-ui', letterSpacing:'-0.02em', lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:6.5, color:'rgba(123,159,204,0.5)', fontFamily:'system-ui', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:3 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideTitle() {
  return (
    <div style={{ width:'100%', height:'100%', borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, background:'linear-gradient(150deg,#1E304E 0%,#0D1829 55%,#142038 100%)', boxShadow:'0 0 0 1px rgba(123,159,204,0.18), 0 30px 70px rgba(0,0,0,0.65)' }}>
      <div style={{ width:36, height:1.5, borderRadius:1, background:'linear-gradient(90deg,transparent,rgba(123,159,204,0.6),transparent)' }}/>
      <div style={{ textAlign:'center', padding:'0 20px' }}>
        <div style={{ fontSize:24, fontWeight:800, color:'#EEF2F8', letterSpacing:'0.1em', fontFamily:'system-ui', textTransform:'uppercase', lineHeight:1 }}>PITCH</div>
        <div style={{ fontSize:7.5, fontWeight:500, color:'rgba(123,159,204,0.65)', letterSpacing:'0.2em', fontFamily:'system-ui', textTransform:'uppercase', marginTop:8 }}>Investor Deck · 2024</div>
      </div>
      <div style={{ width:24, height:1, background:'rgba(123,159,204,0.2)' }}/>
      <div style={{ display:'flex', gap:6 }}>
        {['Series A','Confidential'].map(t=>(
          <span key={t} style={{ fontSize:6, color:'rgba(238,242,248,0.25)', letterSpacing:'0.12em', fontFamily:'system-ui', textTransform:'uppercase' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function SlideMetrics() {
  return (
    <div style={{ width:'100%', height:'100%', borderRadius:14, overflow:'hidden', background:'linear-gradient(160deg,#0A1424 0%,#0D1829 100%)', boxShadow:'0 0 0 1px rgba(123,159,204,0.15), 0 30px 70px rgba(0,0,0,0.65)' }}>
      <div style={{ padding:'13px 18px 10px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div style={{ fontSize:7, fontWeight:700, color:'rgba(123,159,204,0.7)', letterSpacing:'0.16em', fontFamily:'system-ui', textTransform:'uppercase' }}>Key Metrics</div>
          <div style={{ width:16, height:1, background:'rgba(123,159,204,0.25)' }}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[{n:'850+',l:'Projects / yr'},{n:'200+',l:'Global Clients'},{n:'10+',l:'Years Exp.'},{n:'24h',l:'Turnaround'}].map(({n,l},i)=>(
            <div key={l} style={{ background: i===0?'rgba(123,159,204,0.12)':'rgba(123,159,204,0.06)', borderRadius:10, padding:'10px 12px', border:`1px solid rgba(123,159,204,${i===0?0.18:0.08})` }}>
              <div style={{ fontSize:18, fontWeight:800, color: i===0?'#9AB8D8':'#EEF2F8', fontFamily:'system-ui', letterSpacing:'-0.025em', lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:6.5, color:'rgba(123,159,204,0.45)', fontFamily:'system-ui', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 3-card layout: cleaner composition, fewer animated elements ─── */
const SLIDES = [
  {
    el: <SlideRevenue />,
    rest:     { x:   0, y:   0, z: 90,  rotX:  -6, rotY:  -1, rotZ:  0   },
    exploded: { x:   0, y: -220, z: 420, rotX:  18, rotY:   0, rotZ:  0   },
    w: 460, h: 258,
  },
  {
    el: <SlideTitle />,
    rest:     { x: -300, y: 22, z: -65, rotX:  -4, rotY: -38, rotZ: -2   },
    exploded: { x: -860, y: -80, z:-260, rotX:  -4, rotY: -68, rotZ: -13  },
    w: 310, h: 174,
  },
  {
    el: <SlideMetrics />,
    rest:     { x:  300, y: 22, z: -65, rotX:  -4, rotY:  38, rotZ:  2   },
    exploded: { x:  860, y: -80, z:-260, rotX:  -4, rotY:  68, rotZ:  13  },
    w: 310, h: 174,
  },
];

interface Props {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function HeroSlides({ sectionRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posWrapRef   = useRef<HTMLDivElement>(null);
  const sceneRef     = useRef<HTMLDivElement>(null);
  const [sceneScale, setSceneScale] = useState(1);

  /* Proportional scale for narrow viewports — applied to posWrapRef only (GSAP-free layer) */
  useEffect(() => {
    const update = () =>
      setSceneScale(Math.min(1, Math.max(0.36, window.innerWidth / 900)));
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const slideEls = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('.hero-slide')
    );

    const ctx = gsap.context(() => {

      /* ── Initial state ── */
      gsap.set(sceneRef.current, { opacity: 0 });
      gsap.set(slideEls, {
        opacity: 0, scale: 0.45,
        x: 0, y: 20, z: 0,
        rotationX: 0, rotationY: 0, rotationZ: 0,
      });

      /* ── Cinematic entry: center card first, sides fan out ── */
      const entry = gsap.timeline({ delay: 0.35 });
      entry.to(sceneRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' });

      /* Center card materialises */
      entry.to(slideEls[0], {
        opacity: 1, scale: 1,
        x: SLIDES[0].rest.x, y: SLIDES[0].rest.y, z: SLIDES[0].rest.z,
        rotationX: SLIDES[0].rest.rotX, rotationY: SLIDES[0].rest.rotY, rotationZ: SLIDES[0].rest.rotZ,
        duration: 1.4,
        ease: 'expo.out',
      }, 0.1);

      /* Side cards fan out after center */
      [1, 2].forEach((idx, j) => {
        entry.to(slideEls[idx], {
          opacity: 1, scale: 1,
          x: SLIDES[idx].rest.x, y: SLIDES[idx].rest.y, z: SLIDES[idx].rest.z,
          rotationX: SLIDES[idx].rest.rotX, rotationY: SLIDES[idx].rest.rotY, rotationZ: SLIDES[idx].rest.rotZ,
          duration: 1.6,
          ease: 'expo.out',
        }, 0.22 + j * 0.1);
      });

      /* ── Ambient: slow orbital Y rotation on whole scene (1 tween, 1 element) ──
         Much cheaper than 5 per-element Y bounces, and more cinematic. */
      const ambientTween = gsap.to(sceneRef.current, {
        rotationY: 4,
        duration: 7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.4,
      });

      /* ── Scroll-driven parallax explosion ── */
      if (!sectionRef.current) return;

      const explodeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,           /* smooth lag — feels physics-based */
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onEnter:     () => ambientTween.pause(),
          onLeaveBack: () => ambientTween.resume(),
        },
      });

      /* Center card surges forward and fades — feels like zooming through it */
      explodeTl.to(slideEls[0], {
        x: SLIDES[0].exploded.x,
        y: SLIDES[0].exploded.y,
        z: SLIDES[0].exploded.z,
        rotationX: SLIDES[0].exploded.rotX,
        rotationY: SLIDES[0].exploded.rotY,
        rotationZ: SLIDES[0].exploded.rotZ,
        ease: 'power2.inOut',
      }, 0);

      /* Side cards shoot outward with acceleration */
      [1, 2].forEach((idx) => {
        explodeTl.to(slideEls[idx], {
          x: SLIDES[idx].exploded.x,
          y: SLIDES[idx].exploded.y,
          z: SLIDES[idx].exploded.z,
          rotationX: SLIDES[idx].exploded.rotX,
          rotationY: SLIDES[idx].exploded.rotY,
          rotationZ: SLIDES[idx].exploded.rotZ,
          ease: 'power3.inOut',
        }, 0);
      });

      /* Scene tilts forward, text fades, whole scene fades out */
      explodeTl
        .to(sceneRef.current, { rotationX: -22, ease: 'power1.inOut' }, 0)
        .to('.hero-text-content', { opacity: 0, y: -50, ease: 'power2.in' }, 0.3)
        .to(sceneRef.current, { opacity: 0, ease: 'power2.in' }, 0.75);

    }, containerRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex-shrink-0"
      style={{ height: 'clamp(260px, 40vh, 440px)' }}
      aria-hidden="true"
    >
      {/* Soft glow behind the scene — static CSS, no GSAP, no repaint cost */}
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(123,159,204,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Perspective viewport */}
      <div
        style={{
          position: 'absolute', inset: 0,
          perspective: '1200px',
          perspectiveOrigin: '50% 44%',
        }}
      >
        {/*
         * posWrapRef — CSS centering + mobile scale only. NEVER animated by GSAP.
         * sceneRef   — GSAP animates rotationX / rotationY / opacity only.
         * .hero-slide — GSAP animates 3D position and entry/exit.
         *
         * No filter: drop-shadow on animated elements (forces repaint every frame).
         * Shadows live inside the slide content divs as box-shadow (GPU-composited).
         */}
        <div
          ref={posWrapRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: `translate(-50%, -50%) scale(${sceneScale})`,
          }}
        >
          <div
            ref={sceneRef}
            style={{ transformStyle: 'preserve-3d', position: 'relative' }}
          >
            {SLIDES.map((cfg, i) => (
              <div
                key={i}
                className="hero-slide"
                style={{
                  position: 'absolute',
                  width: cfg.w, height: cfg.h,
                  marginLeft: -cfg.w / 2,
                  marginTop:  -cfg.h / 2,
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
