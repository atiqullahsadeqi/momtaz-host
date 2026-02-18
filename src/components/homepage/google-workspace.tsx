import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function GoogleWorkspace() {
  return (
    <section className="py-20  overflow-hidden">
      <div className="container mx-auto px-4">
        <div className=" flex items-center gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold ">
            Professional Email & Collaboration <br /> Powered by Google.
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            As an official Google Workspace Partner, we help you set up and
            manage professional business email, cloud storage, and secure
            collaboration tools like Gmail, Drive, Docs, Meet, and more – all
            under your custom domain.
          </p>

           <Button variant="link" className="w-full sm:w-auto" asChild>
            <a href="" target="_blank">
              {"Explore Google Workspace"}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          </div>

          {/* Google Workspace Visual */}
          <div className="relative flex items-center justify-center mt-12">
            <div className="relative aspect-ratio-2/1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1603539240352-8f2cce3257c4?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gmail Interface"
               
                width={900}
                height={400}
                className="rounded-lg   "
              />
               

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
