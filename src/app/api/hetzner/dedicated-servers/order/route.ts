import { NextResponse } from "next/server";

const HETZNER_ROBOT_USERNAME = process.env.HETZNER_DEDICATED_SERVER_USERNAME!;
const HETZNER_ROBOT_PASSWORD = process.env.HETZNER_DEDICATED_SERVER_PASSWORD!;
const HETZNER_ROBOT_BASE = "https://robot-ws.your-server.de";

async function hetznerRobotPost(endpoint: string, params: URLSearchParams) {
    const auth = Buffer.from(`${HETZNER_ROBOT_USERNAME}:${HETZNER_ROBOT_PASSWORD}`).toString("base64");

    const res = await fetch(`${HETZNER_ROBOT_BASE}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error?.message || `Hetzner Robot API error: ${res.status}`);
    }
    return data;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, location, distribution, addons, hostname } = body;

        if (!productId || !location || !distribution) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Prepare URL-encoded parameters for Robot API
        const params = new URLSearchParams();
        params.append("product_id", productId);
        params.append("location", location);
        params.append("dist", distribution);
        if (hostname) params.append("hostname", hostname);

        // Add addons (Robot API expects multiple addons[] parameters)
        if (addons && Array.isArray(addons)) {
            addons.forEach((id) => {
                params.append("addons[]", id);
            });
        }

        // In a real scenario, we might want to validate the transaction first
        // const transaction = await hetznerRobotPost("/order/server/transaction", params);

        // For now, we'll simulate success to show the flow
        console.log("Simulating order for:", { productId, location, distribution, addons });

        return NextResponse.json({
            success: true,
            message: "Order transaction initiated successfully (Simulated)",
            details: { productId, location, addonsCount: addons?.length || 0 }
        });
    } catch (err: any) {
        console.error("Order submission error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
