"use client";

import Image from "next/image";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const outer = [
  { src: "/images/Gmail.png", alt: "Gmail" },
  { src: "/images/Google Drive.png", alt: "Google Drive" },
  { src: "/images/Google-Calendar.png", alt: "Google Calendar" },
  { src: "/images/Google Meet.png", alt: "Google Meet" },
];

const inner = [
  { src: "/images/Google-Sheets.png", alt: "Google Sheets" },
  { src: "/images/Google-Docs.png", alt: "Google Docs" },
];

export default function GoogleWorkspaceOrbits() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={30}>
        {outer.map((item) => (
          <Image key={item.alt} src={item.src} alt={item.alt} width={30} height={30} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={24} radius={70} reverse speed={2}>
        {inner.map((item) => (
          <Image key={item.alt} src={item.src} alt={item.alt} width={24} height={24} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
