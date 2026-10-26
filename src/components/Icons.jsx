const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconTarget = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
);
export const IconSnow = (p) => (
  <svg {...base} {...p}><path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9" /></svg>
);
export const IconClock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconBuilding = (p) => (
  <svg {...base} {...p}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" /></svg>
);
export const IconUsers = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M17 4a4 4 0 0 1 0 8M22 21a6 6 0 0 0-4-5.6" /></svg>
);
export const IconRun = (p) => (
  <svg {...base} {...p}><circle cx="14" cy="4" r="2" /><path d="m6 21 3-6 3 2 1-5 4 3h3M8 9l3-2 3 1 2 3" /></svg>
);
export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>
);
export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconArrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);
export const IconPin = (p) => (
  <svg {...base} {...p}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const IconStar = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
);
// Ícones oficiais enviados pela academia (public/brand), usados como máscara para herdar a cor do texto
const BrandIcon = ({ src, width = 24, height = 24, className = '' }) => (
  <span
    aria-hidden="true"
    className={`brand-icon ${className}`}
    style={{ width, height, WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
  />
);

export const IconWhatsApp = (p) => <BrandIcon src="/brand/whatsapp.png" {...p} />;
export const IconInstagram = (p) => <BrandIcon src="/brand/instagram.png" {...p} />;
