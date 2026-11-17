import { useEffect, useRef } from 'react';
import { gsap, finePointer, reducedMotion } from '../lib/motion';

/** Cursor personalizado (somente desktop com mouse). */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!finePointer) return;
    document.documentElement.classList.add('has-cursor');
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const d = reducedMotion ? 0 : 0.5;
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, 'x', { duration: d, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: d, ease: 'power3.out' });

    const move = (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      document.documentElement.classList.remove('cursor-hidden');
    };
    const over = (e) => {
      const t = e.target.closest?.('a, button, select, input, textarea, label, [data-cursor]');
      ring.current.classList.toggle('is-hover', !!t);
      ring.current.classList.toggle('is-text', !!e.target.closest?.('input, textarea'));
    };
    const down = () => ring.current.classList.add('is-down');
    const up = () => ring.current.classList.remove('is-down');
    const leave = () => document.documentElement.classList.add('cursor-hidden');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  if (!finePointer) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
