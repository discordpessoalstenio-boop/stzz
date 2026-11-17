import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createSGeometry, createFacetNormalMap } from './createSGeometry';

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(230,230,230,.8)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Cena única (um só contexto WebGL) com o S cromado + partículas.
 * Todo o movimento vem do objeto `st`, animado via GSAP/ScrollTrigger.
 */
export function createChromeScene(canvas, st) {
  const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.035);
  scene.environment = envTarget.texture;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, st.camZ);

  // ---- Símbolo S cromado
  const group = new THREE.Group();
  scene.add(group);
  const geometry = createSGeometry({ bevelSegments: mobile ? 2 : 4 });
  const facets = createFacetNormalMap(mobile ? 192 : 256);
  // Frente/verso: cristal cromado facetado com leve iridescência (os reflexos coloridos da logo)
  const faceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f2f2,
    metalness: 1,
    roughness: 0.06,
    normalMap: facets,
    normalScale: new THREE.Vector2(0.85, 0.85),
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    iridescence: 0.45,
    iridescenceIOR: 1.7,
    iridescenceThicknessRange: [180, 520],
    envMapIntensity: 0,
  });
  // Laterais: o contorno cinza metálico que envolve o S na logo
  const sideMat = new THREE.MeshPhysicalMaterial({
    color: 0x8a8a8a,
    metalness: 1,
    roughness: 0.28,
    envMapIntensity: 0,
  });
  const material = faceMat;
  const mesh = new THREE.Mesh(geometry, [faceMat, sideMat]);
  group.add(mesh);

  // Luz que varre o símbolo na abertura + contraluz
  const sweep = new THREE.PointLight(0xffffff, 0, 30, 1.5);
  sweep.position.set(-7, 2, 4);
  scene.add(sweep);
  const rim = new THREE.DirectionalLight(0xffffff, 0);
  rim.position.set(0, 4, -6);
  scene.add(rim);

  // ---- Partículas prateadas
  const count = mobile ? 420 : 1300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 28;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 2] = -12 + Math.random() * 16;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    size: mobile ? 0.07 : 0.05,
    map: dotTexture(),
    color: 0xd6d6d6,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ---- Mouse (parallax / inclinação)
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  window.addEventListener('resize', onResize);

  let raf = 0;
  let last = performance.now();
  let clock = 0;
  let lastOpacity = -1;

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (document.hidden) return;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    clock += dt;
    // balanço suave em vez de giro infinito: o S nunca fica de costas (espelhado) parado
    const sway = Math.sin(clock * 0.7) * st.spin * 1.6;

    group.position.set(st.x, st.y, 0);
    group.scale.setScalar(st.scale);
    group.rotation.set(
      st.rx - mouse.y * 0.22 * st.tilt,
      st.ry + sway + mouse.x * 0.35 * st.tilt,
      st.rz
    );

    camera.position.x += (mouse.x * 0.35 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.25 - camera.position.y) * 0.04;
    camera.position.z = st.camZ;
    camera.lookAt(0, 0, 0);

    faceMat.envMapIntensity = st.env;
    sideMat.envMapIntensity = st.env * 0.8;
    sweep.intensity = st.light * 70;
    sweep.position.x = st.lightX;
    rim.intensity = st.light * 2.2;

    pMat.opacity = st.particles * 0.8;
    points.rotation.y += dt * 0.012;
    points.rotation.x = mouse.y * 0.04;

    if (Math.abs(st.canvasOpacity - lastOpacity) > 0.002) {
      lastOpacity = st.canvasOpacity;
      canvas.style.opacity = String(st.canvasOpacity);
    }

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      faceMat.dispose();
      sideMat.dispose();
      facets.dispose();
      pGeo.dispose();
      pMat.map?.dispose();
      pMat.dispose();
      envTarget.dispose();
      renderer.dispose();
    },
  };
}
