import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 pt-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Momtaz Host
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Professional hosting and web services provider offering reliable
              solutions for businesses of all sizes.
            </p>
            <div className="text-muted-foreground text-sm">
              <p>Email: info@momtazhost.com</p>
              <p>Phone: +93 XXX XXX XXX</p>
            </div>
          </div>

          {/* Hosting Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Hosting</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/hosting/vps"
                  className="hover:text-foreground transition-colors"
                >
                  VPS Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting/shared"
                  className="hover:text-foreground transition-colors"
                >
                  Shared Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting/cloud"
                  className="hover:text-foreground transition-colors"
                >
                  Cloud Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting/windows"
                  className="hover:text-foreground transition-colors"
                >
                  Windows Hosting
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/domains"
                  className="hover:text-foreground transition-colors"
                >
                  Domain Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/web-development"
                  className="hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/database-development"
                  className="hover:text-foreground transition-colors"
                >
                  Database Development
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-development"
                  className="hover:text-foreground transition-colors"
                >
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link
                  href="/google-workspace"
                  className="hover:text-foreground transition-colors"
                >
                  Google Workspace
                </Link>
              </li>
              <li>
                <Link
                  href="/seo-services"
                  className="hover:text-foreground transition-colors"
                >
                  SEO Services
                </Link>
              </li>
              <li>
                <Link
                  href="/branding"
                  className="hover:text-foreground transition-colors"
                >
                  Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Client Area
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-3 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Momtaz Host. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
