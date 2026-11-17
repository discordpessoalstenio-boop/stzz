import * as THREE from 'three';
import outline from './sOutline.json';

/**
 * Geometria do S oficial da STZZ.DEV.
 * O contorno (sOutline.json) foi extraído da logo do Instagram e é extrudado
 * com chanfro para virar um objeto 3D — fiel à silhueta, com acabamento feito em código.
 */
export function createSGeometry({ bevelSegments = 4 } = {}) {
  const toV = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y));
  const shape = new THREE.Shape(toV(outline.outer));
  (outline.holes || []).forEach((h) => shape.holes.push(new THREE.Path(toV(h))));

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.42,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.035,
    bevelSegments,
    curveSegments: 4,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/**
 * Normal map de "facetas de cristal" (Voronoi) gerado na hora:
 * cada célula inclina o reflexo numa direção, imitando o S lapidado da logo.
 */
export function createFacetNormalMap(size = 256, cells = 30) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const pts = Array.from({ length: cells }, () => {
    const nx = (Math.random() - 0.5) * 0.9;
    const ny = (Math.random() - 0.5) * 0.9;
    const nz = Math.sqrt(Math.max(0.05, 1 - nx * nx - ny * ny));
    return [Math.random() * size, Math.random() * size, nx, ny, nz];
  });
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let best = Infinity;
      let p = pts[0];
      for (let k = 0; k < cells; k++) {
        let dx = Math.abs(x - pts[k][0]);
        let dy = Math.abs(y - pts[k][1]);
        dx = Math.min(dx, size - dx); // borda contínua (textura repetível)
        dy = Math.min(dy, size - dy);
        const d = dx * dx + dy * dy;
        if (d < best) { best = d; p = pts[k]; }
      }
      const i = (y * size + x) * 4;
      img.data[i] = (p[2] * 0.5 + 0.5) * 255;
      img.data[i + 1] = (p[3] * 0.5 + 0.5) * 255;
      img.data[i + 2] = (p[4] * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(0.26, 0.26);
  return tex;
}
