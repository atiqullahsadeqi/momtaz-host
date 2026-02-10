'use client';

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset preloader on route change
    setIsLoading(true);
    setProgress(0);

    // Simulate page loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // GSAP exit animation
          if (preloaderRef.current && logoRef.current && progressRef.current && percentRef.current) {
            const exitTl = gsap.timeline({
              onComplete: () => setIsLoading(false)
            });
            exitTl.to([percentRef.current, progressRef.current], { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' })
              .to(logoRef.current, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' }, '-=0.1')
              .to(preloaderRef.current, { y: '-100%', duration: 0.6, ease: 'power2.in' }, '-=0.2');
          }
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 80);

    // Also listen for actual page load (for hard refreshes)
    const handleLoad = () => {
      setProgress(100);
    };

    if (document.readyState === 'complete') {
      setTimeout(() => {
        setProgress(100);
      }, 200);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div 
      ref={preloaderRef}
      className='h-screen w-screen bg-black fixed top-0 left-0 flex flex-col items-center justify-center z-[100]'
    >
      <div ref={logoRef} className="svg mb-8">
       <h1 className='leading-7 text-4xl text-white'>MOMTAZ HOST</h1>
      </div>
      
      {/* Progress Bar */}
      <div ref={progressRef} className="w-[200px] h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="progress h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {/* Progress Text */}
      <div ref={percentRef} className="text-white text-sm mt-4 font-mono">
        {Math.round(progress)}%
      </div>
    </div>
  )
}
