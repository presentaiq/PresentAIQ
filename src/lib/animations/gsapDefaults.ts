import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ease = {
  cinematic: 'power3.out',
  gentle: 'power2.inOut',
  snap: 'expo.out',
};

export function revealFrom(
  targets: gsap.TweenTarget,
  trigger: Element | string,
  opts: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30, ...opts },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: ease.cinematic,
      stagger: 0.12,
      scrollTrigger: {
        trigger,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      ...opts,
    }
  );
}

export function revealBlur(
  targets: gsap.TweenTarget,
  trigger: Element | string,
  opts: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: ease.cinematic,
      stagger: 0.15,
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      ...opts,
    }
  );
}
