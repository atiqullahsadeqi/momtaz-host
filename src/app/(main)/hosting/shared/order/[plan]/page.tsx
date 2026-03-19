"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OrderInquiryButton } from "@/components/order-inquiry-button";
import { Globe, Package, ChevronRight, ChevronLeft, Loader2, Check, Search, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Plan {
    name: string; displayName: string; price: number; features: string[]; isPopular: boolean;
}
type Step = "domain" | "payment" | "review";
type DomainMode = "existing" | "new";
type DomainStatus = "idle" | "checking" | "available" | "unavailable" | "error";

const STEPS: { key: Step; label: string }[] = [
    { key: "domain", label: "Domain" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
];

function StepBar({ current }: { current: Step }) {
    const idx = STEPS.findIndex(s => s.key === current);
    return (
        <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= idx ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                        {i < idx ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${i === idx ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                    {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
            ))}
        </div>
    );
}

export default function SharedOrderPage({ params }: { params: Promise<{ plan: string }> }) {
    const { plan: planSlug } = use(params);
    const router = useRouter();

    const [plan, setPlan] = useState<Plan | null>(null);
    const [isLoadingPlan, setIsLoadingPlan] = useState(true);
    const [step, setStep] = useState<Step>("domain");

    // Domain state
    const [domainMode, setDomainMode] = useState<DomainMode>("existing");
    const [domain, setDomain] = useState("");
    const [domainQuery, setDomainQuery] = useState("");
    const [domainStatus, setDomainStatus] = useState<DomainStatus>("idle");
    const [domainAvailablePrice, setDomainAvailablePrice] = useState<number | null>(null);

    // Payment state
    const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "offline">("stripe");

    const [isOrdering, setIsOrdering] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/hosting/packages")
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    const found = data.data.find((p: Plan) => p.name === planSlug);
                    if (found) setPlan(found); else router.push("/hosting/shared");
                }
            })
            .catch(console.error)
            .finally(() => setIsLoadingPlan(false));
    }, [planSlug, router]);

    const checkDomain = async () => {
        if (!domainQuery.trim()) return;
        setDomainStatus("checking");
        try {
            const res = await fetch(`/api/domains/check?domain=${encodeURIComponent(domainQuery.trim())}`);
            const data = await res.json();
            if (data.available) {
                setDomainStatus("available");
                setDomainAvailablePrice(data.price ?? null);
                setDomain(domainQuery.trim());
            } else {
                setDomainStatus("unavailable");
            }
        } catch { setDomainStatus("error"); }
    };

    const canProceedDomain = domainMode === "existing" ? domain.trim().length > 3 : domainStatus === "available";

    const handlePlaceOrder = async () => {
        if (!plan || !domain) return;
        setIsOrdering(true);
        setOrderError(null);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderType: "shared", planId: plan.name, planName: plan.displayName,
                    configuration: { features: plan.features },
                    domain, domainType: domainMode,
                    totalMonthly: plan.price, setupFee: 0,
                }),
            });
            const result = await res.json();
            if (result.success) {
                window.location.href = result.checkoutUrl
                    ? `${result.checkoutUrl}?method=${paymentMethod}`
                    : `/dashboard/orders/${result.order.id}`;
            } else if (res.status === 401) {
                router.push(`/login?callbackURL=/hosting/shared/order/${planSlug}`);
            } else {
                throw new Error(result.error ?? "Order failed");
            }
        } catch (err: unknown) {
            setOrderError(err instanceof Error ? err.message : "Order failed");
        } finally {
            setIsOrdering(false);
        }
    };

    if (isLoadingPlan) return (
        <div className="min-h-screen bg-background flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-brand-green" /><span className="text-sm">Loading plan…</span>
        </div>
    );
    if (!plan) return null;

    return (
        <div className="w-full flex flex-col items-center py-16 px-6 bg-muted/30 min-h-screen">
            <div className="w-full max-w-[560px]">
                <Link href="/hosting/shared" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ChevronLeft className="w-4 h-4" />Back to Plans
                </Link>

                {/* Plan summary bar */}
                <div className="w-full border border-border/60 rounded-2xl bg-background p-5 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                            <Package className="h-5 w-5 text-brand-green" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{plan.displayName}</p>
                            <p className="text-xs text-muted-foreground">Shared Hosting</p>
                        </div>
                    </div>
                    <p className="font-bold text-lg">${plan.price.toFixed(2)}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                </div>

                <StepBar current={step} />

                {/* ── Step 1: Domain ── */}
                {step === "domain" && (
                    <div className="border border-border/60 rounded-2xl bg-background overflow-hidden">
                        <div className="border-b border-border/60 p-6 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                                <Globe className="h-5 w-5 text-brand-green" />
                            </div>
                            <div>
                                <p className="font-semibold">Choose Your Domain</p>
                                <p className="text-xs text-muted-foreground">A domain is required for cPanel shared hosting</p>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            {/* Mode toggle */}
                            <div className="grid grid-cols-2 gap-3">
                                {([
                                    { mode: "existing" as DomainMode, title: "I already have a domain", desc: "Point your existing domain to us" },
                                    { mode: "new" as DomainMode, title: "Register a new domain", desc: "Search & register a new domain" },
                                ]).map(({ mode, title, desc }) => (
                                    <button key={mode} onClick={() => { setDomainMode(mode); setDomain(""); setDomainStatus("idle"); }}
                                        className={`rounded-xl border p-4 text-left transition-all ${domainMode === mode ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/50 bg-background"}`}>
                                        <p className="font-semibold text-sm">{title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                    </button>
                                ))}
                            </div>

                            {domainMode === "existing" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Your domain name</label>
                                    <Input placeholder="e.g. example.com" value={domain} onChange={e => setDomain(e.target.value)} />
                                    <p className="text-xs text-muted-foreground">We'll send DNS instructions after your order is confirmed.</p>
                                </div>
                            )}

                            {domainMode === "new" && (
                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium">Search for a domain</label>
                                    <div className="flex gap-2">
                                        <Input placeholder="e.g. mybusiness.com" value={domainQuery}
                                            onChange={e => { setDomainQuery(e.target.value); setDomainStatus("idle"); }}
                                            onKeyDown={e => e.key === "Enter" && checkDomain()} />
                                        <Button onClick={checkDomain} disabled={domainStatus === "checking" || !domainQuery.trim()}
                                            variant="outline" className="shrink-0 rounded-full">
                                            {domainStatus === "checking" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    {domainStatus === "available" && (
                                        <div className="flex items-center gap-2 text-sm bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-lg p-3">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                                            <span><strong>{domainQuery}</strong> is available{domainAvailablePrice ? ` — $${domainAvailablePrice.toFixed(2)}/yr` : ""}!</span>
                                        </div>
                                    )}
                                    {domainStatus === "unavailable" && (
                                        <div className="flex items-center gap-2 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3">
                                            <XCircle className="w-4 h-4 shrink-0" />
                                            <span><strong>{domainQuery}</strong> is not available. Try a different name.</span>
                                        </div>
                                    )}
                                    {domainStatus === "error" && (
                                        <div className="flex items-center gap-2 text-sm bg-muted border border-border/60 text-muted-foreground rounded-lg p-3">
                                            <AlertCircle className="w-4 h-4 shrink-0" />Could not check availability. Please try again.
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button className="w-full rounded-full bg-brand-green hover:bg-brand-green/80 text-white"
                                disabled={!canProceedDomain} onClick={() => setStep("review")}>
                                Continue <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* TEMP HIDDEN: Payment step — restore when order flow is ready */}

                {/* ── Step 3: Review ── */}
                {step === "review" && (
                    <div className="border border-border/60 rounded-2xl bg-background overflow-hidden">
                        <div className="border-b border-border/60 p-6">
                            <p className="font-semibold">Review Your Order</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Confirm everything looks right before placing</p>
                        </div>
                        <div className="divide-y divide-border/60">
                            {[
                                { label: "Plan", value: plan.displayName },
                                { label: "Monthly Price", value: `$${plan.price.toFixed(2)}/month` },
                                { label: "Domain", value: domain },
                                { label: "Domain Type", value: domainMode === "existing" ? "Existing domain" : "New registration" },
                                { label: "Payment", value: { stripe: "Credit / Debit Card", paypal: "PayPal", offline: "Offline / Bank Transfer" }[paymentMethod] },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between px-6 py-3.5 text-sm">
                                    <span className="text-muted-foreground">{row.label}</span>
                                    <span className="font-medium">{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            {orderError && (
                                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                                    <AlertCircle className="w-4 h-4 shrink-0" />{orderError}
                                </div>
                            )}
                            <div className="flex gap-3">
                                <Button variant="outline" className="rounded-full" onClick={() => setStep("domain")}>
                                    <ChevronLeft className="w-4 h-4 mr-1" />Back
                                </Button>
                                {/* TEMP: Order button commented for launch — original handlePlaceOrder flow preserved above */}
                                <OrderInquiryButton
                                    product="Shared Hosting"
                                    className="flex-1 rounded-full bg-brand-green hover:bg-brand-green/80 text-white h-10 text-sm font-semibold"
                                    details={{
                                        Plan: plan?.displayName || planSlug,
                                        Domain: domain || "—",
                                        "Monthly Price": `$${plan?.price?.toFixed(2) || "—"}`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
