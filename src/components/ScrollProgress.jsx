import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';

export default function ScrollProgress({ ready }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ready) return;
    const tween = gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [ready]);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
