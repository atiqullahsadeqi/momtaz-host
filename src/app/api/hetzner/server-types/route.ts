import { NextResponse } from "next/server";

const HETZNER_API_TOKEN = process.env.HETZNER_API_TOKEN!;
const HETZNER_BASE = "https://api.hetzner.cloud/v1";

async function hetznerFetch(endpoint: string) {
  const res = await fetch(`${HETZNER_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${HETZNER_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // cache 1 hour
  });
  if (!res.ok) throw new Error(`Hetzner API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    // Fetch live EUR→USD rate + server types + datacenters in parallel
    const [fxRes, serverTypesData, datacentersData] = await Promise.all([
      fetch("https://api.exchangerate-api.com/v4/latest/EUR"),
      hetznerFetch("/server_types"),
      hetznerFetch("/datacenters"),
    ]);
    const fxData = await fxRes.json();
    const eurToUsd: number = fxData.rates.USD; // e.g. 1.08

    // Build a map of datacenter location names by datacenter id
    const datacenterMap: Record<number, string> = {};
    for (const dc of datacentersData.datacenters) {
      datacenterMap[dc.id] = dc.location.city;
    }

    // Filter only active server types and shape data for frontend
    const plans = serverTypesData.server_types
      .filter((s: any) => !s.deprecation)
      .map((s: any) => {
        // Hetzner gives prices per location; pick the first available price
        const priceEntry = s.prices?.[0];
        const monthlyPrice = priceEntry
          ? parseFloat(priceEntry.price_monthly.gross) * eurToUsd * 1.2  // +20%
          : 0;

        // Available locations from prices array
        const locations: string[] = s.prices.map((p: any) => p.location);

        return {
          id: s.id,
          slug: s.name,
          name: s.name.toUpperCase(),
          description: s.description,
          cpuType: s.cpu_type, // "shared" | "dedicated"
          architecture: s.architecture, // "x86" | "arm"
          cores: s.cores,
          memory: s.memory, // GB
          disk: s.disk, // GB
          // Hetzner doesn't expose bandwidth limit directly; show included traffic
          includedTraffic: s.included_traffic
            ? `${s.included_traffic / 1_000_000_000_000} TB`
            : "Unlimited",
          monthlyPrice,
          locations,
        };
      })
      .sort((a: any, b: any) => a.monthlyPrice - b.monthlyPrice);

    return NextResponse.json({ plans });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch plans" },
      { status: 500 }
    );
  }
}