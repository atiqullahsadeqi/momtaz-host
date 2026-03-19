"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

let _stripe: ReturnType<typeof loadStripe> | null = null;
const getStripe = () => { if (!_stripe) _stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!); return _stripe; };
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummaryPanel } from "@/components/checkout/order-summary-panel";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { use } from "react";

export default function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params);
    const searchParams = useSearchParams();
    const method = (searchParams.get("method") || "stripe") as "stripe" | "paypal" | "offline";
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = fetch(`/api/orders/${orderId}`).then(r => r.json());
        if (method === "stripe") {
            const fetchIntent = fetch("/api/payments/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            }).then(r => r.json());
            Promise.all([fetchOrder, fetchIntent])
                .then(([orderRes, intentRes]) => {
                    if (intentRes.error) throw new Error(intentRes.error);
                    if (orderRes.error) throw new Error(orderRes.error);
                    setClientSecret(intentRes.clientSecret);
                    setOrderData(orderRes.order);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        } else {
            fetchOrder
                .then((orderRes) => {
                    if (orderRes.error) throw new Error(orderRes.error);
                    setOrderData(orderRes.order);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [orderId, method]);

    const appearance = {
        theme: "stripe" as const,
        variables: {
            colorPrimary: "#16a34a",
            colorDanger: "#ef4444",
            fontFamily: "'Inter', system-ui, sans-serif",
            borderRadius: "8px",
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
                <span className="text-sm">Preparing secure checkout…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-center px-4">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h1 className="text-xl font-semibold text-destructive">Checkout Error</h1>
                <p className="text-muted-foreground max-w-sm text-sm">{error}</p>
                <Link href="/dashboard/orders" className="text-muted-foreground hover:text-foreground text-sm">
                    ← Back to my orders
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
                {/* Left: payment form */}
                <div>
                    <h2 className="text-xl font-bold mb-1">Payment Details</h2>
                    <p className="text-sm text-muted-foreground mb-6">All transactions are secure and encrypted.</p>

                    {method === "stripe" && clientSecret && (
                        <Elements stripe={getStripe()} options={{ clientSecret, appearance }}>
                            <CheckoutForm orderId={orderId} />
                        </Elements>
                    )}

                    {method === "paypal" && (
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-6 flex flex-col items-center gap-4 text-center">
                            <div className="text-4xl">🅿️</div>
                            <p className="font-semibold">Pay with PayPal</p>
                            <p className="text-sm text-muted-foreground">You will be redirected to PayPal to complete your payment securely.</p>
                            <a href={`https://paypal.com`} className="w-full">
                                <button className="w-full h-12 rounded-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold text-sm transition-colors">
                                    Continue to PayPal
                                </button>
                            </a>
                            <p className="text-xs text-muted-foreground">PayPal integration coming soon — contact us to pay via PayPal manually.</p>
                        </div>
                    )}

                    {method === "offline" && (
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-8 flex flex-col items-center gap-5 text-center">
                            <div className="w-16 h-16 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-3xl">
                                🏦
                            </div>
                            <div>
                                <p className="font-bold text-lg mb-1">Order Received</p>
                                <p className="text-sm text-muted-foreground max-w-sm">
                                    Your order has been registered. Our team will review it and contact you shortly to arrange payment and confirm your service.
                                </p>
                            </div>
                            <div className="w-full rounded-lg bg-brand-green/10 border border-brand-green/20 px-4 py-3 text-sm text-brand-green text-left">
                                <p className="font-semibold mb-1">What happens next?</p>
                                <ul className="space-y-1 text-xs text-brand-green/80">
                                    <li>✓ Our team will contact you within 24 hours</li>
                                    <li>✓ We will share payment details (bank transfer or in-person)</li>
                                    <li>✓ Once payment is confirmed, your service will be activated automatically</li>
                                </ul>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Order ID: <span className="font-mono font-semibold">{orderId}</span>
                                {" · "}Questions? Email <a href="mailto:billing@momtazhost.com" className="hover:text-foreground underline">billing@momtazhost.com</a>
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: order summary */}
                <OrderSummaryPanel order={orderData} />
            </div>
        </div>
    );
}
