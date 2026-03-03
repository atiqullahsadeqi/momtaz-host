"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Globe, Package, ChevronRight, ChevronLeft, Loader2,
    Check, Search, AlertCircle, CheckCircle2, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Plan {
    name: string;
    displayName: string;
    price: number;
    features: string[];
    isPopular: boolean;
}

type Step = "summary" | "domain" | "review";
type DomainMode = "existing" | "new";
type DomainStatus = "idle" | "checking" | "available" | "unavailable" | "error";

const STEPS: { key: Step; label: string }[] = [
    { key: "summary", label: "Plan Details" },
    { key: "domain", label: "Domain" },
    { key: "review", label: "Review & Order" },
];

function StepIndicator({ current }: { current: Step }) {
    const currentIdx = STEPS.findIndex(s => s.key === current);
    return (
        <div className="flex items-center gap-2 mb-8">
            {STEPS.map((step, i) => (
                <div key={step.key} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
            ${i < currentIdx ? "bg-primary text-primary-foreground" :
                            i === currentIdx ? "bg-primary text-primary-foreground" :
                                "bg-muted text-muted-foreground"}`}>
                        {i < currentIdx ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${i === currentIdx ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                    </span>
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

    const [step, setStep] = useState<Step>("summary");
    const [domainMode, setDomainMode] = useState<DomainMode>("existing");
    const [domain, setDomain] = useState("");
    const [domainQuery, setDomainQuery] = useState("");
    const [domainStatus, setDomainStatus] = useState<DomainStatus>("idle");
    const [domainAvailablePrice, setDomainAvailablePrice] = useState<number | null>(null);

    const [isOrdering, setIsOrdering] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/hosting/packages")
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    const found = data.data.find((p: Plan) => p.name === planSlug);
                    if (found) setPlan(found);
                    else router.push("/hosting/shared");
                }
            })
            .catch(console.error)
            .finally(() => setIsLoadingPlan(false));
    }, [planSlug, router]);

    const checkDomainAvailability = async () => {
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
        } catch {
            setDomainStatus("error");
        }
    };

    const canProceedFromDomain = domainMode === "existing"
        ? domain.trim().length > 0
        : domainStatus === "available";

    const handlePlaceOrder = async () => {
        if (!plan || !domain) return;
        setIsOrdering(true);
        setOrderError(null);
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderType: "shared",
                    planId: plan.name,
                    planName: plan.displayName,
                    configuration: {
                        features: plan.features,
                    },
                    domain,
                    domainType: domainMode,
                    totalMonthly: plan.price,
                    setupFee: 0,
                }),
            });
            const result = await response.json();
            if (result.success) {
                if (result.checkoutUrl) {
                    window.location.href = result.checkoutUrl;
                } else {
                    router.push(`/dashboard/orders/${result.order.id}`);
                }
            } else if (response.status === 401) {
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

    if (isLoadingPlan) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading plan details…</span>
            </div>
        );
    }

    if (!plan) return null;

    return (
        <div className="min-h-screen py-16 bg-muted/30">
            <div className="container max-w-2xl mx-auto px-4">
                <Link href="/hosting/shared" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Plans
                </Link>
                <h1 className="text-2xl font-bold mb-2">Order Shared Hosting</h1>
                <p className="text-muted-foreground mb-8">Complete your order in just a few steps.</p>

                <StepIndicator current={step} />

                {/* Step 1: Plan Summary */}
                {step === "summary" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5" /> {plan.displayName}
                                {plan.isPopular && <Badge className="ml-1">Most Popular</Badge>}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-muted/50 rounded-xl p-4">
                                <p className="text-3xl font-bold">${plan.price.toFixed(2)}<span className="text-base font-normal text-muted-foreground">/month</span></p>
                            </div>
                            <ul className="space-y-2">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" onClick={() => setStep("domain")}>
                                Continue <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Domain */}
                {step === "domain" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5" /> Choose Your Domain
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">A domain is required for shared hosting.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Mode Selector */}
                            <div className="grid grid-cols-2 gap-3">
                                {(["existing", "new"] as DomainMode[]).map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => { setDomainMode(mode); setDomain(""); setDomainStatus("idle"); }}
                                        className={`rounded-xl border p-3 text-sm font-medium transition-all text-left ${domainMode === mode ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                    >
                                        <p className="font-semibold">{mode === "existing" ? "I have a domain" : "Register a new domain"}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{mode === "existing" ? "Point your existing domain to us" : "Check availability & register"}</p>
                                    </button>
                                ))}
                            </div>

                            {/* Existing Domain Input */}
                            {domainMode === "existing" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Your domain name</label>
                                    <Input
                                        placeholder="e.g. example.com"
                                        value={domain}
                                        onChange={e => setDomain(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">We'll send you DNS instructions after your order is approved.</p>
                                </div>
                            )}

                            {/* New Domain Search */}
                            {domainMode === "new" && (
                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Search for a domain</label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="e.g. mybusiness.com"
                                            value={domainQuery}
                                            onChange={e => { setDomainQuery(e.target.value); setDomainStatus("idle"); }}
                                            onKeyDown={e => e.key === "Enter" && checkDomainAvailability()}
                                        />
                                        <Button onClick={checkDomainAvailability} disabled={domainStatus === "checking" || !domainQuery.trim()} variant="outline" className="shrink-0">
                                            {domainStatus === "checking" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                        </Button>
                                    </div>

                                    {domainStatus === "available" && (
                                        <div className="flex items-center gap-2 text-green-500 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                                            <span><strong>{domainQuery}</strong> is available{domainAvailablePrice ? ` — $${domainAvailablePrice.toFixed(2)}/yr` : ""}!</span>
                                        </div>
                                    )}
                                    {domainStatus === "unavailable" && (
                                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                                            <XCircle className="w-4 h-4 shrink-0" />
                                            <span><strong>{domainQuery}</strong> is not available. Try a different name.</span>
                                        </div>
                                    )}
                                    {domainStatus === "error" && (
                                        <div className="flex items-center gap-2 text-orange-400 text-sm bg-orange-400/10 border border-orange-400/20 rounded-lg p-3">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>Could not check availability. Please try again.</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" onClick={() => setStep("summary")}>
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                </Button>
                                <Button className="flex-1" disabled={!canProceedFromDomain} onClick={() => setStep("review")}>
                                    Review Order <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Review */}
                {step === "review" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Check className="w-5 h-5" /> Review Your Order
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="divide-y divide-border rounded-xl border overflow-hidden">
                                {[
                                    { label: "Plan", value: plan.displayName },
                                    { label: "Monthly Price", value: `$${plan.price.toFixed(2)}/month` },
                                    { label: "Domain", value: domain },
                                    { label: "Domain Type", value: domainMode === "existing" ? "Existing domain (you own it)" : "New registration" },
                                ].map(row => (
                                    <div key={row.label} className="flex justify-between px-4 py-3 text-sm">
                                        <span className="text-muted-foreground">{row.label}</span>
                                        <span className="font-medium text-right">{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
                                <p className="font-medium text-foreground mb-1">📋 Manual Approval</p>
                                Your order will be reviewed by our team. Once approved, we'll send you setup instructions via email. No payment is charged until your service is activated.
                            </div>

                            {orderError && (
                                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {orderError}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setStep("domain")}>
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                </Button>
                                <Button className="flex-1" onClick={handlePlaceOrder} disabled={isOrdering}>
                                    {isOrdering ? (
                                        <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</span>
                                    ) : "Place Order"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
