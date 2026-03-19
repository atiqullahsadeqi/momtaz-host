"use client";

import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COUNTRIES = ["Afghanistan","Albania","Algeria","Argentina","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Belgium","Brazil","Canada","China","Denmark","Egypt","Finland","France","Germany","Greece","Hungary","India","Indonesia","Iran","Iraq","Ireland","Italy","Japan","Jordan","Kazakhstan","Kuwait","Lebanon","Malaysia","Mexico","Morocco","Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Philippines","Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sweden","Switzerland","Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Uzbekistan","Vietnam"];

interface ContactInfo {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; city: string; state: string; zip: string; country: string;
}

const empty: ContactInfo = { firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "", country: "" };

export default function DomainRegisterPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = use(params);
  const decodedDomain = decodeURIComponent(domain);
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainPrice = parseFloat(searchParams.get("price") ?? "0") || 0;

  const [period, setPeriod] = useState("1");
  const [contact, setContact] = useState<ContactInfo>(empty);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "offline">("stripe");
  const [resolvedPrice, setResolvedPrice] = useState(domainPrice);

  // Re-fetch price if not passed in URL
  useEffect(() => {
    if (domainPrice > 0) { setResolvedPrice(domainPrice); return; }
    fetch(`/api/domains/check?domain=${encodeURIComponent(decodedDomain)}`)
      .then(r => r.json())
      .then(d => { if (d.success && d.data.results[0]?.price) setResolvedPrice(parseFloat(d.data.results[0].price)); })
      .catch(() => {});
  }, [decodedDomain, domainPrice]);

  const [isOrdering, setIsOrdering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setContact(p => ({ ...p, [k]: e.target.value }));

  const isValid = Object.values(contact).every(v => v.trim().length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsOrdering(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "domain",
          planId: `domain-${decodedDomain}`,
          planName: decodedDomain,
          domain: decodedDomain,
          domainType: "new",
          configuration: { period: parseInt(period), contact },
          totalMonthly: 0,
          setupFee: resolvedPrice * parseInt(period),
        }),
      });
      const result = await res.json();
      if (result.success) {
        window.location.href = result.checkoutUrl
          ? `${result.checkoutUrl}?method=${paymentMethod}`
          : `/dashboard/orders/${result.order.id}`;
      } else if (res.status === 401) {
        router.push(`/login?callbackURL=/domains/register/${domain}`);
      } else {
        throw new Error(result.error ?? "Order failed");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Order failed");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-16 px-6 min-h-screen bg-muted/30">
      <div className="w-full max-w-[600px]">
        <Link href="/domains" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />Back to Domain Search
        </Link>

        {/* Domain summary */}
        <div className="border border-border/60 rounded-2xl bg-background p-5 flex items-center justify-between mb-6">
          <div>
            <p className="font-bold text-lg">{decodedDomain}</p>
            <p className="text-xs text-muted-foreground">New domain registration</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["1","2","3","5"].map(y => <SelectItem key={y} value={y}>{y} Year{y !== "1" ? "s" : ""}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Contact info */}
          <div className="border border-border/60 rounded-2xl bg-background overflow-hidden">
            <div className="border-b border-border/60 p-5">
              <p className="font-semibold">Registrant Contact</p>
              <p className="text-xs text-muted-foreground mt-0.5">Used for WHOIS and domain management</p>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              <Input placeholder="First Name *" value={contact.firstName} onChange={set("firstName")} required />
              <Input placeholder="Last Name *" value={contact.lastName} onChange={set("lastName")} required />
              <Input placeholder="Email Address *" type="email" value={contact.email} onChange={set("email")} required className="col-span-2" />
              <Input placeholder="Phone (e.g. +1 555 000 0000) *" value={contact.phone} onChange={set("phone")} required className="col-span-2" />
              <Input placeholder="Address *" value={contact.address} onChange={set("address")} required className="col-span-2" />
              <Input placeholder="City *" value={contact.city} onChange={set("city")} required />
              <Input placeholder="State / Province *" value={contact.state} onChange={set("state")} required />
              <Input placeholder="ZIP / Postal Code *" value={contact.zip} onChange={set("zip")} required />
              <Select value={contact.country} onValueChange={v => setContact(p => ({ ...p, country: v }))}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Country *" /></SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment method */}
          <div className="border border-border/60 rounded-2xl bg-background overflow-hidden">
            <div className="border-b border-border/60 p-5">
              <p className="font-semibold">Payment Method</p>
            </div>
            <div className="divide-y divide-border/60">
              {(["stripe", "paypal", "offline"] as const).map(m => {
                const labels = { stripe: "Credit / Debit Card", paypal: "PayPal", offline: "Offline / Bank Transfer" };
                const icons = { stripe: "💳", paypal: "🅿️", offline: "🏦" };
                return (
                  <button key={m} type="button" onClick={() => setPaymentMethod(m)}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 text-sm transition-colors ${paymentMethod === m ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/40"}`}>
                    <span className="text-xl">{icons[m]}</span>
                    <span className="font-medium">{labels[m]}</span>
                    {paymentMethod === m && <span className="ml-auto text-xs text-primary font-semibold">Selected</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <Button type="submit" disabled={!isValid || isOrdering}
            className="w-full h-12 rounded-full bg-brand-green hover:bg-brand-green/80 text-white font-semibold">
            {isOrdering ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Placing Order…</> : `Register ${decodedDomain}`}
          </Button>
        </form>
      </div>
    </div>
  );
}
