import { useEffect } from 'react';
import { gsap, finePointer, reducedMotion } from '../lib/motion';

/** Inclinação 3D + luz que segue o mouse dentro de um card. */
export default function useTilt(ref, { max = 10, scale = 1.02 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer || reducedMotion) return;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const sc = gsap.quickTo(el, 'scale', { duration: 0.6, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 900 });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * max * 2);
      rx(-(py - 0.5) * max * 2);
      sc(scale);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    };
    const leave = () => { rx(0); ry(0); sc(1); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [ref, max, scale]);
}
