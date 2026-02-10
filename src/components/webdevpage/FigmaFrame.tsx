// components/FigmaFrame.tsx
import React from "react";

export function FigmaFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-4xl border border-dashed border-gray-300 p-12 text-center">
      {/* Corner Handles */}
      {/* Top Left */}
      <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-black" />
      {/* Top Right */}
      <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-black" />
      {/* Bottom Left */}
      <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-black" />
      {/* Bottom Right */}
      <div className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-black" />

      {/* Content */}
      {children}
    </div>
  );
}