import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Hosting & Web Services
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Reliable hosting solutions, domain registration, and web development services 
            to power your online presence with 99.9% uptime guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/hosting/shared">Get Started Today</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
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
