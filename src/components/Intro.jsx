import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/motion';
import { st, STATES, sceneReady } from '../lib/sceneStore';
import { lockScroll } from '../lib/scroll';
import ChromeS from './ChromeS';

const hideBoot = () => document.getElementById('boot')?.classList.add('is-hidden');

/**
 * Abertura cinematográfica:
 * preto → partículas → luz revela o S → S gira em 3D → câmera se aproxima →
 * "STZZ.DEV" letra por letra → transição revela a home.
 */
export default function Intro({ onReveal, onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const ctxRef = useRef(null);
  const flags = useRef({ revealed: false, done: false });

  const reveal = () => {
    if (flags.current.revealed) return;
    flags.current.revealed = true;
    onReveal();
  };
  const finish = () => {
    if (flags.current.done) return;
    flags.current.done = true;
    reveal();
    lockScroll(false);
    onDone();
  };

  const skip = () => {
    const tl = tlRef.current;
    if (tl) tl.kill();
    gsap.killTweensOf(st);
    gsap.to(st, { ...STATES.hero(), camZ: 10, env: 1.15, light: 0.55, lightX: 5, particles: 1, duration: 0.9, ease: 'power3.out' });
    gsap.to(root.current, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: finish });
    reveal();
  };

  useLayoutEffect(() => {
    lockScroll(true);
    gsap.set(st, STATES.introStart());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timeout = new Promise((r) => setTimeout(() => r('timeout'), 3500));

    Promise.race([sceneReady, timeout]).then(() => {
      hideBoot();
      if (cancelled || flags.current.revealed) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ onComplete: finish });
        tlRef.current = tl;
        const focus = STATES.introFocus();

        tl.to(st, { particles: 1, duration: 1.6, ease: 'power2.out' }, 0.1)
          .fromTo('.intro-glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }, 0.5)
          .to(st, { light: 1, duration: 1, ease: 'power2.out' }, 0.7)
          .to(st, { lightX: 6, duration: 2.6, ease: 'power2.inOut' }, 0.7)
          .to(st, { env: 1.7, duration: 1.8, ease: 'power2.inOut' }, 0.9)
          .to(st, { ...focus, duration: 2.4, ease: 'expo.out' }, 0.9)
          .fromTo('.intro-fallback', { opacity: 0, scale: 0.6, rotateY: -180 }, { opacity: 1, scale: 1, rotateY: 0, duration: 1.8, ease: 'expo.out' }, 0.9)
          .to(st, { camZ: 6.6, duration: 1.9, ease: 'power3.inOut' }, 1.6)
          .fromTo('.intro-char', { yPercent: 120, opacity: 0, rotateX: -85, filter: 'blur(10px)' },
            { yPercent: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.055, duration: 1, ease: 'expo.out' }, 2.2)
          .fromTo('.intro-line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.inOut' }, 2.5)
          .fromTo('.intro-tag', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.8)
          .addLabel('out', 3.7)
          .to('.intro-char', { yPercent: -120, opacity: 0, stagger: 0.03, duration: 0.55, ease: 'expo.in' }, 'out')
          .to(['.intro-tag', '.intro-fallback'], { opacity: 0, duration: 0.4 }, 'out')
          .to('.intro-line', { scaleX: 0, transformOrigin: 'right center', duration: 0.6, ease: 'expo.in' }, 'out')
          .to('.intro-glow', { opacity: 0, duration: 1 }, 'out')
          .to(st, { ...STATES.hero(), camZ: 10, env: 1.15, light: 0.55, duration: 1.6, ease: 'expo.inOut' }, 'out+=0.25')
          .fromTo('.intro-wipe', { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: 'expo.in' }, 'out+=0.35')
          .set('.intro-veil', { opacity: 0 }, 'out+=0.85')
          .to('.intro-wipe', { scaleY: 0, transformOrigin: 'top center', duration: 0.7, ease: 'expo.out' }, 'out+=0.85')
          .call(reveal, null, 'out+=0.9');
      }, root);
      ctxRef.current = ctx;
    });

    const onKey = (e) => { if (e.key === 'Escape') skip(); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelled = true;
      window.removeEventListener('keydown', onKey);
      ctxRef.current?.kill?.(false); // mata sem reverter (mantém o estado final do S)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const word = 'STZZ.DEV';
  return (
    <div ref={root} className="intro" role="dialog" aria-label="Abertura STZZ.DEV">
      <div className="intro-veil" />
      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-fallback" aria-hidden="true"><ChromeS size={180} /></div>
      <div className="intro-brand">
        <h2 className="intro-word" aria-label={word}>
          {Array.from(word).map((c, i) => (
            <span className="intro-mask" key={i} aria-hidden="true">
              <span className={`intro-char ${c === '.' ? 'is-dot' : ''}`}>{c}</span>
            </span>
          ))}
        </h2>
        <span className="intro-line" aria-hidden="true" />
        <p className="intro-tag">Experiências digitais</p>
      </div>
      <div className="intro-wipe" aria-hidden="true" />
      <button type="button" className="intro-skip" onClick={skip} autoFocus>
        Pular introdução <kbd>Esc</kbd>
      </button>
    </div>
  );
}
