"use client";
import React, { useEffect, useState } from "react";
import Homepage from "@/components/homepage/homepage";
import { sampleHomepageData } from "@/lib/homepage-data";
import { getHomepage, transformStrapiData, getStrapiData } from "@/lib/strapi";

export default function Home() {
  const [homepageData, setHomepageData] = useState(sampleHomepageData);
  const [isLoading, setIsLoading] = useState(true);
  const [useStrapi, setUseStrapi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if Strapi is available
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        if (!strapiUrl) {
          console.log("No Strapi URL configured, using sample data");
          setUseStrapi(false);
          return;
        }

        console.log("Attempting to fetch from Strapi:", strapiUrl);

        // Fetch data from Strapi
        const strapiData = await getHomepage();
        console.log("Raw Strapi data:", strapiData);
        console.log("Hero section data:", (strapiData as any)?.heroSection || 'No hero section data');
        
        // Transform the data to match our component structure
        const transformedData = transformStrapiData(strapiData);
        console.log("Transformed data:", transformedData);
        console.log("Transformed hero section:", (transformedData as any)?.heroSection || 'No transformed hero section data');
        
        // Merge with sample data to ensure all required fields exist
        const mergedData = {
          heroSection: {
            ...sampleHomepageData.heroSection,
            ...getStrapiData(transformedData, 'heroSection', {}),
          },
          companyLogos: {
            ...sampleHomepageData.companyLogos,
            ...getStrapiData(transformedData, 'companyLogos', {}),
          },
          domainSearch: {
            ...sampleHomepageData.domainSearch,
            ...getStrapiData(transformedData, 'domainSearch', {}),
          },
          servicesSection: {
            ...sampleHomepageData.servicesSection,
            ...getStrapiData(transformedData, 'servicesSection', {}),
          },
          pricingSection: {
            ...sampleHomepageData.pricingSection,
            ...getStrapiData(transformedData, 'pricingSection', {}),
          },
          whyChooseUs: {
            ...sampleHomepageData.whyChooseUs,
            ...getStrapiData(transformedData, 'whyChooseUs', {}),
          },
          googleWorkspace: {
            ...sampleHomepageData.googleWorkspace,
            ...getStrapiData(transformedData, 'googleWorkspace', {}),
          },
          testimonials: {
            ...sampleHomepageData.testimonials,
            ...getStrapiData(transformedData, 'testimonials', {}),
          },
          enhancedCta: {
            ...sampleHomepageData.enhancedCta,
            ...getStrapiData(transformedData, 'enhancedCta', {}),
          },
        };
        
        setHomepageData(mergedData);
        setUseStrapi(true);
        console.log("Successfully loaded data from Strapi");
        
      } catch (error) {
        console.error("Error fetching from Strapi:", error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setUseStrapi(false);
        // Keep using sample data as fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Development indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            useStrapi 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}>
            {useStrapi ? '📡 Strapi Connected' : '📄 Sample Data'}
          </div>
          {error && (
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 max-w-xs">
              ⚠️ {error}
            </div>
          )}
        </div>
      )}
      
      <Homepage data={homepageData} />
    </div>
  );
}