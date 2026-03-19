import Link from "next/link";

const hosting = [
  { label: "VPS Hosting", href: "/hosting/vps" },
  { label: "Shared Hosting", href: "/hosting/shared" },
  { label: "Dedicated Servers", href: "/hosting/dedicated" },
  { label: "Windows Server", href: "/hosting/windows-server" },
];

const services = [
  { label: "Domain Registration", href: "/domains" },
  { label: "Google Workspace", href: "/google-workspace" },
  { label: "Web Development", href: "/web-development" },
  { label: "Mobile Development", href: "/mobile-development" },
  { label: "Database Development", href: "/database-development" },
  { label: "SEO Services", href: "/seo-services" },
  { label: "Branding", href: "/branding" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Client Area", href: "/dashboard" },
];

export function Footer() {
  return (
    <footer className="bg-muted/10 border-t border-border/60 text-card-foreground">
      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-lg font-bold text-foreground">Momtaz Host</span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Reliable hosting, professional web services, and digital solutions — all under one roof.
            </p>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a href="mailto:info@momtazhost.com" className="hover:text-foreground transition-colors">info@momtazhost.com</a>
              <a href="https://t.me/momtazhost" className="hover:text-foreground transition-colors">Telegram: @momtazhost</a>
            </div>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">Hosting</h4>
            <ul className="space-y-2.5">
              {hosting.map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-border/60 pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Momtaz Host. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
