import { Box3, Color, DirectionalLight, HemisphereLight, Mesh, PerspectiveCamera, Scene, Sphere, Spherical, Vector3, WebGLRenderer, type Material, type Object3D, type Texture } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type ProductView = 'front' | 'back' | 'home';

/** On-demand renderer: no animation loop, remote services or continuous idle GPU work. */
export function createProductStage(host: HTMLElement, url: string, ready: () => void, failed: () => void) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const stageSurface = getComputedStyle(host).getPropertyValue('--product-stage-surface').trim();
  renderer.setClearColor(new Color(stageSurface || '#f0efec'));
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, .001, 20);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.rotateSpeed = .7;
  controls.zoomSpeed = .65;
  const sky = new HemisphereLight('#ffffff', '#85818b', 2.3);
  const light = new DirectionalLight('#ffffff', 2.5);
  light.position.set(2,3,4);
  scene.add(sky,light);
  let model: Object3D | undefined;
  let disposed = false;
  let radius = .1;
  let distance = .4;
  const abort = new AbortController();
  const timeout = window.setTimeout(() => { abort.abort(); if(!disposed) failed(); }, 20_000);
  const render = () => { if(!disposed) renderer.render(scene,camera); };
  controls.addEventListener('change',render);
  const resize = () => {
    if(disposed) return;
    const {width,height}=host.getBoundingClientRect();
    if(!width || !height) return;
    camera.aspect=width/height;
    renderer.setSize(width,height,false);
    renderer.domElement.style.width='100%'; renderer.domElement.style.height='100%';
    camera.updateProjectionMatrix();
    const previousDistance=distance;
    distance=radius/Math.sin(32*Math.PI/360)/Math.min(1,camera.aspect)*1.22;
    if(model) camera.position.sub(controls.target).multiplyScalar(distance/previousDistance).add(controls.target);
    controls.minDistance=radius*1.15;
    controls.maxDistance=distance*2.4;
    render();
  };
  const view = (which: ProductView) => {
    if(disposed) return;
    const direction = which==='front' ? new Vector3(0,0,1) : which==='back' ? new Vector3(0,0,-1) : new Vector3(.27,.12,1).normalize();
    camera.position.copy(controls.target).addScaledVector(direction,distance);
    controls.update(); render();
  };
  const zoom = (factor: number) => {
    const offset=camera.position.clone().sub(controls.target);
    offset.setLength(Math.min(controls.maxDistance,Math.max(controls.minDistance,offset.length()*factor)));
    camera.position.copy(controls.target).add(offset); controls.update(); render();
  };
  const rotate = (horizontal: number, vertical: number) => {
    const spherical = new Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    spherical.theta+=horizontal; spherical.phi=Math.max(.05,Math.min(Math.PI-.05,spherical.phi+vertical));
    camera.position.copy(controls.target).add(new Vector3().setFromSpherical(spherical)); controls.update(); render();
  };
  const lost = (event: Event) => { event.preventDefault(); if(!disposed) failed(); };
  renderer.domElement.addEventListener('webglcontextlost',lost);
  const observer=new ResizeObserver(resize); observer.observe(host); resize();

  function disposeModel(object: Object3D) {
    const materials=new Set<Material>(), textures=new Set<Texture>();
    object.traverse(child=> {
      if(!(child instanceof Mesh)) return;
      child.geometry.dispose();
      for(const material of Array.isArray(child.material) ? child.material : [child.material]) materials.add(material);
    });
    for(const material of materials) {
      for(const value of Object.values(material)) if(value && typeof value==='object' && 'isTexture' in value) textures.add(value as Texture);
      material.dispose();
    }
    for(const texture of textures) { texture.dispose(); if(typeof ImageBitmap !== 'undefined' && texture.image instanceof ImageBitmap) texture.image.close(); }
  }
  void (async()=> {
    try {
      if(!/^\/models\/nfc\/[a-z0-9-]+\.glb$/.test(url)) throw new Error('Invalid product path');
      const response=await fetch(url,{signal:abort.signal,credentials:'same-origin'});
      if(!response.ok) throw new Error('Model unavailable');
      const gltf=await new GLTFLoader().parseAsync(await response.arrayBuffer(),'');
      if(disposed) { disposeModel(gltf.scene); return; }
      model=gltf.scene;
      const box=new Box3().setFromObject(model), sphere=box.getBoundingSphere(new Sphere());
      radius=sphere.radius;
      scene.add(model); controls.target.copy(sphere.center);
      model.traverse(object=> {
        if(object instanceof Mesh) for(const material of Array.isArray(object.material) ? object.material : [object.material]) {
          if(material.map) material.map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
        }
      });
      resize(); view('home');
      window.clearTimeout(timeout); host.dataset.modelReady='true'; ready();
    } catch { window.clearTimeout(timeout); if(!disposed) failed(); }
  })();

  return { view,zoom,rotate,dispose() {
    if(disposed) return;
    disposed=true; window.clearTimeout(timeout); abort.abort(); observer.disconnect(); controls.dispose();
    renderer.domElement.removeEventListener('webglcontextlost',lost);
    if(model) disposeModel(model);
    renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    delete host.dataset.modelReady;
  } };
}
