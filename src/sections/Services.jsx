import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import { scrollToTarget } from '../lib/scroll';
import { services } from '../config/site';
import useTilt from '../hooks/useTilt';
import Icon from '../components/Icons';
import SectionHead, { animateHead } from './SectionHead';

function ServiceCard({ s, i }) {
  const ref = useRef(null);
  useTilt(ref, { max: 8 });
  const request = () => {
    window.dispatchEvent(new CustomEvent('stzz:select-service', { detail: s.id }));
    scrollToTarget('#contato');
  };
  return (
    <article className="svc-wrap">
     <div ref={ref} className="svc-card" data-cursor>
      <div className="svc-glow" aria-hidden="true" />
      <div className="svc-top">
        <span className="svc-icon"><Icon name={s.icon} /></span>
        <span className="svc-index">0{i + 1}</span>
      </div>
      <h3 className="svc-title">{s.title}</h3>
      <p className="svc-text">{s.text}</p>
      <button type="button" className="svc-btn" onClick={request}>
        Solicitar orçamento <Icon name="arrow" />
      </button>
     </div>
    </article>
  );
}

export default function Services({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const ctx = gsap.context(() => {
      animateHead(gsap, root.current);
      // cada card chega de uma direção diferente, guiado pela rolagem
      const dirs = [
        { x: -140, y: 40, rotateY: 30 },
        { x: 0, y: 160, rotateX: -35 },
        { x: 140, y: 40, rotateY: -30 },
        { x: -100, y: 120, rotateZ: -4 },
        { x: 100, y: 120, rotateZ: 4 },
      ];
      gsap.utils.toArray('.svc-wrap').forEach((card, i) => {
        const d = window.innerWidth < 768 ? { x: i % 2 ? 60 : -60, y: 60 } : dirs[i % dirs.length];
        gsap.fromTo(card, { ...d, opacity: 0, filter: 'blur(8px)' }, {
          x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1, filter: 'blur(0px)', ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 98%', end: 'top 62%', scrub: 0.9 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="servicos" ref={root} className="section services" aria-labelledby="svc-h">
      <div className="container">
        <SectionHead
          kicker="Serviços"
          title="O QUE CRIAMOS PARA A SUA MARCA"
          text="Cada serviço é desenvolvido do zero, com a mesma obsessão por detalhes, performance e impacto visual."
          id="svc-h"
        />
        <div className="svc-grid">
          {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
