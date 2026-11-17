import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, reducedMotion } from '../lib/motion';
import { scrollToTarget, lockScroll } from '../lib/scroll';
import { navLinks, brand } from '../config/site';
import ChromeS from './ChromeS';
import ChromeButton from './ChromeButton';

export default function Navbar({ ready }) {
  const bar = useRef(null);
  const menu = useRef(null);
  const tl = useRef(null);
  const [open, setOpen] = useState(false);

  const openRef = useRef(false);
  const firstRun = useRef(true);
  openRef.current = open;

  // entrada
  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(bar.current, { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: reducedMotion ? 0 : 1.1, ease: 'expo.out', delay: 0.3 });
  }, [ready]);

  // esconder ao descer / mostrar ao subir
  useEffect(() => {
    if (!ready) return;
    const trig = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current) return;
        bar.current.classList.toggle('is-scrolled', self.scroll() > 60);
        const hide = self.direction === 1 && self.scroll() > 400;
        gsap.to(bar.current, { yPercent: hide ? -130 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      },
    });
    return () => trig.kill();
  }, [ready]);

  // timeline do menu mobile
  useEffect(() => {
    const m = menu.current;
    tl.current = gsap.timeline({ paused: true })
      .set(m, { visibility: 'visible' })
      .fromTo(m, { clipPath: 'circle(0% at calc(100% - 40px) 40px)' }, { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'expo.inOut' })
      .fromTo(m.querySelectorAll('.mm-link'), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'expo.out' }, '-=0.35')
      .fromTo(m.querySelectorAll('.mm-foot'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
    return () => tl.current.kill();
  }, []);

  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (!tl.current) return;
    if (open) {
      lockScroll(true);
      tl.current.timeScale(1).play();
      menu.current.querySelector('a')?.focus();
    } else {
      tl.current.timeScale(1.6).reverse();
      lockScroll(false);
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToTarget(href), open ? 450 : 0);
  };

  return (
    <>
      <a href="#conteudo" className="skip-link" onClick={(e) => go(e, '#conteudo')}>Pular para o conteúdo</a>
      <header ref={bar} className="navbar" style={{ opacity: 0 }}>
        <a href="#inicio" className="nav-logo" onClick={(e) => go(e, '#inicio')} aria-label={`${brand.name} — início`}>
          <ChromeS size={26} />
          <span className="chrome-text-static">STZZ<span className="dim">.DEV</span></span>
        </a>
        <nav className="nav-links" aria-label="Principal">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="nav-link">
              <span data-text={l.label}>{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <ChromeButton href="#contato" variant="ghost" className="cbtn--sm">Iniciar projeto</ChromeButton>
        </div>
        <button
          type="button"
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </header>

      <div id="mobile-menu" ref={menu} className="mobile-menu" aria-hidden={!open} inert={!open}>
        <nav aria-label="Menu mobile">
          {navLinks.map((l, i) => (
            <div className="mm-mask" key={l.href}>
              <a href={l.href} className="mm-link" onClick={(e) => go(e, l.href)}>
                <span className="mm-n">0{i + 1}</span>{l.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="mm-foot">
          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">{brand.instagramHandle}</a>
          <span>STZZ | Dev de Sites</span>
        </div>
      </div>
    </>
  );
}
