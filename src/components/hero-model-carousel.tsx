"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

const MODELS = [
  { src: "/models/Cozy Modern Shopfront.png", alt: "Modern Shopfront" },
  { src: "/models/Cozy Greenhouse Model.png", alt: "Greenhouse" },
  { src: "/models/Miniature Building Scene.png", alt: "Building Scene" },
];

const CYCLE_MS = 4000;

export default function HeroModelCarousel({ className = "" }: { className?: string }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % MODELS.length);
        setFading(false);
      }, 500);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width) * 2 - 1);
    setMouseY(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, []);

  const rotateY = mouseX * 12;
  const rotateX = -mouseY * 8;

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { setMouseX(0); setMouseY(0); }}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`transition-all duration-500 ease-out ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transition: fading
            ? "opacity 0.5s, transform 0.5s"
            : "transform 0.15s ease-out",
        }}
      >
        <Image
          src={MODELS[current].src}
          alt={MODELS[current].alt}
          width={600}
          height={600}
          className="w-auto h-[30vh] max-h-[600px] object-contain drop-shadow-2xl select-none pointer-events-none"
          priority
        />
      </div>
    </div>
  );
}
