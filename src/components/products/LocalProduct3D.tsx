"use client";

import { useEffect, useRef } from 'react';
import type { createProductStage, ProductView } from './local-product-stage';
import styles from './local-product.module.css';

type Stage = ReturnType<typeof createProductStage>;

export function LocalProduct3D({ url, label, english, onReady, onError }: {
  url: string; label: string; english: boolean; onReady: () => void; onError: () => void;
}) {
  const host=useRef<HTMLDivElement>(null), stage=useRef<Stage | null>(null);
  const callbacks=useRef({onReady,onError});
  useEffect(()=>{ callbacks.current={onReady,onError}; },[onReady,onError]);
  useEffect(()=> {
    let cancelled=false;
    void import('./local-product-stage').then(({createProductStage})=> {
      if(cancelled || !host.current) return;
      stage.current=createProductStage(host.current,url,()=>callbacks.current.onReady(),()=>callbacks.current.onError());
    }).catch(()=>{ if(!cancelled) callbacks.current.onError(); });
    return ()=> { cancelled=true; stage.current?.dispose(); stage.current=null; };
  },[url]);
  const views: [ProductView,string][]=[['front',english?'Front':'Vorne'],['back',english?'Back':'Hinten'],['home',english?'Reset':'Zurücksetzen']];
  return <div className={styles.viewer}>
    <div ref={host} className={styles.canvas} data-local-product-stage tabIndex={0} role="group" aria-label={label}
      onKeyDown={event=> {
        const current=stage.current;
        if(!current) return;
        if(event.key==='ArrowLeft') current.rotate(-.15,0);
        else if(event.key==='ArrowRight') current.rotate(.15,0);
        else if(event.key==='ArrowUp') current.rotate(0,-.15);
        else if(event.key==='ArrowDown') current.rotate(0,.15);
        else if(event.key==='+' || event.key==='=') current.zoom(.85);
        else if(event.key==='-') current.zoom(1.18);
        else if(event.key==='Home') current.view('home');
        else return;
        event.preventDefault();
      }} />
    <div className={styles.controls} role="group" aria-label={english?'3D controls':'3D-Steuerung'}>
      {views.map(([view,label])=><button key={view} type="button" onClick={()=>stage.current?.view(view)}>{label}</button>)}
      <button type="button" aria-label={english?'Zoom in':'Vergrössern'} onClick={()=>stage.current?.zoom(.8)}>+</button>
      <button type="button" aria-label={english?'Zoom out':'Verkleinern'} onClick={()=>stage.current?.zoom(1.25)}>−</button>
    </div>
  </div>;
}
