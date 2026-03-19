import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { headers } from "next/headers";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET /api/admin/orders — list all orders (admin only)
export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = (session.user as { role?: string }).role === "admin";
    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden: Admin only" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const typeFilter = searchParams.get("type");

    const conditions: string[] = [];
    const values: string[] = [];

    if (statusFilter && ["pending", "approved", "rejected", "cancelled"].includes(statusFilter)) {
        conditions.push(`o.status = $${values.length + 1}`);
        values.push(statusFilter);
    }
    if (typeFilter && ["dedicated", "vps", "shared"].includes(typeFilter)) {
        conditions.push(`o.order_type = $${values.length + 1}`);
        values.push(typeFilter);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT o.*, u.name as user_name, u.email as user_email
             FROM orders o
             JOIN "user" u ON o.user_id = u.id
             ${whereClause}
             ORDER BY o.created_at DESC`,
            values
        );
        return NextResponse.json({ success: true, orders: result.rows });
    } catch (err) {
        console.error("Failed to fetch admin orders:", err);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    } finally {
        client.release();
    }
}
