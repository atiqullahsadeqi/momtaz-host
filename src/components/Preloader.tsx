'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setIsLoading(true);
    setProgress(0);

    let progressValue = 0;
    const incrementProgress = (amount: number) => {
      progressValue = Math.min(progressValue + amount, 95);
      setProgress(progressValue);
    };

    const imagePromises: Promise<void>[] = [];
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete) {
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => {
              incrementProgress(30 / images.length);
              resolve();
            };
            img.onerror = () => resolve();
          })
        );
      }
    });

    const originalFetch = window.fetch;
    let fetchCount = 0;
    
    window.fetch = async (...args) => {
      fetchCount++;
      try {
        const response = await originalFetch(...args);
        incrementProgress(30 / Math.max(fetchCount, 1));
        return response;
      } catch (error) {
        throw error;
      }
    };

    incrementProgress(20);

    const checkComplete = () => {
      if (document.readyState === 'complete') {
        Promise.all(imagePromises).then(() => {
          setProgress(100);
        });
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(checkComplete, 100);
    } else {
      window.addEventListener('load', checkComplete);
    }

    const fallbackTimer = setTimeout(() => {
      setProgress(100);
    }, 3000);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener('load', checkComplete);
      clearTimeout(fallbackTimer);
    };
  }, [pathname, isMounted]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        if (preloaderRef.current && logoRef.current && progressRef.current && percentRef.current) {
          const exitTl = gsap.timeline({
            onComplete: () => setIsLoading(false)
          });
          exitTl.to([percentRef.current, progressRef.current], { 
            opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' 
          })
          .to(logoRef.current, { 
            opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' 
          }, '-=0.1')
          .to(preloaderRef.current, { 
            y: '-100%', duration: 0.6, ease: 'power2.in' 
          }, '-=0.2');
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isMounted || !isLoading) return null;

  return (
    <div 
      ref={preloaderRef}
      className='h-screen w-screen bg-muted fixed top-0 left-0 flex flex-col items-center justify-center z-[100]'
    >
      <div ref={logoRef} className="svg mb-8">
        <h1 className='leading-7 text-4xl text-white'>MOMTAZ HOST</h1>
      </div>
      
      <div ref={progressRef} className="w-[200px] h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="progress h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      <div ref={percentRef} className="text-white text-sm mt-4 font-mono">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
