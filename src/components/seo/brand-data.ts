import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export function brandImageData(name:'silvan-logo-navy.png'|'silvan-symbol-64.png'|'silvan-symbol-180.png') {
  const data=readFileSync(join(process.cwd(),'public','images','brand',name));
  return `data:image/png;base64,${data.toString('base64')}`;
}
