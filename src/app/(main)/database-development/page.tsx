"use client";

import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import RotatingText from '@/components/RotatingText'

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




  return (
    <>
      <div className="container mx-auto">
        <div className="w-full flex gap-8 py-16">
          <div className="w-1/2 flex flex-col justify-between gap-8 py-16">
            <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
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
          <div className="w-1/2 aspect-3/4 overflow-hidden relative rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1658998765621-2cf0f12e059f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="rounded-md  object-cover  "
              fill

            />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-16">
        <div className="max-w-5xl mx-auto flex gap-6 items-center justify-center mb-6 ">
          <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
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
          />
          <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
            Just Code.
          </h1>
        </div>
        <div className="max-w-full md:max-w-5xl mx-auto ">
          <p className="text-sm text-primary mb-8 mt-4 max-w-2xl text-center mx-auto ">Most agencies sell you a pre-packaged CRM or ERP and try to force your unique processes into their rigid boxes. We do the opposite.</p>
        </div>
        <div className="max-w-full min-h-[400px] bg-[url(https://images.unsplash.com/photo-1636990649778-fd699d27c875?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover rounded-md md:max-w-5xl mx-auto flex items-end justify-end p-8">
          <div className="w-full md:w-1/2 bg-primary-foreground/70 rounded-sm p-4 ">
            <p className="text-sm text-primary  max-w-2xl text-muted-foreground">
              Zero Pre-Made Solutions: We start with a blank canvas. We map your actual paper trails and digital workflows first, then architect a database schema that mirrors reality.
            </p>
          </div>
        </div>
      </div>
      <section ref={containerRef} className="max-w-5xl mx-auto  py-20">
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

    <div className="w-full md:w-5xl mx-auto">
       <div className="w-full ">
          <h1 className="text-4xl lg:text-6xl text-primary  leading-tight font-bold">
            Robust Backend, Lightning Frontend.
          </h1>
          <p className="text-sm text-primary mb-8 mt-4 ">We utilize a Modular Monolith or Microservices approach. This means we can build your system We combine the industry's most secure PHP framework with the world's fastest React framework to deliver an application that is solid as a rock and fast as light.</p>
        </div>
    </div>
    </>
  );
}