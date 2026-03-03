import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Pool } from "pg";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2024-06-20" as any,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/payments/create-intent — create a Stripe PaymentIntent for an existing order
export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { orderId: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { orderId } = body;
    if (!orderId) {
        return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
        // Fetch the order — ensure it belongs to this user
        const orderRes = await client.query(
            `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
            [orderId, session.user.id]
        );

        if (orderRes.rows.length === 0) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const order = orderRes.rows[0];

        if (order.status !== "pending_payment") {
            return NextResponse.json({ error: "Order is not awaiting payment" }, { status: 400 });
        }

        // Total amount in cents = monthly + setup fee
        const totalAmount = Math.round(
            (parseFloat(order.total_monthly) + parseFloat(order.setup_fee || 0)) * 100
        );

        if (totalAmount < 50) {
            // Stripe minimum is $0.50
            return NextResponse.json({ error: "Order total is too low" }, { status: 400 });
        }

        // Create or retrieve existing PaymentIntent
        // If we already have a stripe_session_id (from old checkout flow), we skip it
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
            metadata: {
                orderId: order.id.toString(),
                userId: session.user.id,
                planName: order.plan_name,
                orderType: order.order_type,
            },
            receipt_email: session.user.email,
        });

        // Save the payment intent id on the order
        await client.query(
            `UPDATE orders SET stripe_session_id = $1 WHERE id = $2`,
            [paymentIntent.id, order.id]
        );

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            amount: totalAmount,
            orderId: order.id,
        });
    } catch (err: any) {
        console.error("Failed to create payment intent:", err);
        return NextResponse.json({ error: err.message || "Failed to create payment" }, { status: 500 });
    } finally {
        client.release();
    }
}
