import { useEffect, useRef } from 'react';
import { gsap, finePointer, reducedMotion } from '../lib/motion';
import { scrollToTarget } from '../lib/scroll';

/**
 * Botão cromado com efeito magnético e brilho no hover.
 * - href começando com "#": rolagem suave até a seção
 * - href externo: abre em nova aba
 */
export default function ChromeButton({
  href, onClick, children, variant = 'solid', icon = null, disabled = false,
  external = false, className = '', type = 'button', title, ...rest
}) {
  const ref = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer || reducedMotion || disabled) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const ixTo = gsap.quickTo(inner.current, 'x', { duration: 0.6, ease: 'power3.out' });
    const iyTo = gsap.quickTo(inner.current, 'y', { duration: 0.6, ease: 'power3.out' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * 0.28); yTo(dy * 0.38); ixTo(dx * 0.12); iyTo(dy * 0.16);
      el.style.setProperty('--bx', `${e.clientX - r.left}px`);
      el.style.setProperty('--by', `${e.clientY - r.top}px`);
    };
    const leave = () => { xTo(0); yTo(0); ixTo(0); iyTo(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [disabled]);

  const cls = `cbtn cbtn--${variant} ${disabled ? 'is-disabled' : ''} ${className}`;
  const content = (
    <span ref={inner} className="cbtn-inner">
      <span className="cbtn-label">{children}</span>
      {icon}
    </span>
  );

  if (href && !disabled) {
    const isHash = href.startsWith('#');
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        title={title}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={(e) => {
          if (isHash) { e.preventDefault(); scrollToTarget(href); }
          onClick?.(e);
        }}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} onClick={onClick} disabled={disabled} aria-disabled={disabled} title={title} {...rest}>
      {content}
    </button>
  );
}
