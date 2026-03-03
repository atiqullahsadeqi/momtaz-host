import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    try {
        // 1. Fetch live EUR->USD rate
        const fxRes = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
        const fxData = await fxRes.json();
        const eurToUsd = fxData.rates.USD;

        // 2. Fetch live config from Hetzner public configurator
        const url = `https://www.hetzner.com/dedicated-rootserver/${slug}/configurator/getServerConfig/EUR/`;
        const hetznerRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        if (!hetznerRes.ok) {
            throw new Error(`Failed to fetch from Hetzner: ${hetznerRes.status}`);
        }

        const data = await hetznerRes.json();

        // 3. Transform categories into our AddonOption format
        const addons: any[] = [];
        const baseConfigs = data.baseConfig || [];

        (data.categories || []).forEach((cat: any) => {
            const type = cat.dataType.toLowerCase();
            let category = "";
            if (type.includes("ram")) category = "ram";
            else if (type.includes("drive")) category = "storage";
            else if (type.includes("ip")) category = "ip";
            else return; // Skip other categories

            cat.data.forEach((group: any) => {
                const fields = group.fields || group.data || [];
                fields.forEach((field: any) => {
                    let isDefault = field.default || false;
                    const monthlyPriceRaw = parseFloat(field.attributes.monthlyCost || 0);

                    const fieldId = typeof field.id === 'object' ? `${field.id.name}-${field.id.value}` : field.id;
                    const heading = field.heading || field.name || "";
                    const sanitizedHeading = heading.toLowerCase().replace(/[^a-z0-9]/g, "-");

                    // Extract quantity from heading (e.g., "2x 1 TB" -> 2)
                    let quantity = 1;
                    const match = heading.match(/^(\d+)x/);
                    if (match) quantity = parseInt(match[1], 10);

                    // If not explicitly default, check if it matches baseConfig
                    if (!isDefault) {
                        const matchingBase = baseConfigs.find((bc: any) => {
                            const bcCat = bc.heading?.toLowerCase();
                            if (category === "ram" && !bcCat?.includes("ram")) return false;
                            if (category === "storage" && (!bcCat?.includes("drive") && !bcCat?.includes("storage"))) return false;

                            const bcName = bc.name?.toLowerCase() || "";
                            const fName = heading.toLowerCase();
                            // Fuzzy match: either name contains the other
                            return bcName.includes(fName) || fName.includes(bcName);
                        });

                        if (matchingBase) {
                            isDefault = true;
                            // Extract quantity from baseConfig name if needed
                            const bcMatch = matchingBase.name?.match(/^(\d+)x/);
                            if (bcMatch) quantity = parseInt(bcMatch[1], 10);
                        }
                    }

                    // Skip if NOT default AND cost <= 0 (irrelevant alternatives)
                    if (field.isAvailable === 0 || (!isDefault && monthlyPriceRaw <= 0)) return;

                    addons.push({
                        id: `${fieldId}-${sanitizedHeading}`,
                        name: heading,
                        description: field.additionalInformation || "",
                        monthlyPrice: monthlyPriceRaw * eurToUsd * 1.2,
                        setupFee: parseFloat(field.attributes.setupCost || 0) * eurToUsd * 1.2,
                        category,
                        min: field.min || 0,
                        max: (field.attributes.spaces && field.attributes.spaces[0]?.capacity) || field.max || undefined,
                        requires: (field.attributes.spaces && field.attributes.spaces[0]?.requires) || 1,
                        isDefault: isDefault,
                        defaultQuantity: isDefault ? quantity : 0
                    });
                });
            });
        });

        // Calculate actual max slots from distinctSpaces
        let maxDriveSlots = 4;
        if (data.distinctSpaces && Array.isArray(data.distinctSpaces)) {
            maxDriveSlots = Math.max(...data.distinctSpaces.map((config: any) => {
                let total = 0;
                for (const key in config) {
                    if (config[key] && typeof config[key].capacity === 'number') {
                        total += config[key].capacity;
                    }
                }
                return total;
            }));
        }

        return NextResponse.json({
            addons,
            baseConfig: data.baseConfig,
            spaces: data.spaces,
            maxDriveSlots
        });
    } catch (error: any) {
        console.error(`Error fetching config for ${slug}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
