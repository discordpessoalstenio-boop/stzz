import { useEffect, useRef } from 'react';
import { gsap, finePointer } from '../lib/motion';

/** Iluminação suave que acompanha o mouse por toda a página. */
export default function MouseLight() {
  const ref = useRef(null);
  useEffect(() => {
    if (!finePointer) return;
    const el = ref.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const setX = gsap.quickTo(pos, 'x', { duration: 0.9, ease: 'power3.out', onUpdate: () => apply() });
    const setY = gsap.quickTo(pos, 'y', { duration: 0.9, ease: 'power3.out', onUpdate: () => apply() });
    const apply = () => {
      el.style.setProperty('--lx', `${pos.x}px`);
      el.style.setProperty('--ly', `${pos.y}px`);
    };
    const move = (e) => { setX(e.clientX); setY(e.clientY); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div ref={ref} className="mouse-light" aria-hidden="true" />;
}
