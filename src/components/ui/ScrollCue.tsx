import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.scroll-cue-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.9,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.4,
      });
      gsap.to(ref.current, {
        opacity: 0,
        scrollTrigger: { trigger: 'body', start: '200px top', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      aria-hidden="true"
    >
      <span className="text-2xs uppercase tracking-[0.18em] text-[var(--text-muted)] font-sans">
        Scroll
      </span>
      <div className="w-px h-10 bg-[var(--gold)] opacity-50 scroll-cue-line origin-top" />
    </div>
  );
}
