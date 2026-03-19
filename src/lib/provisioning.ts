import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function processOrderProvisioning(orderId: string | number) {
    const isTestMode = process.env.SERVER_PROVISIONING_TEST_MODE === "true";
    const client = await pool.connect();

    try {
        const orderRes = await client.query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
        if (orderRes.rows.length === 0) {
            throw new Error("Order not found");
        }

        const order = orderRes.rows[0];
        console.log(`[Provisioning] Started for Order ${orderId} (Type: ${order.order_type})`);

        if (isTestMode) {
            console.log(`[Provisioning] TEST MODE ACTIVE — Simulating deployment to Hetzner...`);
            // Wait a realistic-ish amount of time to simulate API latency
            await new Promise(res => setTimeout(res, 2000));

            // Generate mock server details
            const mockIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
            const mockPassword = Math.random().toString(36).slice(-10) + "X@!";

            const provisioningData = {
                message: "Mock provisioned successfully via Test Mode",
                serverIp: mockIp,
                rootPassword: mockPassword,
                status: "active",
                provisionedAt: new Date().toISOString()
            };

            await client.query(
                `UPDATE orders SET 
                    status = 'active', 
                    updated_at = NOW(),
                    admin_notes = COALESCE(admin_notes, '') || '\n\n---\nAUTOMATED DEPLOYMENT (TEST MODE)\n' || $2
                 WHERE id = $1`,
                [orderId, JSON.stringify(provisioningData, null, 2)]
            );

            console.log(`[Provisioning] Finished Order ${orderId}. Marked as ACTIVE.`);
            return;
        }

        // Domain registration
        if (order.order_type === 'domain') {
            const { domainNameAPI } = await import('@/lib/domainnameapi');
            const config = order.configuration as any;
            const result = await domainNameAPI.registerDomain(
                order.domain,
                config.period ?? 1,
                config.contact
            );
            if (result.success) {
                await client.query(
                    `UPDATE orders SET status = 'active', updated_at = NOW() WHERE id = $1`,
                    [orderId]
                );
                console.log(`[Provisioning] Domain ${order.domain} registered successfully`);
            } else {
                await client.query(
                    `UPDATE orders SET status = 'failed', admin_notes = $1, updated_at = NOW() WHERE id = $2`,
                    [result.error, orderId]
                );
                console.error(`[Provisioning] Domain registration failed: ${result.error}`);
            }
            return;
        }

        console.log(`[Provisioning] Non-test mode placeholder for order type: ${order.order_type}`);

    } catch (err) {
        console.error(`[Provisioning] Failed for Order ${orderId}:`, err);
    } finally {
        client.release();
    }
}
