import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Momtaz Host</h3>
            <p className="text-gray-400 mb-4">
              Professional hosting and web services provider offering reliable solutions for businesses of all sizes.
            </p>
            <div className="text-gray-400">
              <p>Email: info@momtazhost.com</p>
              <p>Phone: +93 XXX XXX XXX</p>
            </div>
          </div>

          {/* Hosting Services */}
          <div>
            <h4 className="font-semibold mb-4">Hosting</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/hosting/vps" className="hover:text-white">VPS Hosting</Link></li>
              <li><Link href="/hosting/shared" className="hover:text-white">Shared Hosting</Link></li>
              <li><Link href="/hosting/cloud" className="hover:text-white">Cloud Hosting</Link></li>
              <li><Link href="/hosting/windows" className="hover:text-white">Windows Hosting</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/domains" className="hover:text-white">Domain Registration</Link></li>
              <li><Link href="/web-development" className="hover:text-white">Web Development</Link></li>
              <li><Link href="/database-development" className="hover:text-white">Database Development</Link></li>
              <li><Link href="/mobile-development" className="hover:text-white">Mobile Development</Link></li>
              <li><Link href="/google-workspace" className="hover:text-white">Google Workspace</Link></li>
              <li><Link href="/seo-services" className="hover:text-white">SEO Services</Link></li>
              <li><Link href="/branding" className="hover:text-white">Branding</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Client Area</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Momtaz Host. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
