"use client";
import React from 'react';
import { FigmaFrame } from "@/components/webdevpage/FigmaFrame";
import GridDistortion from '@/components/GridDistortion';
import Image from 'next/image'
import { Button } from "@/components/ui/button"



export default function WebDevelopmentPage() {






  return (
    <>
      <div className="w-full relative md:p-16">
        <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-white  rounded-md">

          <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <GridDistortion
              imageSrc="https://images.unsplash.com/photo-1748314810292-d2ce38a1d62c?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              grid={10}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
              className="custom-class"
            />
          </div>

          {/* 2. Main Content Area */}
          <main className="relative z-10 mx-auto px-4">

            <FigmaFrame>
              <h1 className="text-4xl lg:text-6xl text-primary-foreground  leading-tight font-bold">
                Crafting Digital <br />
                Experiences That Convert.
              </h1>

              <p className="text-sm text-primary-foreground mb-8 mt-4 max-w-2xl mx-auto">
                We build pixel-perfect, secure, and scalable websites designed to
                elevate your brand and engage your audience. Whether you need a simple
                refresh or a complex custom platform, we turn your vision into code.
              </p>

              <div className="flex items-center justify-center gap-4">
                <Button variant="default">
                  Get Started
                </Button>
                <Button variant="outline">
                  View Pricing
                </Button>
              </div>
            </FigmaFrame>

            {/* 3. Logos Section */}
            <div className="mt-16 flex justify-center gap-8 grayscale opacity-70">
              {/* Replace these with your actual logo SVGs or Images */}
              <div className="h-10 w-10 bg-blue-200 rounded-full" />
              <div className="h-10 w-10 bg-blue-400 rounded-full" />
              <div className="h-10 w-10 bg-black rounded-full" />
              <div className="h-10 w-10 bg-green-500 rounded-full" />
            </div>

          </main>
        </div>
      </div>
      <div className='w-full min-h-screen'>
        <div className="bg-black min-h-[70vh] md:min-h-[50vh]">
          <div className="container mx-auto pb-0 ">
            <div className='flex flex-col md:flex-row items-end justify-end min-h-[70vh] md:min-h-[50vh]  '>
              <div className="w-full md:w-1/2 h-full  pb-6 md:pb-16 px-6 md:px-0">
                <h1 className='text-4xl lg:text-6xl text-primary-foreground  leading-tight font-bold'>Is your current <br /> site stuck in the <br /> past?</h1>
              </div>
              <div className="w-full md:w-1/2 h-full pb-16 px-6 md:px-0">
                <p className='text-white text-xs md:text-base'>We breathe new life into outdated websites. Our redesign process isn&apos;t just a facelift; we analyze your current user experience and restructure your site to improve navigation, modern aesthetics, and conversion rates. Keep your content, lose the clutter.</p>
                <Button variant="outline" className='mt-6'>
                  Let&apos;s Talk
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='min-h-[30vh] md:min-h-[50vh] bg-[url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center'>
        </div>
      </div>
      <div className="w-full relative md:p-16">
        <div className="max-w-full md:max-w-5xl  mx-auto py-16 px-6">
          <div className="flex flex-col items-center justify-center gap-5 md:gap-10">
            <div className="flex items-center justify-center gap-6">
              <h1 className="text-[clamp(3rem,8vw,8rem)] text-primary leading-tight font-bold">Flawless on</h1>
              <div className='relative md:h-[10em] md:w-[10em] h-[3em] w-[3em] overflow-hidden rounded-full shrink-0'>
                <Image
                  src='https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='mobile-browsing-web'
                  width={200}
                  height={200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  quality={100}
                  className='aspect-square rounded-full'
                />
              </div>

            </div>
            <div className="flex items-center justify-center gap-5 md:gap-16">
              <div className='relative md:w-[30em] md:h-[10em] h-[4em] w-[12em] overflow-hidden rounded-full shrink-0'>
                <Image
                  src='https://images.unsplash.com/photo-1614801502766-e2562eb626d5?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='mobile-browsing-web'
                  width={600}
                  height={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  quality={100}
                  className='aspect-[3/1] rounded-full'
                /></div>

              <h1 className="text-[clamp(3rem,8vw,8rem)] text-primary   leading-tight font-bold">Every</h1>
            </div>
            <div className="flex items-center justify-center gap-5 md:gap-16">
              <h1 className="text-[clamp(3rem,8vw,8rem)] text-primary   leading-tight font-bold">Device</h1>
              <div className='relative md:w-[30em] md:h-[10em]  h-[4em] w-[12em] overflow-hidden rounded-full shrink-0'>
                <Image
                  src='https://images.unsplash.com/photo-1739459365404-d531b64d2c22?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='mobile-browsing-web'
                  width={600}
                  height={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  quality={100}
                  className='aspect-[3/1] rounded-full'
                />
              </div>


            </div>
            <div className="flex items-start justify-start gap-16 w-full ">
              <p className='text-left text-primary/80 max-w-md md:-mt-12 md:ml-4 text-xs md:text-sm'>
                Your users are everywhere—on phones, tablets, laptops, and desktops. We adopt a Mobile-First approach to development.
                We ensure your website looks stunning, whether viewed on a 6-inch phone or a 27-inch monitor.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative md:p-16">
        <div className="max-w-full md:max-w-5xl  mx-auto pb-16">
          <div className=" flex md:flex-row flex-col items-center justify-center gap-16 w-full ">
            <div className="flex flex-col w-full md:w-1/2 items-start justify-start gap-10 px-6 md:px-0">
              <h1 className="text-4xl lg:text-5xl text-primary   leading-tight font-bold ">Built for Speed & <br />
                Efficiency</h1>
              <p className='text-left text-primary max-w-2xl  text-sm font-bold'>
                A slow website costs you customers. We obsess over performance metrics to ensure your site ranks high and loads instantly.
              </p>
              <ul className=' flex flex-col gap-4 text-sm'>
                <li><strong>Core Web Vitals:</strong> We optimize for LCP, FID, and CLS to meet Google&apos;s rigorous standards.</li>
                <li><strong>Asset Optimization:</strong> Image compression, code minification, and lazy loading implementation.</li>
                <li><strong>Caching Strategies:</strong> Advanced server-side and browser caching for instant page delivery.</li>
                <li><strong>Google Analytics (GA4):</strong> Deep dive into user behavior and traffic sources.</li>
                <li><strong>Search Console:</strong> Monitor search health and keyword performance.</li>
                <li><strong>Business Profile & Maps:</strong> Essential integration for local SEO visibility.</li>
                <li><strong>Google Tag Manager:</strong> Organized management of marketing tags without code clutter.</li>
              </ul>
            </div>
            <div className='flex flex-col w-full md:w-1/2 items-center justify-center gap-10 px-6 md:px-0'>
              <Image
                src='https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='mobile-browsing-web'
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                quality={100}
                className='aspect-[2/3] rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
