import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Pool } from "pg";
import { processOrderProvisioning } from "@/lib/provisioning";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2024-06-20" as any,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
            event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } else {
            event = JSON.parse(payload);
        }
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    const client = await pool.connect();

    try {
        if (event.type === "payment_intent.succeeded") {
            const pi = event.data.object as Stripe.PaymentIntent;
            const orderId = pi.metadata?.orderId;

            if (orderId) {
                await client.query(
                    `UPDATE orders SET status = 'processing', updated_at = NOW() WHERE id = $1 AND status = 'pending_payment'`,
                    [orderId]
                );
                console.log(`✅ Order ${orderId} marked as 'processing' via payment_intent.succeeded`);

                // Trigger provisioning asynchronously
                processOrderProvisioning(orderId).catch(console.error);
            }
        }

        if (event.type === "payment_intent.payment_failed") {
            const pi = event.data.object as Stripe.PaymentIntent;
            const orderId = pi.metadata?.orderId;
            if (orderId) {
                console.warn(`⚠️ Payment failed for Order ${orderId}: ${pi.last_payment_error?.message}`);
                // Keep order in pending_payment; user can retry
            }
        }
    } finally {
        client.release();
    }

    return NextResponse.json({ received: true });
}
