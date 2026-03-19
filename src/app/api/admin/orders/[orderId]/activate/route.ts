import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { headers } from "next/headers";
import { processOrderProvisioning } from "@/lib/provisioning";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/admin/orders/[orderId]/activate
// Admin manually activates an offline-paid order → triggers provisioning
export async function POST(_req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isAdmin = (session.user as { role?: string }).role === "admin";
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { orderId } = await params;
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE orders SET status = 'processing', updated_at = NOW()
             WHERE id = $1 AND status = 'pending_payment' RETURNING *`,
            [orderId]
        );
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Order not found or not in pending_payment status" }, { status: 400 });
        }
        // Trigger provisioning async (same as Stripe webhook)
        processOrderProvisioning(orderId).catch(console.error);
        return NextResponse.json({ success: true, order: result.rows[0] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    } finally {
        client.release();
    }
}
