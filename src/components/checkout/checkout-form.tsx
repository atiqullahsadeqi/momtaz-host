"use client";

import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

export function CheckoutForm({ orderId }: { orderId: string }) {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [ready, setReady] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard/orders/${orderId}?success=true`,
            },
        });

        // If we get here, payment failed (redirect would have happened on success)
        if (error) {
            setErrorMessage(error.message || "Payment failed. Please try again.");
        }
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stripe PaymentElement renders card, wallets, etc. */}
            <div className={`transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
                <PaymentElement
                    onReady={() => setReady(true)}
                    options={{
                        layout: "tabs",
                    }}
                />
            </div>

            {!ready && (
                <div className="h-32 flex items-center justify-center text-muted-foreground gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading payment form…</span>
                </div>
            )}

            {errorMessage && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {errorMessage}
                </div>
            )}

            <Button
                type="submit"
                disabled={isProcessing || !stripe || !elements || !ready}
                className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-500"
            >
                {isProcessing ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing…
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Pay Now
                    </span>
                )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                Payments are powered by{" "}
                <a
                    href="https://stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    Stripe
                </a>
                . Your card info is never stored on our servers.
            </p>
        </form>
    );
}
