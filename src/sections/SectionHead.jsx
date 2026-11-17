import SplitWords from '../components/SplitWords';

export default function SectionHead({ kicker, title, text, id, align = 'left' }) {
  return (
    <header className={`shead shead--${align}`}>
      <p className="eyebrow shead-kicker"><span className="shead-dash" aria-hidden="true" />{kicker}</p>
      <SplitWords as="h2" text={title} className="shead-title" id={id} />
      {text && <p className="shead-text">{text}</p>}
      <span className="shead-rule" aria-hidden="true" />
    </header>
  );
}

/** Animação padrão dos cabeçalhos — controlada pelo scroll. */
export function animateHead(gsap, scope) {
  const head = scope.querySelector('.shead');
  if (!head) return;
  gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', end: 'top 35%', scrub: 0.8 } })
    .fromTo(head.querySelectorAll('.shead-title .sw-i'), { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, ease: 'power3.out' }, 0)
    .fromTo(head.querySelector('.shead-kicker'), { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0)
    .fromTo(head.querySelector('.shead-rule'), { scaleX: 0 }, { scaleX: 1, ease: 'power2.inOut' }, 0.2)
    .fromTo(head.querySelectorAll('.shead-text'), { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.3);
}
