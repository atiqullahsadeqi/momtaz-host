import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Pool } from "pg";
import { processOrderProvisioning } from "@/lib/provisioning";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" as any });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
    const { paymentIntentId, orderId } = await req.json();
    if (!paymentIntentId || !orderId) return NextResponse.json({ error: "Missing params" }, { status: 400 });

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.status !== "succeeded") return NextResponse.json({ error: "Payment not succeeded" }, { status: 400 });
    if (pi.metadata?.orderId !== orderId) return NextResponse.json({ error: "Order mismatch" }, { status: 400 });

    const client = await pool.connect();
    try {
        const res = await client.query(
            `UPDATE orders SET status = 'processing', updated_at = NOW() WHERE id = $1 AND status = 'pending_payment' RETURNING id`,
            [orderId]
        );
        if (res.rowCount && res.rowCount > 0) {
            processOrderProvisioning(orderId).catch(console.error);
        }
    } finally {
        client.release();
    }

    return NextResponse.json({ success: true });
}
