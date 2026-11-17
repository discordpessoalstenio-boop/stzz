import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;

/** Usuário pediu menos movimento no sistema operacional. */
export const reducedMotion = mq('(prefers-reduced-motion: reduce)');
/** Dispositivo com ponteiro fino (mouse) — habilita cursor, magnetismo e tilt. */
export const finePointer = mq('(hover: hover) and (pointer: fine)');
export const isMobileViewport = () => window.innerWidth < 768;

export { gsap, ScrollTrigger };
