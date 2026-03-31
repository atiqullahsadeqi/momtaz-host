"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Image, Type, Braces, FunctionSquare, DatabaseZap, User } from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-10 items-center justify-center rounded-full border-2 border-border bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export default function DatabaseBeamIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const jsonRef = useRef<HTMLDivElement>(null);
  const fnRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full h-full items-center justify-between px-6 py-3"
    >
      <div className="flex flex-col justify-center">
        <Circle ref={userRef}>
          <User className="h-5 w-5" />
        </Circle>
      </div>
      <div className="flex flex-col justify-center">
        <Circle ref={dbRef} className="size-12 bg-brand-purple">
          <DatabaseZap className="h-6 w-6 text-white" />
        </Circle>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <Circle ref={imgRef}>
          <Image className="h-5 w-5 text-brand-green" />
        </Circle>
        <Circle ref={textRef}>
          <Type className="h-5 w-5 text-brand-blue" />
        </Circle>
        <Circle ref={jsonRef}>
          <Braces className="h-5 w-5 text-brand-purple" />
        </Circle>
        <Circle ref={fnRef}>
          <FunctionSquare className="h-5 w-5 text-amber-500" />
        </Circle>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={imgRef} toRef={dbRef} curvature={40} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={textRef} toRef={dbRef} curvature={20} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={jsonRef} toRef={dbRef} curvature={-20} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={fnRef} toRef={dbRef} curvature={-40} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={userRef} toRef={dbRef} reverse />
    </div>
  );
}
