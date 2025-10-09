import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleWorkspace() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Professional Email & Collaboration - Powered by Google.
          </h2>
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
            As an official Google Workspace Partner, we help you set up and
            manage professional business email, cloud storage, and secure
            collaboration tools like Gmail, Drive, Docs, Meet, and more – all
            under your custom domain.
          </p>

          <Button size="lg" className="px-8 py-3 cursor-pointer">
            View Pricing
          </Button>

          {/* Google Workspace Visual */}
          <div className="relative flex items-center justify-center mt-12">
            <div className="relative">
              <div className="z-10 bg-gradient-to-t from-background via-background/80 to-transparent w-full h-50 absolute -bottom-10 left-0"></div>
              <Image
                src="/images/Google-Workspace.png"
                alt="Gmail Interface"
                width={800}
                height={400}
                className=""
              />

              {/* Google App Icons around the Gmail interface */}
              {/* Google Calendar - top left */}
              <div className="absolute -top-8 -left-16 bg-primary/10 rounded-lg p-2">
                <Image
                  src="/images/Google-Calendar.png"
                  alt="Google Calendar"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-md"
                />
              </div>

              {/* Google Drive - top right */}
              <div className="absolute -top-8 -right-16 bg-primary/10 rounded-lg p-2">
                <Image
                  src="/images/Google Drive.png"
                  alt="Google Drive"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-md"
                />
              </div>

              {/* Gmail - left side */}
              <div className="absolute top-1/3 -left-16 bg-primary/10 rounded-lg p-2">
                <Image
                  src="/images/Gmail.png"
                  alt="Gmail"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-md"
                />
              </div>

              {/* Google Meet - right side */}
              <div className="absolute top-1/2 -right-16 bg-primary/10 rounded-lg p-2">
                <Image
                  src="/images/Google Meet.png"
                  alt="Google Meet"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-md"
                />
              </div>

              {/* Empty decorative squares */}
              <div className="absolute -bottom-8 left-20 bg-primary/10 rounded-lg h-12 w-12 -z-10"></div>
              <div className="absolute top-12 -right-8 bg-primary/10 rounded-lg h-16 w-16 -z-10"></div>
              <div className="absolute bottom-16 -right-6 bg-primary/10 rounded-lg h-14 w-14 -z-10"></div>
              <div className="absolute top-20 -left-4 bg-primary/10 rounded-lg h-10 w-10 -z-10"></div>
              <div className="absolute bottom-8 -left-6 bg-primary/10 rounded-lg h-8 w-8 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
