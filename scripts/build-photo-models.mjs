import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Shape, ExtrudeGeometry, BufferGeometry, Float32BufferAttribute, Color } from 'three';
import { photoProducts } from './nfc-photo-manifest.mjs';
import { mapProductImages } from './import-product-images.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'NFC Cards');

function outline(width, height, radius, round = false) {
  const shape = new Shape();
  if (round) { shape.absellipse(0,0,width/2,height/2,0,Math.PI*2,false,0); return shape; }
  const x=width/2, y=height/2, r=radius;
  shape.moveTo(-x+r,-y); shape.lineTo(x-r,-y); shape.quadraticCurveTo(x,-y,x,-y+r);
  shape.lineTo(x,y-r); shape.quadraticCurveTo(x,y,x-r,y);
  shape.lineTo(-x+r,y); shape.quadraticCurveTo(-x,y,-x,y-r);
  shape.lineTo(-x,-y+r); shape.quadraticCurveTo(-x,-y,-x+r,-y);
  return shape;
}

// Project the unit square onto four observed image corners. UV calibration
// rectifies the perspective without resampling or editing the source image.
function projection(quad, width, height) {
  const [a,b,c,d]=quad;
  const dx1=b[0]-c[0], dx2=d[0]-c[0], dx3=a[0]-b[0]+c[0]-d[0];
  const dy1=b[1]-c[1], dy2=d[1]-c[1], dy3=a[1]-b[1]+c[1]-d[1];
  const det=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/det, h=(dx1*dy3-dx3*dy1)/det;
  return (s,t) => {
    const q=g*s+h*t+1;
    return [((b[0]-a[0]+g*b[0])*s+(d[0]-a[0]+h*d[0])*t+a[0])/q/width,
      ((b[1]-a[1]+g*b[1])*s+(d[1]-a[1]+h*d[1])*t+a[1])/q/height];
  };
}

function face(shape,w,h,z,uvMap,reverse=false) {
  const perimeter=shape.getPoints(24);
  perimeter.pop();
  const positions=[], uvs=[], indices=[], rings=20, n=perimeter.length;
  // Concentric rings keep projective texture interpolation accurate.
  for(let ring=0;ring<=rings;ring++) for(const p of perimeter) {
    const x=p.x*ring/rings, y=p.y*ring/rings;
    positions.push(x,y,z);
    uvs.push(...(uvMap ? uvMap(reverse ? .5-x/w : x/w+.5,.5-y/h) : [0,0]));
  }
  for(let r=0;r<rings;r++) for(let i=0;i<n;i++) {
    const a=r*n+i,b=r*n+(i+1)%n,c=(r+1)*n+i,d=(r+1)*n+(i+1)%n;
    indices.push(...(reverse ? [a,d,c,a,b,d] : [a,c,d,a,d,b]));
  }
  const geometry=new BufferGeometry();
  geometry.setAttribute('position',new Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new Float32BufferAttribute(uvs,2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

async function generate(product) {
  const chunks=[], views=[], accessors=[], meshes=[], nodes=[], materials=[], images=[], textures=[];
  let byteLength=0;
  function view(bytes,target) {
    const data=Buffer.from(bytes.buffer ?? bytes,bytes.byteOffset ?? 0,bytes.byteLength);
    const id=views.length;
    views.push({buffer:0,byteOffset:byteLength,byteLength:data.length,...(target ? {target} : {})});
    const pad=Buffer.alloc((4-data.length%4)%4);
    chunks.push(data,pad); byteLength+=data.length+pad.length;
    return id;
  }
  function accessor(attribute,type,target=34962) {
    const array=attribute.array, id=accessors.length;
    const componentType=array instanceof Float32Array ? 5126 : array instanceof Uint32Array ? 5125 : 5123;
    const record={bufferView:view(array,target),componentType,count:attribute.count,type};
    if(type==='VEC3') {
      record.min=[Infinity,Infinity,Infinity]; record.max=[-Infinity,-Infinity,-Infinity];
      for(let i=0;i<array.length;i++) { const k=i%3; record.min[k]=Math.min(record.min[k],array[i]); record.max[k]=Math.max(record.max[k],array[i]); }
    }
    accessors.push(record); return id;
  }
  function mesh(name,geometry,material) {
    const attributes={POSITION:accessor(geometry.getAttribute('position'),'VEC3'),NORMAL:accessor(geometry.getAttribute('normal'),'VEC3')};
    if(geometry.getAttribute('uv')) attributes.TEXCOORD_0=accessor(geometry.getAttribute('uv'),'VEC2');
    const primitive={attributes,material};
    if(geometry.index) primitive.indices=accessor(geometry.index,'SCALAR',34963);
    nodes.push({name,mesh:meshes.length}); meshes.push({name,primitives:[primitive]});
    geometry.dispose();
  }
  async function artwork(ref) {
    const bytes=await readFile(resolve(source,ref.file));
    const width=bytes.readUInt32BE(16), height=bytes.readUInt32BE(20);
    images.push({bufferView:view(bytes),mimeType:'image/png',name:ref.file});
    textures.push({sampler:0,source:images.length-1});
    const index=materials.length;
    materials.push({name:ref.file,pbrMetallicRoughness:{baseColorTexture:{index:textures.length-1},metallicFactor:0,roughnessFactor:.65},extensions:{KHR_materials_unlit:{}}});
    return {index,map:projection(ref.quad,width,height)};
  }
  const front=await artwork(product.front), back=product.back ? await artwork(product.back) : null;
  const tones={white:'#edece8',black:'#171719',blue:'#0751af',gradient:'#b62373',green:'#199958'};
  const color=new Color(product.bodyColor ?? tones[product.color]);
  const bodyMaterial=materials.length;
  materials.push({name:'Edge and neutral reverse',pbrMetallicRoughness:{baseColorFactor:[color.r,color.g,color.b,1],metallicFactor:.08,roughnessFactor:.43}});
  const [wm,hm]=product.dimensionsMm, w=wm/1000,h=hm/1000;
  const stand=product.kind==='stand', depth=(stand ? 2 : product.dimensionsMm[2])/1000;
  const shape=outline(w,h,product.cornerRadiusMm ? product.cornerRadiusMm/1000 : product.kind==='card' ? .003 : .004,product.kind==='round');
  const angle=stand ? -10*Math.PI/180 : 0;
  const transform=g=> {
    g.rotateX(angle);
    if(stand) g.translate(0,h/2*Math.cos(angle)+depth,-h/2*Math.sin(-angle));
    return g;
  };
  const body=new ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelThickness:depth*.12,bevelSize:depth*.12,bevelSegments:3,curveSegments:24});
  body.translate(0,0,-depth/2);
  mesh('Rounded solid body',transform(body),bodyMaterial);
  mesh('Printed front',transform(face(shape,w,h,depth*.63,front.map)),front.index);
  mesh(back ? 'Printed reverse' : 'Neutral reverse (unphotographed)',transform(face(shape,w,h,-depth*.63,back?.map,true)),back?.index ?? bodyMaterial);
  if(stand) {
    const footDepth=.05;
    const foot=new ExtrudeGeometry(outline(w,footDepth,.003),{depth,bevelEnabled:true,bevelThickness:.0003,bevelSize:.0003,bevelSegments:3,curveSegments:16});
    foot.rotateX(-Math.PI/2); foot.translate(0,0,-footDepth/2);
    mesh('Rounded support foot',foot,bodyMaterial);
  }
  const document={asset:{version:'2.0',generator:'SILVAN photo model pipeline',extras:{number:product.number,platform:product.platform,personalized:product.personalized,packageId:product.packageId,dimensionsMm:product.dimensionsMm,dimensionsConfirmed:product.dimensionsConfirmed,geometryNote:'Photo-based visualization; unmeasured thickness and unseen support surfaces approximated.'}},
    scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes,materials,images,textures,
    samplers:[{magFilter:9729,minFilter:9987,wrapS:33071,wrapT:33071}],extensionsUsed:['KHR_materials_unlit'],
    accessors,bufferViews:views,buffers:[{byteLength}]};
  let json=Buffer.from(JSON.stringify(document)); json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
  const binary=Buffer.concat(chunks), header=Buffer.alloc(20), binHeader=Buffer.alloc(8);
  header.write('glTF'); header.writeUInt32LE(2,4); header.writeUInt32LE(28+json.length+binary.length,8); header.writeUInt32LE(json.length,12); header.write('JSON',16);
  binHeader.writeUInt32LE(binary.length); binHeader.writeUInt32LE(0x004e4942,4);
  const destination=resolve(root,'public'+product.modelUrl);
  await mkdir(dirname(destination),{recursive:true});
  await writeFile(destination,Buffer.concat([header,json,binHeader,binary]));
  console.log(`${product.id}: ${Math.round((28+json.length+binary.length)/1024)} KB`);
}

const files=await readdir(source);
const used=new Set(photoProducts.flatMap(p=>[p.front.file,...(p.back ? [p.back.file] : [])]));
const mainPhotos=new Set(mapProductImages(files).map(p=>p.file));
const unmapped=files.filter(file=>/\.(png|jpe?g)$/i.test(file)&&!used.has(file)&&!mainPhotos.has(file));
if(unmapped.length) throw new Error(`Unmapped photos: ${unmapped.join(', ')}. Add calibrations before rebuilding.`);
for(const product of photoProducts) await generate(product);
await writeFile(resolve(root,'src/content/nfc-import.json'),JSON.stringify(photoProducts,null,2)+'\n');
console.log(`Built ${photoProducts.length} self-contained models from ${used.size} photographs.`);
