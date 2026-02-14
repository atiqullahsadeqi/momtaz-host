"use client";

import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import RotatingText from '@/components/RotatingText'
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "Inventory & Supply Chain Module",
    image: "https://images.unsplash.com/photo-1628786739444-6186c7c79834?q=80&w=596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Real-time stock tracking across multiple warehouses.",
      "Automated reordering triggers based on historical data.",
      "Supplier management and QR/Barcode scanning integration.",
    ],
  },
  {
    title: "Financial Management Module",
    image: "https://images.unsplash.com/photo-1628786739444-6186c7c79834?q=80&w=596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Automated invoicing and expense tracking.",
      "Custom financial reporting and P&L dashboards.",
      "Tax calculation engines tailored to your region.",
      "Seamless integration with banking APIs."
    ],
  },
  {
    title: "HR & Payroll Module",
    image: "https://images.unsplash.com/photo-1628786739444-6186c7c79834?q=80&w=596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Employee attendance tracking and leave management.",
      "Automated payroll calculation and slip generation.",
      "Role-based access control (RBAC) for sensitive data.",
    ],
  },
  {
    title: "CRM & Sales Module",
    image: "https://images.unsplash.com/photo-1628786739444-6186c7c79834?q=80&w=596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Lead pipeline tracking specific to your sales cycle.",
      "Customer purchase history and behavior analysis.",
      "Automated email marketing sequences based on database triggers."
    ],
  }

];
const workstreams = [
  { label: "Growing", color: "bg-emerald-500" },
  { label: "Optimizing", color: "bg-amber-500" },
  { label: "Scaling", color: "bg-blue-500" },
];

const highlights = [
  {
    title: "Zero Pre-Made Solutions",
    description: " We start with a blank canvas. We map your actual paper trails and digital workflows first, then architect a database schema that mirrors reality.",
  },
  {
    title: "Lean Efficiency",
    description: " You never pay for features you don't use. Every table, relation, and query is written specifically for your needs.",
  },
  {
    title: "Ownership",
    description: " You own the code and the data. No vendor lock-in with proprietary SaaS platforms.",
  },
];

const keyFeatures = [
  {
    title: "Role-Based Access Control (RBAC)",
    description: "Granular permission settings — the Intern sees only what they need; the CFO sees everything.",
  },
  {
    title: "Audit Logging",
    description: "Every action (create, update, delete) is logged so you always know who changed what and when.",
  },
  {
    title: "Automated Backups",
    description: "Daily encrypted snapshots of your database stored securely off-site.",
  },
  {
    title: "API Integration",
    description: "Connect your custom database to third-party tools (Stripe, Slack, Google Workspace, etc.).",
  },
];

const steps = [
  {
    title: "Discovery & Mapping",
    description: "We sit down with you to draw out your entity relationships on a whiteboard.",
  },
  {
    title: "Schema Design",
    description: "We design the database architecture (ERD) to ensure data integrity and normalization.",
  },
  {
    title: "API Development (Laravel)",
    description: "We build the endpoints and business logic.",
  },
  {
    title: "UI Implementation (Next.js)",
    description: "We connect the frontend to the data.",
  },
  {
    title: "UAT (User Acceptance Testing)",
    description: "You test the system with real data.",
  },
  {
    title: "Deployment & Training",
    description: "We launch on secure cloud servers and train your staff.",
  },
];

export default function DatabaseDevelopmentPage() {

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const progressRef = useRef(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade out current content
      gsap.fromTo(".slide-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Scale/Fade image
      // gsap.fromTo(".slide-image",
      //   { scale: 0.95, opacity: 0.8 },
      //   { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }
      // );

      // 3. Reset and Animate Progress Bar
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none", onComplete: handleNext }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

      // 1. Text reveal (Left Side)
      tl.from(".hero-text-item", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
      })
        // 2. Main visual card (Right Side)
        .from(".main-visual-card", {
          scale: 0.9,
          opacity: 0,
          duration: 1.4,
        }, "-=1") // Start slightly before text finishes
        // 3. Floating Image Assets (The "premium" touch)
        .from(".floating-asset", {
          y: 40,
          x: (i) => (i === 0 ? 30 : -30), // Chart slides from right, Profile from left
          opacity: 0,
          stagger: 0.2,
          duration: 1,
        }, "-=0.8")
        // 4. Grid items pop-in
        .from(".workstream-grid-item", {
          scale: 0.8,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(1.7)", // Adds a slight bounce
        }, "-=0.5");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const [activeHighlight, setActiveHighlight] = useState(0);
  const highlightTextRef = useRef(null);
  const highlightProgressRef = useRef(null);

  useEffect(() => {
    // Logic inside braces doesn't return anything to the useEffect
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveHighlight((prev) => (prev + 1) % highlights.length);
      }
    });

    tl.fromTo(highlightTextRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(highlightProgressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 6, ease: "none" },
      "-=0.4"
    );

    // The cleanup function
    return () => {
      tl.kill();
    };
  }, [activeHighlight]);

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // We create the timeline first
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 50%", // Triggers when the top of the section hits 70% of viewport
        end: "bottom 20%", // Ends when bottom of section hits 20%
        toggleActions: "play reverse play reverse", // The magic line for back-and-forth
      },
    });

    // 1. Line animation
    tl.to(".step-line-active", {
      height: "100%",
      duration: 0.6, // Fast, snappy duration
      ease: "power1.inOut",
    });

    // 2. Circles and Content Stagger
    steps.forEach((_, i) => {
      const position = (i / steps.length) * 0.6;

      tl.to(`.circle-${i}`, {
        backgroundColor: "var(--primary)", // Use your primary hex
        borderColor: "var(--primary)",
        scale: 1.2,
        duration: 0.1,
      }, position)
      .to(`.content-${i}`, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }, position);
    });

  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <>
      <div className="container mx-auto h-full md:h-[70vh] relative px-4 " ref={heroRef}>
        <div className="w-full relative flex flex-col md:flex-row gap-8 py-8 md:py-16 h-full">
          <div className="w-full md:w-1/2 flex flex-col justify-between gap-8 md:py-16">
            <h1 className="hero-text-item text-4xl lg:text-6xl text-primary  leading-tight font-bold">
              Software <br /> That Adapts to <br /> Your Business.
            </h1>
            <div>
              <p className="text-sm text-primary mb-8 mt-4 max-w-2xl ">We don't believe in "one-size-fits-all." We architect high-performance, custom database solutions and ERP systems designed strictly around your operational workflows. From complex inventory tracking to automated financial reporting, we build the engine that drives your business.</p>
              <div>
                <Button className="">Learn More</Button>
                <Button variant="link" className="">Learn More</Button>
              </div>
            </div>
          </div>
          <div className="main-visual-card flex items-center py-4 px-4 w-full md:w-1/2 h-full  relative rounded-md bg-[url(https://images.unsplash.com/photo-1658998765621-2cf0f12e059f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover">
            <div className="max-w-full md:max-w-2xl mx-auto rounded-md bg-white/70">
              <div className="workstream-grid-item flex flex-col md:flex-row md:justify-between items-start md:items-center p-4">
                <h3><strong>Workstreams</strong></h3>
                <div className="flex gap-3 md:mt-0 mt-4">
                  {workstreams.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      {/* The background class is now dynamic based on the object */}
                      <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 ">

                <div className="workstream-grid-item aspect-square bg-[#FF5E5E] rounded-xl flex items-center justify-center p-4 ">
                  <h1 className="text-white text-center font-medium">CRM Automation</h1>
                </div>
                <div className="workstream-grid-item aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4 ">
                  <h1 className="text-gray-400 text-center font-medium">Data Workflow</h1>
                </div>
                <div className="workstream-grid-item aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4 ">
                  <h1 className="text-gray-400 text-center font-medium">Maintenance</h1>
                </div>
                <div className="workstream-grid-item aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4 ">
                  <h1 className="text-gray-400 text-center font-medium">Security</h1>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="container mx-auto py-16 px-4 md:px-0">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-center mb-6 ">
          <div className="flex gap-4 items-center"> <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
            No
          </h1>
            <RotatingText
              texts={['templates.', 'Bloatware.']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-4xl lg:text-6xl text-primary-foreground  leading-tight font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            /></div>
          <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
            Just Code.
          </h1>
        </div>
        <div className="max-w-full md:max-w-5xl mx-auto ">
          <p className="text-sm text-primary mb-8 mt-4 max-w-2xl text-center mx-auto ">Most agencies sell you a pre-packaged CRM or ERP and try to force your unique processes into their rigid boxes. We do the opposite.</p>
        </div>
        <div className="max-w-full min-h-[400px] bg-[url(https://images.unsplash.com/photo-1636990649778-fd699d27c875?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover rounded-md md:max-w-5xl mx-auto flex items-end justify-end p-8">
          <div className="w-full md:w-1/2 bg-primary-foreground/70 md:rounded-xl rounded-md p-4">
            <div ref={highlightTextRef} className="min-h-[60px]">
              <p className="text-sm text-primary">
                <strong>{highlights[activeHighlight].title}:</strong>
                {highlights[activeHighlight].description}
              </p>
            </div>

            <div className="h-[2px] w-full bg-primary/10 mt-4 overflow-hidden">
              <div
                ref={highlightProgressRef}
                className="h-full bg-primary origin-left w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <section ref={containerRef} className="max-w-5xl mx-auto  py-20 md:px-0 px-4">
        <div className="w-full md:w-5xl">
          <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
            Scalable by Design. <br /> Grow Module by Module.
          </h1>
          <p className="text-sm text-primary mb-8 mt-4 ">We utilize a Modular Monolith or Microservices approach. This means we can build your system piece by piece. You can start with a single core module and plug in others as your business expands, ensuring seamless data flow between departments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE: Image + Headline Overlay */}
          <div className="relative aspect-square rounded-md overflow-hidden ">
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              className="slide-image object-cover rounded-md"
            />
            <div className="absolute bottom-6 left-6 slide-content">
              <div className="bg-primary-foreground backdrop-blur-md px-6 py-3 rounded-md">
                <h2 className=" ">{slides[index].title}</h2>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Features + Controls */}
          <div className="flex flex-col justify-between h-full">
            <ul className="space-y-6">
              {slides[index].features.map((feature, i) => (
                <li key={i} className="slide-content flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className=" text-primary  ">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>

            {/* PROGRESS & NAVIGATION */}
            <div className="pt-10 flex items-center gap-8">
              {/* Progress Bar Container */}
              <div className="relative h-[2px] w-full bg-slate-100 overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute top-0 left-0 h-full bg-black origin-left w-full"
                />
              </div>

              {/* Nav Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={handlePrev}
                  className="rounded-full h-10 w-10 cursor-pointer  "
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleNext}
                  className="rounded-full h-10 w-10 cursor-pointer "
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>
        <div className="w-full bg-primary py-16 my-16">
        <div className="fet container mx-auto min-h-[400px] flex items-center justify-center px-4">
          <div className="max-w-5xl w-full">
            <h1 className="text-4xl lg:text-6xl text-primary-foreground  leading-tight font-bold">Key Features</h1>

            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyFeatures.map((kf, i) => (
                <li key={i} className="bg-white/5 p-4 rounded-md">
                  <h3 className="font-semibold text-lg text-primary-foreground">{kf.title}</h3>
                  <p className="text-sm mt-2 text-primary-foreground/80">{kf.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full md:w-5xl mx-auto md:px-0 px-4">
        <div className="w-full ">
          <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
            Robust Backend, Lightning Frontend.
          </h1>
          <p className="text-sm text-primary mb-8 mt-4 ">We utilize a Modular Monolith or Microservices approach. This means we can build your system We combine the industry's most secure PHP framework with the world's fastest React framework to deliver an application that is solid as a rock and fast as light.</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-primary">The Backend: Laravel</h2>
            <p className="font-bold mb-3 mt-1">We use Laravel to build the heavy-lifting logic and API layers.</p>
            <ul className="list-disc text-sm flex flex-col gap-3">
              <li>

                Security First: Built-in protection against SQL injection, CSRF, and XSS attacks.
              </li>
              <li>

                Complex Logic: Perfect for handling complicated relationships e.g.,{("If Stock < 10 AND Vendor is X, create Order Y")}.
              </li>
              <li>
                Job Queues: Efficient handling of background tasks like sending thousands of emails or generating large PDF reports without slowing down the user.

              </li>

            </ul>
          </div>
          <div className="w-full md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-primary">The Frontend: Next.js</h2>
            <p className="font-bold mb-3 mt-1">We use Next.js for the user interface (Dashboard).</p>
            <ul className="list-disc text-sm flex flex-col gap-3">
              <li>

                Instant Interactions: No page reloads. The dashboard feels like a native desktop app.
              </li>
              <li>

                Data Visualization: Interactive charts and graphs powered by real-time data.
              </li>
              <li>
                Server-Side Rendering (SSR): Ensures fast initial loads and secure data fetching.

              </li>

            </ul>
          </div>
        </div>
        <div className="w-full min-h-[400px] bg-[url(https://images.unsplash.com/photo-1761798979849-ebb267341d50?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center rounded-md mt-5 flex items-center justify-center p-8 gap-10 md:gap-20">
        <Image
          src="/images/tailwind.png"
          alt="Backend and Frontend Illustration"
          height={60}
          width={60}
          className="object-contain bg-white/50 p-2 rounded-full quality-100 backdrop-blur-md mt-40 "
        />
        <Image
          src="/images/next.png"
          alt="Backend and Frontend Illustration"
          height={60}
          width={60}
          className="object-contain bg-white/50 p-2 rounded-full quality-100 backdrop-blur-md mb-40 "
        />
        <Image
          src="/images/react.png"
          alt="Backend and Frontend Illustration"
          height={60}
          width={60}
          className="object-contain bg-white/50 p-2 rounded-full quality-100 backdrop-blur-md mt-25"
        />
        <Image
          src="/images/laravel.png"
          alt="Backend and Frontend Illustration"
          height={60}
          width={60}
          className="object-contain bg-white/50 p-2 rounded-full quality-100 backdrop-blur-md mb-25 "
        />

        </div>
      </div>
    <div ref={sectionRef} className="py-16">
      <div ref={triggerRef} className="py-0 md:py-16 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full md:max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-20 items-center">
          
          {/* LEFT: Static Header */}
          <div className="max-w-md">
            <h2 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
              Our Database <br /> Architecture <br /> Lifecycle
            </h2>
          </div>

          {/* RIGHT: The Stepper */}
          <div className="relative h-[500px] flex items-center">
            {/* Background Track */}
            <div className="absolute left-6 h-full w-[2px] bg-slate-800 rounded-full" />
            {/* Animated Active Line */}
            <div className="step-line-active absolute top-0 left-6 h-0 w-[2px] bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] z-10" />

            {/* Steps Container */}
            <div className="flex flex-col justify-between h-full w-full py-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-12 relative">
                  {/* Indicator */}
                  <div className={`circle-${index} w-3 h-3 rounded-full  border-2 border-primary z-20 shrink-0 transition-all duration-300 ml-[18.5px]`} />
                  
                  {/* Text Content */}
                  <div className={`content-${index} opacity-0`}>
                    <h4 className="text-primary font-bold text-xl mb-1">{step.title}</h4>
                    <p className="text-muted-foreground text-sm max-w-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}