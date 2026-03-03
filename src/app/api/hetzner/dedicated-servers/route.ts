import { NextResponse } from "next/server";

const HETZNER_ROBOT_USERNAME = process.env.HETZNER_DEDICATED_SERVER_USERNAME!;
const HETZNER_ROBOT_PASSWORD = process.env.HETZNER_DEDICATED_SERVER_PASSWORD!;
const HETZNER_ROBOT_BASE = "https://robot-ws.your-server.de";

async function hetznerRobotFetch(endpoint: string) {
  const auth = Buffer.from(
    `${HETZNER_ROBOT_USERNAME}:${HETZNER_ROBOT_PASSWORD}`
  ).toString("base64");

  const res = await fetch(`${HETZNER_ROBOT_BASE}${endpoint}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // cache 1 hour
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Hetzner Robot API error: ${res.status} - ${errorText}`
    );
  }
  return res.json();
}

// Fetch live EUR→USD rate
async function getExchangeRate() {
  const fxRes = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
  const fxData = await fxRes.json();
  return fxData.rates.USD; // e.g. 1.08
}

export async function GET() {
  try {
    const eurToUsd = await getExchangeRate();

    // Fetch dedicated server products
    const data = await hetznerRobotFetch("/order/server/product");

    // Transform the response
    const plans = data
      .filter((item: any) => item.product) // ensure product exists
      .map((item: any) => {
        const product = item.product;

        // Get the cheapest price across all locations
        const cheapestPrice = product.prices.reduce(
          (min: any, p: any) =>
            parseFloat(p.price.net) < parseFloat(min.price.net) ? p : min,
          product.prices[0]
        );

        const monthlyPrice = parseFloat(cheapestPrice.price.net) * eurToUsd * 1.2; // +20% markup
        const setupFee = parseFloat(cheapestPrice.price_setup.net) * eurToUsd * 1.2;

        // Extract specs from description array
        const cpu = product.description[0] || "N/A";
        const ram = product.description[1] || "N/A";
        const storage = product.description[2] || "N/A";
        const bandwidth = product.description[3] || "N/A";

        return {
          id: product.id,
          slug: product.id.toLowerCase(),
          name: product.name,
          description: product.description.join(" • "),
          cpu,
          ram,
          storage,
          bandwidth,
          traffic: product.traffic,
          operatingSystems: product.dist || [],
          locations: product.location || [],
          prices: product.prices.map((p: any) => ({
            location: p.location,
            monthly: parseFloat(p.price.net) * eurToUsd * 1.2,
            setup: parseFloat(p.price_setup.net) * eurToUsd * 1.2,
          })),
          monthlyPrice,
          setupFee,
          orderableAddons: (product.orderable_addons || []).map((addon: any) => {
            // Get price from same location if possible, or first one
            const addonPriceEntry =
              addon.prices.find((p: any) => p.location === cheapestPrice.location) ||
              addon.prices[0];

            const category =
              addon.name.toLowerCase().includes("ram") ? "ram" :
                addon.name.toLowerCase().includes("gb") || addon.name.toLowerCase().includes("tb") || addon.name.toLowerCase().includes("nvme") || addon.name.toLowerCase().includes("ssd") ? "storage" :
                  addon.id.includes("ipv4") ? "ip" : "other";

            return {
              id: addon.id,
              name: addon.name,
              min: addon.min,
              max: addon.max,
              category,
              monthlyPrice: parseFloat(addonPriceEntry.price.net) * eurToUsd * 1.2,
              setupFee: parseFloat(addonPriceEntry.price_setup.net) * eurToUsd * 1.2,
            };
          }),
        };
      })
      .sort((a: any, b: any) => a.monthlyPrice - b.monthlyPrice);

    return NextResponse.json({ plans });
  } catch (err: any) {
    console.error("Dedicated servers fetch error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch dedicated server plans" },
      { status: 500 }
    );
  }
}
