import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import { st, STATES } from '../lib/sceneStore';
import { differentials } from '../config/site';
import SplitWords from '../components/SplitWords';

const TITLE = 'SUA IDEIA MERECE MAIS DO QUE UM SITE COMUM.';
const TEXT =
  'Na STZZ.DEV, acreditamos que cada projeto merece uma identidade única. Desenvolvemos experiências digitais que combinam design moderno, tecnologia e funcionalidade para transformar ideias em presença digital.';

/**
 * Seção com SCROLL PINNING: a tela fica fixa enquanto o S gira em 3D,
 * a câmera se aproxima e o conteúdo se transforma conforme a rolagem.
 */
export default function Differentials({ ready }) {
  const root = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (c) => {
      const { mobile } = c.conditions;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: mobile ? '+=260%' : '+=330%',
          pin: stage.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // --- S: aproximação de câmera + giro completo
      tl.fromTo(st, { ...STATES.center(), camZ: 10 }, { ...STATES.pinPeak(), duration: 3.4, ease: 'power1.inOut', immediateRender: false }, 0);

      // --- Fase 1: título palavra por palavra + anel cromado se desenhando
      tl.fromTo('.dif-ring circle', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, stagger: 0.25 }, 0)
        .fromTo('.dif-title .sw-i', { yPercent: 120, opacity: 0, rotateX: -70 },
          { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.16, duration: 0.9, ease: 'power3.out' }, 0.1)
        .fromTo('.dif-kicker', { opacity: 0, letterSpacing: '1.2em' }, { opacity: 1, letterSpacing: '0.5em', duration: 1 }, 0)
        // --- Fase 2: texto acende palavra por palavra
        .fromTo('.dif-text .sw-i', { opacity: 0.12 }, { opacity: 1, stagger: 0.05, duration: 0.3 }, 1.7)
        // --- Saída das fases 1/2
        .to('.dif-phase-a', { yPercent: -30, opacity: 0, filter: 'blur(10px)', duration: 1, ease: 'power2.in' }, 4)
        .to('.dif-ring', { scale: 1.6, opacity: 0, duration: 1.2 }, 4);

      // --- S recua para abrir espaço aos diferenciais
      tl.to(st, { ...STATES.pinEnd(), duration: 2, ease: 'power2.inOut' }, 4.2);

      // --- Fase 3: diferenciais chegando de lados diferentes + linhas prateadas
      tl.fromTo('.dif-item', {
        opacity: 0,
        x: (i) => (mobile ? 0 : i % 2 === 0 ? -120 : 120),
        y: mobile ? 60 : 0,
        rotateY: (i) => (mobile ? 0 : i % 2 === 0 ? 35 : -35),
      }, { opacity: 1, x: 0, y: 0, rotateY: 0, stagger: 0.35, duration: 1.1, ease: 'power3.out' }, 4.9)
        .fromTo('.dif-item .dif-line', { scaleX: 0 }, { scaleX: 1, stagger: 0.35, duration: 1 }, 5.2)
        .to({}, { duration: 1.2 }); // respiro final
    });
    return () => mm.revert();
  }, [ready]);

  return (
    <section id="diferenciais" ref={root} className={`dif ${reducedMotion ? 'is-static' : ''}`} aria-labelledby="dif-title">
      <div ref={stage} className="dif-stage">
        <svg className="dif-ring" viewBox="0 0 600 600" aria-hidden="true">
          <circle cx="300" cy="300" r="290" pathLength="1" />
          <circle cx="300" cy="300" r="236" pathLength="1" />
        </svg>

        <div className="dif-phase-a container">
          <p className="eyebrow dif-kicker">Por que STZZ.DEV</p>
          <SplitWords as="h2" text={TITLE} className="dif-title" id="dif-title" />
          <SplitWords as="p" text={TEXT} className="dif-text" />
        </div>

        <ul className="dif-grid container" aria-label="Nossos diferenciais">
          {differentials.map((d, i) => (
            <li key={d.title} className={`dif-item ${i % 2 === 0 ? 'is-left' : 'is-right'}`}>
              <span className="dif-num">0{i + 1}</span>
              <div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
              <span className="dif-line" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
