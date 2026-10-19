'use client';

import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import styles from './brand-signature.module.css';

type Connection = EventTarget & {readonly saveData?:boolean};

export function BrandSignature() {
  const videoRef=useRef<HTMLVideoElement>(null);
  const stageRef=useRef<HTMLDivElement>(null);
  const [showVideo,setShowVideo]=useState(false);
  const autoplayStarted=useRef(false);
  const failed=useRef(false);

  useEffect(()=>{
    const video=videoRef.current;
    const stage=stageRef.current;
    if(!video || !stage || !window.matchMedia || !window.IntersectionObserver) return;
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection=(navigator as Navigator & {connection?:Connection}).connection;
    let visible=false;
    let disposed=false;
    const sync=()=>{
      if(preference.matches || connection?.saveData){
        video.pause();setShowVideo(false);return;
      }
      if(!visible || document.visibilityState==='hidden'){video.pause();return;}
      if(failed.current || video.ended)return;
      if(autoplayStarted.current){
        if(video.paused)video.play().catch(()=>{if(!disposed)setShowVideo(false);});
        return;
      }
      autoplayStarted.current=true;
      video.src='/videos/silvan-logo.mp4';
      video.play().catch(()=>{if(!disposed)setShowVideo(false);});
    };
    const observer=new IntersectionObserver(entries=>{
      visible=entries.some(entry=>entry.isIntersecting && entry.intersectionRatio>=0.5);
      sync();
    },{threshold:0.5});
    observer.observe(stage);
    preference.addEventListener('change',sync);
    connection?.addEventListener('change',sync);
    document.addEventListener('visibilitychange',sync);
    return()=>{
      disposed=true;observer.disconnect();video.pause();
      preference.removeEventListener('change',sync);
      connection?.removeEventListener('change',sync);
      document.removeEventListener('visibilitychange',sync);
    };
  },[]);

  return <div className={styles.signature} data-brand-signature>
    <div className={styles.stage} ref={stageRef}>
      <Image className={styles.logo} alt="SILVAN Digital Studio" src="/images/brand/silvan-logo-poster.webp" width={880} height={336} unoptimized />
      <video
        ref={videoRef}
        className={styles.film}
        data-visible={showVideo}
        muted playsInline preload="none" aria-hidden="true" tabIndex={-1}
        onPlaying={()=>setShowVideo(true)}
        onError={()=>{failed.current=true;setShowVideo(false);}}
      />
    </div>
  </div>;
}
