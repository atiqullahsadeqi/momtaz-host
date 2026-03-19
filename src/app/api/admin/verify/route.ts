import { NextRequest, NextResponse } from "next/server";
import { Pool } from 'pg';

// Use a shared pool instance
let pool: Pool | null = null;
function getPool() {
    if (!pool) {
        pool = new Pool({ connectionString: process.env.DATABASE_URL });
    }
    return pool;
}

export async function GET(request: NextRequest) {
    // Better-auth might prefix cookies depending on cross-subdomain settings.
    // Let's log and search for any token-like cookie.
    const allCookies = request.cookies.getAll();
    let sessionToken = request.cookies.get('better-auth.session_token')?.value;

    if (!sessionToken) {
        // Fallback search if prefixed
        const fuzzyCookie = allCookies.find(c => c.name.includes('session_token'));
        if (fuzzyCookie) {
            sessionToken = fuzzyCookie.value;
        }
    }

    if (!sessionToken) {
        return NextResponse.json({ isAdmin: false, reason: "No session token cookie found" }, { status: 401 });
    }

    const db = getPool();
    const client = await db.connect();
    try {
        const res = await client.query(`
            SELECT u.role 
            FROM session s 
            JOIN "user" u ON s.userId = u.id 
            WHERE s.token = $1 AND s.expiresAt > NOW()
        `, [sessionToken]);

        if (res.rows.length > 0) {
            const role = res.rows[0].role;
            if (role === 'admin') {
                return NextResponse.json({ isAdmin: true });
            } else {
                return NextResponse.json({ isAdmin: false, reason: "Invalid role: " + role }, { status: 403 });
            }
        }
        return NextResponse.json({ isAdmin: false, reason: "Session not found in DB or expired" }, { status: 401 });
    } catch (err) {
        console.error("Admin Verify DB Error:", err);
        return NextResponse.json({ isAdmin: false, reason: "DB Exception" }, { status: 500 });
    } finally {
        client.release();
    }
}
