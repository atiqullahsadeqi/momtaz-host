import { NextResponse } from "next/server";

const HETZNER_API_TOKEN = process.env.HETZNER_API_TOKEN!;
const HETZNER_BASE = "https://api.hetzner.cloud/v1";

async function hetznerFetch(endpoint: string) {
  const res = await fetch(`${HETZNER_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${HETZNER_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Hetzner API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    const [imagesData, datacentersData, sshKeysData] = await Promise.all([
      hetznerFetch("/images?type=system&status=available"),
      hetznerFetch("/datacenters"),
      hetznerFetch("/ssh_keys"),
    ]);

    const images = imagesData.images.map((img: any) => ({
      id: img.id,
      name: img.name,
      description: img.description,
      osFlavor: img.os_flavor,
      osVersion: img.os_version,
      architecture: img.architecture,
    }));

    const datacenters = datacentersData.datacenters.map((dc: any) => ({
      id: dc.id,
      name: dc.name,
      description: dc.description,
      location: dc.location.city,
      country: dc.location.country,
      networkZone: dc.location.network_zone,
    }));

    const sshKeys = sshKeysData.ssh_keys.map((key: any) => ({
      id: key.id,
      name: key.name,
      fingerprint: key.fingerprint,
    }));

    return NextResponse.json({ images, datacenters, sshKeys });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch config options" },
      { status: 500 }
    );
  }
}