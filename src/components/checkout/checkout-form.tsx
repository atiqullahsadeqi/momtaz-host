"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
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

        if (error) setErrorMessage(error.message || "Payment failed. Please try again.");
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
                <PaymentElement
                    onReady={() => setReady(true)}
                    options={{
                        layout: { type: "accordion", defaultCollapsed: false, radios: true, spacedAccordionItems: true },
                        fields: { billingDetails: { name: "auto" } },
                        wallets: { googlePay: "auto", applePay: "never" },
                    }}
                />
            </div>

            {!ready && (
                <div className="h-40 flex items-center justify-center text-muted-foreground gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading payment form…</span>
                </div>
            )}

            {errorMessage && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMessage}
                </div>
            )}

            <Button
                type="submit"
                disabled={isProcessing || !stripe || !elements || !ready}
                className="w-full h-12 text-base font-semibold rounded-full bg-brand-green hover:bg-brand-green/80"
            >
                {isProcessing ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Processing…</span>
                ) : (
                    <span className="flex items-center gap-2"><Lock className="w-4 h-4" />Pay Now</span>
                )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                Powered by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground font-medium">Stripe</a>
                {" · "}Your card info is never stored on our servers.
            </p>
        </form>
    );
}
