import React from "react";

interface CompanyLogo {
  name: string;
  logo?: {
    url: string;
    alt: string;
  };
}

interface CompanyLogosProps {
  logos: CompanyLogo[];
}

export default function CompanyLogos({ logos }: CompanyLogosProps) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-8 lg:space-x-12 opacity-40 flex-wrap">
          {logos.map((logo, index) => (
            <div key={index} className="text-2xl lg:text-4xl font-bold text-muted-foreground">
              {logo.logo ? (
                <img
                  src={logo.logo.url}
                  alt={logo.logo.alt}
                  className="h-8 lg:h-12 w-auto"
                />
              ) : (
                logo.name
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

