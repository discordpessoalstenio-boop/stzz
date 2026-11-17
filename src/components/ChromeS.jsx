/** Logo oficial (S cromado) em imagem — menu, rodapé e alternativa sem WebGL. */
export default function ChromeS({ size = 28, className = '' }) {
  return (
    <img
      src="/brand/s-logo.png"
      alt=""
      aria-hidden="true"
      width={Math.round(size * 0.78)}
      height={size}
      className={`brand-s ${className}`}
      style={{ height: size, width: 'auto' }}
      decoding="async"
    />
  );
}
