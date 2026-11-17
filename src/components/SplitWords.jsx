import { Fragment } from 'react';

/**
 * Divide um texto em palavras com máscara, prontas para animação.
 * O espaço fica FORA do bloco mascarado (senão o navegador o descarta e as palavras grudam).
 */
export default function SplitWords({ text, as: Tag = 'span', className = '', wordClass = '', ...rest }) {
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text} {...rest}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="sw" aria-hidden="true">
            <span className={`sw-i ${wordClass}`}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}

export function SplitChars({ text, className = '', charClass = '' }) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((c, i) =>
        c === ' ' ? (
          <span className="sc-space" aria-hidden="true" key={i}> </span>
        ) : (
          <span className="sc" aria-hidden="true" key={i}>
            <span className={`sc-i ${charClass}`}>{c}</span>
          </span>
        )
      )}
    </span>
  );
}
