import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { headers } from "next/headers";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/orders — submit a new order (creates DB record; payment is handled separately)
export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: {
        orderType: string;
        planId: string;
        planName: string;
        configuration: Record<string, unknown>;
        domain?: string;
        domainType?: string;
        totalMonthly: number;
        setupFee: number;
    };

    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { orderType, planId, planName, configuration, domain, domainType, totalMonthly, setupFee } = body;

    // Validation
    if (!orderType || !["dedicated", "vps", "shared"].includes(orderType)) {
        return NextResponse.json({ error: "Invalid orderType" }, { status: 400 });
    }
    if (!planId || !planName) {
        return NextResponse.json({ error: "planId and planName are required" }, { status: 400 });
    }
    if (orderType === "shared" && !domain) {
        return NextResponse.json({ error: "Domain is required for shared hosting orders" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO orders (user_id, order_type, plan_id, plan_name, configuration, domain, domain_type, total_monthly, setup_fee, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending_payment')
             RETURNING *`,
            [
                session.user.id,
                orderType,
                planId,
                planName,
                JSON.stringify(configuration ?? {}),
                domain ?? null,
                domainType ?? null,
                totalMonthly ?? 0,
                setupFee ?? 0,
            ]
        );

        const order = result.rows[0];

        // Return order id; frontend will redirect to our custom checkout page
        return NextResponse.json({
            success: true,
            order,
            checkoutUrl: `/checkout/${order.id}`,
        }, { status: 201 });
    } catch (err: any) {
        console.error("Failed to create order:", err);
        return NextResponse.json({ error: "Failed to create order", details: err.message }, { status: 500 });
    } finally {
        client.release();
    }
}

// GET /api/orders — list orders for the logged-in user
export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
            [session.user.id]
        );
        return NextResponse.json({ success: true, orders: result.rows });
    } catch (err) {
        console.error("Failed to fetch orders:", err);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    } finally {
        client.release();
    }
}
