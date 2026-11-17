// Estado compartilhado do símbolo 3D. GSAP anima estes valores;
// o loop do Three.js apenas lê e aplica a cada frame.
export const st = {
  x: 0, y: 0, scale: 0.18,
  rx: 0.2, ry: -Math.PI * 2, rz: 0,
  camZ: 16,
  env: 0,            // intensidade dos reflexos (revelação pela luz)
  light: 0,          // luz pontual que "varre" o símbolo
  lightX: -7,
  particles: 0,      // opacidade das partículas
  spin: 0.22,        // rotação contínua (rad/s)
  tilt: 1,           // reação ao mouse
  canvasOpacity: 1,
};

const w = () => window.innerWidth;
const mobile = () => w() < 768;
const tablet = () => w() < 1100;

// Estados nomeados para cada momento da página (valores responsivos)
export const STATES = {
  introStart: () => ({ x: 0, y: 0, scale: 0.18, rx: 0.2, ry: -Math.PI * 2, camZ: 16, env: 0, light: 0, lightX: -7, particles: 0 }),
  introFocus: () => ({ scale: mobile() ? 0.42 : 0.58, rx: 0, ry: 0 }),
  hero: () =>
    mobile()
      ? { x: 0, y: 1.45, scale: 0.36, rx: 0.08, ry: 0 }
      : tablet()
        ? { x: 2.1, y: 0.05, scale: 0.5, rx: 0, ry: 0 }
        : { x: 2.75, y: -0.05, scale: 0.62, rx: 0, ry: 0 },
  center: () => ({ x: 0, y: 0, scale: mobile() ? 0.4 : 0.5, rx: 0, ry: Math.PI * 2 }),
  pinPeak: () => ({ x: 0, y: mobile() ? 0.4 : 0, scale: mobile() ? 0.55 : 0.85, rx: 0.18, ry: Math.PI * 4, camZ: 8 }),
  pinEnd: () => ({ x: 0, y: mobile() ? 2.15 : 0, scale: mobile() ? 0.3 : 0.48, rx: 0.08, ry: Math.PI * 6, camZ: 10 }),
  ambient: () =>
    mobile()
      ? { x: 1.15, y: 2.5, scale: 0.2, rx: 0.2, ry: Math.PI * 8, camZ: 10, canvasOpacity: 0.28 }
      : { x: 3.7, y: 1.9, scale: 0.26, rx: 0.2, ry: Math.PI * 8, camZ: 10, canvasOpacity: 0.32 },
  final: () => ({ x: 0, y: mobile() ? 0.9 : 0.15, scale: mobile() ? 0.45 : 0.78, rx: 0, ry: Math.PI * 10, camZ: 10, canvasOpacity: 0.5 }),
};

// Promessa resolvida quando a cena WebGL estiver pronta (ou falhar).
let resolveReady;
export const sceneReady = new Promise((r) => (resolveReady = r));
export const markSceneReady = (ok) => resolveReady(ok);
