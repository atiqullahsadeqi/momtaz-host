// components/GridPattern.tsx
import React from "react";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  className?: string;
  [key: string]: any;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray,
  className,
  ...props
}: GridPatternProps) {
  const id = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {/* The Grid Line (faint gray) */}
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1" // Light opacity for the lines
          />
          {/* The Dot (at the intersection) */}
          <circle cx="0.5" cy="0.5" r="1" fill="currentColor" fillOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}