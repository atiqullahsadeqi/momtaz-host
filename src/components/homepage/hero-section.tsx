"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Globe, PenTool, Server, Mail, Database, Smartphone, Palette, Search } from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe, text: "Domain Registration", bg: "bg-brand-green" },
  { icon: PenTool, text: "Web Design", bg: "bg-brand-blue" },
  { icon: Server, text: "Hosting Solutions", bg: "bg-brand-purple" },
  { icon: Mail, text: "Google Workspace", bg: "bg-brand-green" },
  { icon: Database, text: "Database Development", bg: "bg-brand-blue" },
  { icon: Smartphone, text: "Mobile App", bg: "bg-brand-purple" },
  { icon: Palette, text: "Branding", bg: "bg-brand-green" },
  { icon: Search, text: "SEO Services", bg: "bg-brand-blue" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shared = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        ease: "none",
      };

      gsap.to(textRef.current, { yPercent: 40, opacity: 0, ...shared });
      gsap.to(imageRef.current, { yPercent: 25, opacity: 0, ...shared });
      gsap.to(listRef.current, { yPercent: 35, opacity: 0, ...shared });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section 
      ref={sectionRef} 
      className="relative w-full bg-brand-blue overflow-hidden min-h-[500px] md:min-h-[30vh] lg:min-h-[30vh] xl:min-h-[30vh]  flex items-start pt-[155px] md:pt-[325px] xl:pt-[400px] justify-center pb-10"
    >
      {/* 1. Noise overlay: Fixed background */}
      <div
        className="absolute inset-0 pointer-events-none z-[50] opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.6' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(100%) brightness(20%) grayscale(50%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* 3. The "Anchor" Wrapper: Everything inside here moves as one unit */}
        <div className="relative max-w-fit mx-auto">
          
          {/* Hero Image: Positioned relative to the H1 */}
          <div 
            ref={imageRef} 
            className="absolute 
              -top-32 -left-5           /* Mobile */
              md:-top-57 md:-left-20     /* Tablet */
              lg:-top-63 lg:-left-0     /* Desktop */
              xl:-top-88 xl:-left-0     /* Ultra Wide */
              z-10 select-none pointer-events-none"
          >
            <Image
              src="/images/hero.png"
              alt="Hero Background"
              width={600}
              height={800}
              priority
              quality={100}
              className="w-[250px] md:w-[420px] lg:w-[450px] xl:w-[600px] h-auto object-contain"
            />
          </div>

          {/* Animated List: Positioned relative to the H1 (Top Right) */}
          <div
            ref={listRef}
            className="absolute 
              -top-25 right-4           /* Mobile */
              md:-top-35 md:right-25    /* Tablet */
              lg:-top-45 lg:right-15    /* Desktop */
              xl:-top-55 xl:right-45    /* Ultra Wide */
              z-20 w-44 md:w-56 lg:w-72 
              h-[120px] md:h-[150px] lg:h-[180px] 
              overflow-hidden pl-3"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' 
            }}
          >
            <AnimatedList delay={2000}>
              {services.map((item, i) => (
                <div key={i} className="flex items-center mb-2">
                  <div className="bg-white flex h-8 md:h-10 lg:h-12 rounded-full items-center gap-2 px-3 lg:px-4 shadow-xl relative">
                    {/* The Little Tail/Pointer */}
                    <svg width="12" height="16" viewBox="0 0 12 16" className="absolute left-[5px] -bottom-3 -translate-y-1/2 rotate-[135deg]" fill="white">
                      <path d="M0 0 L12 8 L0 16 Q2 8 0 0Z" />
                    </svg>
                    
                    <div className={`h-5 w-5 md:h-7 md:w-7 lg:h-8 lg:w-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                      <item.icon className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 text-white" />
                    </div>
                    <p className="text-[10px] md:text-xs lg:text-sm font-semibold text-slate-800 whitespace-nowrap">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedList>
          </div>

          {/* The Text Centerpiece */}
          <div ref={textRef} className="relative z-[5] text-center pt-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[94px] font-bold text-white leading-[1.1] tracking-tight">
              <span>We Build</span>{" "}
              <span className="text-white/50 font-normal italic">An Online</span>
              <br />
              <span>Presence</span>{" "}
              <span className="text-white/50 font-normal">of your</span>{" "}
              <br className="md:hidden" />
              <span>Business</span>
            </h1>
            
            <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-md lg:max-w-xl mt-8 md:mt-10 mx-auto leading-relaxed px-4">
              Keep your website running smoothly with reliable hosting solutions.
              Manage domains, hosting, and applications in one place, fast & affordably.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
