"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export default function BeforeAfterSlider({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const animRef = useRef<number>(0);
  const dirRef = useRef(1);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Auto-animate loop
  useEffect(() => {
    let pos = 50;
    const animate = () => {
      if (!dragging.current) {
        pos += dirRef.current * 0.15;
        if (pos >= 85) dirRef.current = -1;
        if (pos <= 15) dirRef.current = 1;
        setPosition(pos);
      } else {
        // Sync pos when user releases
        pos = position;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none cursor-col-resize ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* After image — right side */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img src="/models/after-2.png" alt="After" className="absolute inset-0 w-full h-full object-contain object-bottom" draggable={false} />
      </div>

      {/* Before image — left side */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src="/models/before-1.png" alt="Before" className="absolute inset-0 w-full h-full object-contain object-bottom" draggable={false} />
      </div>

      {/* Slider line + handle */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
