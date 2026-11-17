import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import { projects } from '../config/site';
import useTilt from '../hooks/useTilt';
import Icon from '../components/Icons';
import SectionHead, { animateHead } from './SectionHead';
import PortfolioMock from './PortfolioMocks';

function ProjectCard({ p, i }) {
  const card = useRef(null);
  useTilt(card, { max: 5, scale: 1.01 });
  const host = p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : p.domain || 'em-breve.stzz.dev';

  return (
    <article className={`pf-item ${i % 2 ? 'is-reverse' : ''}`}>
      <div className="pf-media">
        <div ref={card} className="browser" data-cursor>
          <div className="browser-glow" aria-hidden="true" />
          <div className="browser-bar">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="url">{host}</span>
          </div>
          <div className="browser-screen">
            <div className="pf-shot">
              {p.image ? (
                <img src={p.image} alt={`Captura do site ${p.name}`} loading="lazy" decoding="async" />
              ) : (
                <div className="ms-wrap" aria-hidden="true"><PortfolioMock variant={p.variant} /></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pf-info">
        {p.demo && <span className="pf-badge">Demonstração</span>}
        <p className="pf-cat">{p.category}</p>
        <h3 className="pf-name">{p.name}</h3>
        <p className="pf-desc">{p.description}</p>
        {p.features?.length > 0 && (
          <ul className="pf-features">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        )}
        <ul className="pf-tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        {p.url ? (
          <a className="pf-link" href={p.url} target="_blank" rel="noopener noreferrer">Ver projeto <Icon name="arrow" /></a>
        ) : (
          <span className="pf-link is-disabled">{p.demo ? 'Prévia de demonstração' : 'Link em breve'}</span>
        )}
      </div>
    </article>
  );
}

export default function Portfolio({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const ctx = gsap.context(() => {
      animateHead(gsap, root.current);
      gsap.utils.toArray('.pf-item').forEach((item) => {
        const media = item.querySelector('.pf-media');
        const shot = item.querySelector('.pf-shot');
        const info = item.querySelectorAll('.pf-info > *');
        const reverse = item.classList.contains('is-reverse');
        // mockup cresce, endireita a perspectiva e ganha profundidade
        gsap.timeline({ scrollTrigger: { trigger: item, start: 'top bottom', end: 'center center', scrub: 1 } })
          .fromTo(media, { scale: 0.72, rotateX: 28, rotateY: reverse ? 14 : -14, y: 120, opacity: 0.2, transformPerspective: 1400 },
            { scale: 1, rotateX: 0, rotateY: 0, y: 0, opacity: 1, ease: 'power2.out' }, 0)
          .fromTo(info, { opacity: 0, x: reverse ? -50 : 50 }, { opacity: 1, x: 0, stagger: 0.08, ease: 'power2.out' }, 0.25);
        // parallax interno da "captura"
        gsap.fromTo(shot, { yPercent: -8 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="portfolio" ref={root} className="section portfolio" aria-labelledby="pf-h">
      <div className="container">
        <SectionHead
          kicker="Portfólio"
          title="PROJETOS EM DESTAQUE"
          text="Exemplos do que podemos criar para o seu negócio. As marcas abaixo são fictícias, feitas para demonstração — os trabalhos reais serão publicados aqui em breve."
          id="pf-h"
        />
        <div className="pf-list">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
