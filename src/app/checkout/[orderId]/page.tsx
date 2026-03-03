"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummaryPanel } from "@/components/checkout/order-summary-panel";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShieldCheck } from "lucide-react";
import { use } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order info + create payment intent simultaneously
        Promise.all([
            fetch(`/api/orders/${orderId}`).then(r => r.json()),
            fetch("/api/payments/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            }).then(r => r.json()),
        ])
            .then(([orderRes, intentRes]) => {
                if (intentRes.error) throw new Error(intentRes.error);
                if (orderRes.error) throw new Error(orderRes.error);
                setClientSecret(intentRes.clientSecret);
                setOrderData(orderRes.order);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [orderId]);

    const appearance = {
        theme: "night" as const,
        variables: {
            colorPrimary: "#6366f1",
            colorBackground: "#0f0f13",
            colorText: "#e2e8f0",
            colorDanger: "#ef4444",
            fontFamily: "'Inter', system-ui, sans-serif",
            spacingUnit: "4px",
            borderRadius: "10px",
        },
        rules: {
            ".Input": {
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.04)",
            },
            ".Input:focus": {
                border: "1px solid #6366f1",
                boxShadow: "0 0 0 2px rgba(99,102,241,0.2)",
            },
            ".Label": {
                color: "#94a3b8",
                fontSize: "12px",
                fontWeight: "500",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
            },
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                <span className="text-sm">Preparing secure checkout…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4 text-center px-4">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h1 className="text-xl font-semibold text-red-400">Checkout Error</h1>
                <p className="text-muted-foreground max-w-sm text-sm">{error}</p>
                <Link href="/dashboard/orders" className="text-indigo-400 hover:underline text-sm">
                    ← Back to my orders
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-foreground">
            {/* Top bar */}
            <div className="border-b border-white/5 bg-[#0f0f15]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image src="/images/logo.png" alt="Momtaz Host" width={36} height={36} />
                        <span className="font-bold text-lg">Momtaz Host</span>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span>256-bit SSL Encrypted Checkout</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left: order summary */}
                <OrderSummaryPanel order={orderData} />

                {/* Right: Stripe Elements form */}
                <div>
                    <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                    {clientSecret && (
                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret, appearance }}
                        >
                            <CheckoutForm orderId={orderId} />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}
