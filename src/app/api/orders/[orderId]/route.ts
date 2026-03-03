import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { headers } from "next/headers";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET /api/orders/[orderId] — get a single order (must belong to logged-in user or user is admin)
export async function GET(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await params;
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT o.*, u.name as user_name, u.email as user_email 
             FROM orders o 
             JOIN "user" u ON o.user_id = u.id
             WHERE o.id = $1`,
            [orderId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const order = result.rows[0];
        // Only the owner or admin can view the order
        const isAdmin = (session.user as { role?: string }).role === "admin";
        if (order.user_id !== session.user.id && !isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json({ success: true, order });
    } catch (err) {
        console.error("Failed to fetch order:", err);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    } finally {
        client.release();
    }
}

// PATCH /api/orders/[orderId] — admin only: update status and notes
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = (session.user as { role?: string }).role === "admin";
    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden: Admin only" }, { status: 403 });
    }

    const { orderId } = await params;
    let body: { status?: string; adminNotes?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { status, adminNotes } = body;

    if (status && !["pending", "approved", "rejected", "cancelled"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE orders 
             SET status = COALESCE($1, status),
                 admin_notes = COALESCE($2, admin_notes),
                 updated_at = NOW()
             WHERE id = $3
             RETURNING *`,
            [status ?? null, adminNotes ?? null, orderId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, order: result.rows[0] });
    } catch (err) {
        console.error("Failed to update order:", err);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    } finally {
        client.release();
    }
}
