import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Globe, Zap } from "lucide-react";

export default function GoogleWorkspace() {
  const apps = [
    { name: "Gmail", imageSrc: "/images/Gmail.png", brandColor: "#EA4335" },
    { name: "Google Drive", imageSrc: "/images/Google Drive.png", brandColor: "#0F9D58" },
    { name: "Google Meet", imageSrc: "/images/Google Meet.png", brandColor: "#00AC47" },
    { name: "Google Docs", imageSrc: "/images/Google-Docs.png", brandColor: "#4285F4" },
    { name: "Google Calendar", imageSrc: "/images/Google-Calendar.png", brandColor: "#4285F4" },
    { name: "Google Sheets", imageSrc: "/images/Google-Sheets.png", brandColor: "#0F9D58" },
  ];

  const features = [
    { icon: Globe, text: "Custom email on your own domain" },
    { icon: ShieldCheck, text: "Advanced security & admin controls" },
    { icon: Zap, text: "Seamless integration across apps" }
  ];

  return (
    <section className="w-full bg-muted/5 border-b border-border/60 relative flex flex-col items-center ">
      <div className="w-full max-w-[1100px] mx-auto border-y border-border/60 bg-background flex flex-col md:flex-row shadow-sm">

        {/* Left Column: Text & Features */}
        <div className="w-full md:w-[40%] p-10 lg:p-16 border-b md:border-b-0 md:border-r border-border/60 flex flex-col justify-center">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]">
            Professional Workspace perfectly integrated.
          </h2>

          <div className="space-y-6 mb-10">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 text-muted-foreground">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center bg-muted/30">
                  <feature.icon className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed pr-4">
            As an official Google Workspace Partner, we help you set up and
            manage professional business email, cloud storage, and secure
            collaboration tools – all under your custom domain.
          </p>

          <Button className=" flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 py-5 font-semibold ">
            Explore Workspace
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Right Column: Apps Grid */}
        <div className="w-full md:w-[60%]  ">
          <div className="grid grid-cols-1 sm:grid-cols-2   h-full">
            {apps.map((app, index) => (
              <div
                key={index}
                className={`bg-background pb-4  flex flex-col items-start border-r ${index % 2 === 0 ? 'border-border/60' : 'border-transparent'} group relative  pr-0`}
              >

                {/* Top Section: App Icon + Grid Pattern */}
                <div
                  className={`h-40 w-60 relative overflow-hidden flex items-center justify-center`}
                  style={{ backgroundColor: `${app.brandColor}0A` }}
                >
                  {/* Subtle Dashed Graph Paper Grid Pattern specific to the card */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.1]"
                    style={{
                      backgroundColor: 'currentColor',
                      maskImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 24 0 L 24 24 M 0 24 L 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 24 0 L 24 24 M 0 24 L 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
                      maskSize: '35px 35px',
                      WebkitMaskSize: '35px 35px',
                      color: app.brandColor
                    }}
                  />

                  {/* Icon Container */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-border/80 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
                    <Image src={app.imageSrc} alt={app.name} width={32} height={32} className="object-contain" />
                  </div>
                </div>

                {/* Bottom Section: Text */}
                <div className="p-3 bg-muted/60 w-60 flex items-center justify-between border-t border-border/40">
                  <h3 className="font-semibold text-foreground tracking-tight text-sm">{app.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
