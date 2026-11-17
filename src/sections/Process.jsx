import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, reducedMotion } from '../lib/motion';
import { steps } from '../config/site';
import SectionHead, { animateHead } from './SectionHead';

export default function Process({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.tl-fill', { scaleY: 1 });
        root.current.querySelectorAll('.tl-step').forEach((s) => s.classList.add('is-active'));
        return;
      }
      animateHead(gsap, root.current);
      // linha cromada avança conectando as etapas
      gsap.fromTo('.tl-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      });
      gsap.fromTo('.tl-spark', { top: '0%' }, {
        top: '100%', ease: 'none',
        scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      });
      gsap.utils.toArray('.tl-step').forEach((step) => {
        ScrollTrigger.create({ trigger: step, start: 'top 60%', toggleClass: 'is-active' });
        const right = step.classList.contains('is-right');
        gsap.fromTo(step.querySelector('.tl-card'),
          { opacity: 0, x: window.innerWidth < 768 ? 40 : right ? 80 : -80, filter: 'blur(6px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', end: 'top 55%', scrub: 0.8 } });
        gsap.fromTo(step.querySelector('.tl-n'), { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, scrollTrigger: { trigger: step, start: 'top 80%', end: 'top 55%', scrub: 0.8 } });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="processo" ref={root} className="section process" aria-labelledby="pr-h">
      <div className="container">
        <SectionHead kicker="Processo" title="DA IDEIA AO SITE NO AR" text="Um caminho claro, transparente e direto — você acompanha cada etapa." id="pr-h" align="center" />
        <div className="tl">
          <span className="tl-track" aria-hidden="true"><span className="tl-fill" /><span className="tl-spark" /></span>
          <ol className="tl-list">
          {steps.map((s, i) => (
            <li key={s.n} className={`tl-step ${i % 2 ? 'is-right' : 'is-left'}`}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-card">
                <span className="tl-n chrome-text-static">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
