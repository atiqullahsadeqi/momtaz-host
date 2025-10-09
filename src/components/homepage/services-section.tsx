"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MagicBento from "../MagicBento";

export default function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold  mb-4">
            One Partner All Your Digital Needs.
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of services tailored for <br />
            individuals, startups, and enterprises.
          </p>
        </div>
        <div className="w-full mx-auto flex justify-center items-center">
          <MagicBento
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="201, 100, 66"
          />
        </div>
      </div>
    </section>
  );
}
