import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './motion';

let lenis = null;

export function initSmoothScroll() {
  if (reducedMotion || lenis) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis && lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  if (document.documentElement.classList.contains('is-locked')) lenis.stop();
  return lenis;
}

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.8, ...opts });
  } else {
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }
  // move o foco para a seção (acessibilidade por teclado)
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

export function lockScroll(locked) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (!lenis) return;
  locked ? lenis.stop() : lenis.start();
}

export const getLenis = () => lenis;
