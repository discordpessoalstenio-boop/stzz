import { useEffect, useRef } from 'react';
import { st, markSceneReady } from '../lib/sceneStore';

/** Canvas fixo do fundo. O Three.js é carregado sob demanda para não travar o primeiro carregamento. */
export default function SceneCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    let scene = null;
    let cancelled = false;

    const supportsWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
      } catch { return false; }
    })();

    if (!supportsWebGL) {
      document.documentElement.classList.add('no-webgl');
      markSceneReady(false);
      return;
    }

    import('../three/ChromeScene')
      .then(({ createChromeScene }) => {
        if (cancelled) return;
        scene = createChromeScene(ref.current, st);
        markSceneReady(true);
      })
      .catch((err) => {
        console.warn('[STZZ] WebGL indisponível, usando alternativa vetorial.', err);
        document.documentElement.classList.add('no-webgl');
        markSceneReady(false);
      });

    return () => { cancelled = true; scene?.dispose(); };
  }, []);

  return <canvas ref={ref} className="scene-canvas" aria-hidden="true" />;
}
