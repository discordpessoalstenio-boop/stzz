import { useEffect, useState } from 'react';
import { gsap, ScrollTrigger, reducedMotion } from './lib/motion';
import { initSmoothScroll } from './lib/scroll';
import { st, STATES } from './lib/sceneStore';
import SceneCanvas from './components/SceneCanvas';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import MouseLight from './components/MouseLight';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Differentials from './sections/Differentials';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Contact from './sections/Contact';

/**
 * Coreografia do S entre as seções (fora da seção fixada):
 *  A) Hero → centro          (sai do hero girando)
 *  C) fim do pin → ambiente  (vira um detalhe discreto no canto)
 *  D) ambiente → final       (volta grande atrás do CTA final)
 */
function useSceneChoreography(ready) {
  useEffect(() => {
    if (!ready) return;
    if (reducedMotion) {
      gsap.set(st, { ...STATES.hero(), camZ: 10, env: 1.15, light: 0.55, lightX: 5, particles: 0.6, spin: 0.05, tilt: 0.3, canvasOpacity: 0.55 });
      return;
    }
    const mm = gsap.matchMedia();
    // recria a coreografia ao cruzar breakpoints (posições responsivas do S)
    mm.add({ m: '(max-width: 767px)', t: '(min-width: 768px) and (max-width: 1099px)', d: '(min-width: 1100px)' }, () => {
      gsap.fromTo(st, { ...STATES.hero(), camZ: 10 }, {
        ...STATES.center(), camZ: 10, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
      });
      gsap.fromTo(st, { ...STATES.pinEnd(), canvasOpacity: 1 }, {
        ...STATES.ambient(), ease: 'power1.inOut', immediateRender: false,
        scrollTrigger: { trigger: '#servicos', start: 'top bottom', end: 'top 25%', scrub: 1, invalidateOnRefresh: true },
      });
      gsap.fromTo(st, STATES.ambient(), {
        ...STATES.final(), ease: 'power1.inOut', immediateRender: false,
        scrollTrigger: { trigger: '#contato', start: 'top bottom', end: 'top top', scrub: 1, invalidateOnRefresh: true },
      });
    });
    // recalcula posições depois que fontes e layout assentarem
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => { clearTimeout(t); mm.revert(); };
  }, [ready]);
}

export default function App() {
  // ready = home revelada (após a intro); introMounted controla a sobreposição
  const [ready, setReady] = useState(reducedMotion);
  const [introMounted, setIntroMounted] = useState(!reducedMotion);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    initSmoothScroll();
    if (reducedMotion) document.getElementById('boot')?.classList.add('is-hidden');
  }, []);

  useSceneChoreography(ready);

  return (
    <>
      <SceneCanvas />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <MouseLight />
      <ScrollProgress ready={ready} />
      <Cursor />
      {introMounted && <Intro onReveal={() => setReady(true)} onDone={() => setIntroMounted(false)} />}
      <Navbar ready={ready} />
      <main id="conteudo" className={ready ? 'is-ready' : 'is-waiting'}>
        <Hero ready={ready} />
        <Differentials ready={ready} />
        <Services ready={ready} />
        <Portfolio ready={ready} />
        <Process ready={ready} />
        <Contact ready={ready} />
      </main>
      <Footer />
    </>
  );
}
