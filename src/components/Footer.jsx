import { brand, navLinks } from '../config/site';
import { scrollToTarget } from '../lib/scroll';
import ChromeS from './ChromeS';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <ChromeS size={34} />
          <div>
            <strong className="chrome-text-static">STZZ.DEV</strong>
            <p>{brand.commercialName}</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Rodapé">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollToTarget(l.href); }}>{l.label}</a>
          ))}
          <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
        <p className="footer-copy">© {year} STZZ.DEV — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
