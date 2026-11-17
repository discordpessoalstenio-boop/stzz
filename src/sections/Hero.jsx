import { useLayoutEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import { scrollToTarget } from '../lib/scroll';
import SplitWords from '../components/SplitWords';
import ChromeButton from '../components/ChromeButton';
import ChromeS from '../components/ChromeS';
import Icon from '../components/Icons';

export default function Hero({ ready }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.hero [data-hero]', { opacity: 1, y: 0 });
        gsap.set('.hero .sw-i', { yPercent: 0, opacity: 1 });
        return;
      }
      // Entrada palavra por palavra
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0)
        .fromTo('.hero-title .sw-i', { yPercent: 115, rotate: 4, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 1.3, stagger: 0.075 }, 0.05)
        .fromTo('.hero-sub', { opacity: 0, y: 24, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 0.65)
        .fromTo('.hero-ctas > *', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.8)
        .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2)
        .fromTo('.hero-meta > *', { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.8 }, 1.1);

      // Saída controlada pelo scroll (parallax + desfoque)
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
        .to('.hero-content', { yPercent: -18, opacity: 0, filter: 'blur(8px)', ease: 'none' }, 0)
        .to('.scroll-indicator', { opacity: 0, ease: 'none', duration: 0.3 }, 0)
        .to('.hero-meta', { yPercent: -60, opacity: 0, ease: 'none' }, 0);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="inicio" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-fallback-s" aria-hidden="true"><ChromeS size={320} /></div>
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow" data-hero>STZZ | Dev de Sites</p>
        <h1 id="hero-title" className="hero-title">
          <SplitWords text="NÃO CRIAMOS APENAS SITES." className="hero-line" />
          <SplitWords text="CRIAMOS EXPERIÊNCIAS DIGITAIS." className="hero-line chrome-text" />
        </h1>
        <p className="hero-sub" data-hero>
          Transformamos ideias em experiências digitais únicas. Sites modernos, rápidos, responsivos e
          desenvolvidos para destacar sua marca na internet.
        </p>
        <div className="hero-ctas">
          <ChromeButton href="#contato" icon={<Icon name="arrow" />}>INICIAR MEU PROJETO</ChromeButton>
          <ChromeButton href="#servicos" variant="ghost">EXPLORAR SERVIÇOS</ChromeButton>
        </div>
      </div>

      <div className="hero-meta" aria-hidden="true">
        <span>Sites</span><span>Landing pages</span><span>Lojas</span><span>Portfólios</span>
      </div>

      <a href="#diferenciais" className="scroll-indicator" aria-label="Role para explorar"
        onClick={(e) => { e.preventDefault(); scrollToTarget('#diferenciais'); }}>
        <span className="si-mouse"><span className="si-wheel" /></span>
        <span className="si-text">ROLE PARA EXPLORAR</span>
      </a>
    </section>
  );
}
