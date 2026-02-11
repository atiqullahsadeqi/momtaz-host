"use client";

import LogoLoop from "../LogoLoop";
import { useEffect, useState } from "react";

const imageLogos = [
  { src: "/images/logos/awec_logo.png", alt: "AWEC", href: "#" },
  { src: "/images/logos/BMALogo.png", alt: "BMA", href: "#" },
  {
    src: "/images/logos/HIHAO-new-logo-2021-transparent-1.png",
    alt: "HIHAO",
    href: "#",
  },

  {
    src: "/images/logos/MISFA-Final-logo-01-scaled.jpg",
    alt: "MISFA",
    href: "#",
  },
  { src: "/images/logos/Transparent3.png", alt: "Company", href: "#" },
];

export default function CompanyLogos() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (typeof document !== "undefined") {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    // Initial check
    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  const fadeOutColor = isDark ? "#0a0a0a" : "#ffffff";
  return (
    <section className="pt-10 pb-25">
      <div className="container mx-auto">
        <LogoLoop
          logos={imageLogos}
          speed={50}
          direction="left"
          logoHeight={55}
          gap={50}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor={fadeOutColor}
          ariaLabel="Our Clients"
        />
      </div>
    </section>
  );
}
