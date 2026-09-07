import {spawnSync} from 'node:child_process';
import {access} from 'node:fs/promises';
import {demoProjects} from './demos.config.mjs';

function npm(args, cwd) {
  const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',args,{cwd,stdio:'inherit',shell:process.platform==='win32'});
  if(result.error)throw result.error;
  if(result.status!==0)process.exit(result.status??1);
}
for(const demo of demoProjects){
  console.log(`Building ${demo.name}`);
  // A clean checkout and Vercel build install from each committed lockfile.
  // Existing local installs are reused; run demos:install after lockfile changes.
  let installed=true;
  try{await access(`${demo.source}/node_modules/.package-lock.json`);}catch{installed=false;}
  if(process.argv.includes('--install')||!installed)npm(['ci','--no-fund','--no-audit'],demo.source);
  if(!process.argv.includes('--install-only'))npm(['run','build'],demo.source);
}
