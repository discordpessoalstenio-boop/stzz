const base = {
  width: 28, height: 28, viewBox: '0 0 32 32', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true, focusable: 'false',
};

const icons = {
  landing: (
    <svg {...base}><rect x="4" y="6" width="24" height="20" rx="2.5" /><path d="M4 11h24M8 16h9M8 20h6" /><rect x="20" y="15" width="5" height="7" rx="1" /></svg>
  ),
  portfolio: (
    <svg {...base}><rect x="5" y="5" width="9" height="9" rx="1.5" /><rect x="18" y="5" width="9" height="13" rx="1.5" /><rect x="5" y="18" width="9" height="9" rx="1.5" /><rect x="18" y="22" width="9" height="5" rx="1.5" /></svg>
  ),
  store: (
    <svg {...base}><path d="M6 11h20l-1.6 14.2a2 2 0 0 1-2 1.8H9.6a2 2 0 0 1-2-1.8L6 11Z" /><path d="M11.5 11V9a4.5 4.5 0 0 1 9 0v2" /></svg>
  ),
  company: (
    <svg {...base}><path d="M5 27h22M8 27V8.5L18 5v22M18 12l6 2.2V27" /><path d="M11.5 12h3M11.5 16.5h3M11.5 21h3" /></svg>
  ),
  custom: (
    <svg {...base}><path d="m12 10-6 6 6 6M20 10l6 6-6 6M17.5 7l-3 18" /></svg>
  ),
  arrow: (
    <svg {...base} width="18" height="18"><path d="M8 16h16M18 10l6 6-6 6" /></svg>
  ),
  instagram: (
    <svg {...base} width="20" height="20"><rect x="5" y="5" width="22" height="22" rx="6.5" /><circle cx="16" cy="16" r="5" /><circle cx="22.6" cy="9.4" r=".9" fill="currentColor" /></svg>
  ),
  whatsapp: (
    <svg {...base} width="20" height="20"><path d="M6.5 25.5 8 20.6A10.5 10.5 0 1 1 11.6 24l-5.1 1.5Z" /><path d="M12.5 11.5c0 4.4 3.6 8 8 8l1.5-2-2.6-1.3-1.2 1.1c-1.4-.6-2.9-2.1-3.5-3.5l1.1-1.2L14.5 10l-2 1.5Z" /></svg>
  ),
  send: (
    <svg {...base} width="18" height="18"><path d="M27 5 14 18M27 5l-8 22-5-9-9-5 22-8Z" /></svg>
  ),
};

export default function Icon({ name, className = '' }) {
  return <span className={`icon ${className}`}>{icons[name] || null}</span>;
}
