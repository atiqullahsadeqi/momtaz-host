import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-left">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-medium">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Professional Hosting Solutions
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                All in one Web hosting
                <br />
                for your business
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 max-w-lg">
                Keep your website running smoothly with reliable hosting solutions. 
                Manage domains, hosting, and applications quickly, easily & efficiently.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8">
                  Get Started
                </Button>
                <Button variant="ghost" size="lg" className="text-gray-700" asChild>
                  <Link href="/hosting/shared">
                    View Pricing
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">A</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">M</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">S</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">12k+</div>
                  <div className="text-sm text-gray-600">Trusted by businesses worldwide</div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative animate-fade-in-right">
              <Image
                src="/images/Hero-Right-Side-Image.jpg"
                alt="Momtaz Host Dashboard"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
                priority
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 lg:space-x-12 opacity-40 flex-wrap">
            <div className="text-2xl lg:text-4xl font-bold text-gray-400">slack</div>
            <div className="text-2xl lg:text-4xl font-bold text-gray-400">zoom</div>
            <div className="text-2xl lg:text-4xl font-bold text-gray-400">airbnb</div>
            <div className="text-2xl lg:text-4xl font-bold text-gray-400">spotify</div>
            <div className="text-2xl lg:text-4xl font-bold text-gray-400">envato</div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Web Hosting</h3>
              <p className="text-gray-600 mb-4">VPS, Shared, Cloud & Windows hosting solutions</p>
              <Button variant="outline" asChild>
                <Link href="/hosting/shared">View Plans</Link>
              </Button>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Domain Registration</h3>
              <p className="text-gray-600 mb-4">Register .af domains and international TLDs</p>
              <Button variant="outline" asChild>
                <Link href="/domains">Search Domains</Link>
              </Button>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Web Development</h3>
              <p className="text-gray-600 mb-4">Custom websites and WordPress solutions</p>
              <Button variant="outline" asChild>
                <Link href="/web-development">Learn More</Link>
              </Button>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Google Workspace</h3>
              <p className="text-gray-600 mb-4">Professional email and collaboration tools</p>
              <Button variant="outline" asChild>
                <Link href="/google-workspace">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers who trust Momtaz Host</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
