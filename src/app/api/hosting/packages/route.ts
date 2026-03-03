import { NextResponse } from 'next/server';
import { whmClient } from '@/lib/whm';

const PACKAGE_MAPPING: Record<string, { displayName: string; price: number; isPopular: boolean }> = {
  'starterweb': { displayName: 'Starter Plan', price: 2.29, isPopular: false },
  'advance': { displayName: 'Advance Plan', price: 4.99, isPopular: true },
  'businesspro': { displayName: 'Business Pro Plan', price: 6.89, isPopular: false },
  'enterpriseplus': { displayName: 'Enterprise Plan', price: 8.59, isPopular: false },
  'ultimatescale': { displayName: 'Ultimate Plan', price: 12.99, isPopular: false },
};

const PACKAGE_NAMES = ['StarterWeb', 'Advance', 'BusinessPro', 'EnterprisePlus', 'UltimateScale'];

export async function GET() {
  try {
    console.log('[API] /api/hosting/packages called');
    
    const packages = await Promise.all(
      PACKAGE_NAMES.map(async (name) => {
        console.log(`[API] Fetching package: ${name}`);
        const pkg = await whmClient.getPackage(name);
        if (pkg) {
          console.log(`[API] Package ${name} keys:`, Object.keys(pkg));
          console.log(`[API] Package ${name} full data:`, pkg);
        }
        return { requestedName: name, data: pkg };
      })
    );

    const plans = packages
      .filter(item => item.data !== null)
      .map(item => {
        const pkg = item.data!;
        const requestedName = item.requestedName;
        const mappingKey = requestedName.toLowerCase();
        
        console.log(`[API] Processing ${requestedName}, mapping key: ${mappingKey}`);
        const mapping = PACKAGE_MAPPING[mappingKey];
        
        if (!mapping) {
          console.error(`[API] No mapping found for: ${requestedName}`);
          return null;
        }
        
        const plan = {
          name: requestedName,
          displayName: mapping.displayName,
          price: mapping.price,
          features: whmClient.formatPackageFeatures(pkg),
          isPopular: mapping.isPopular,
        };
        console.log('[API] Formatted plan:', plan);
        return plan;
      })
      .filter(plan => plan !== null);

    console.log('[API] Returning plans:', plans);
    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    console.error('[API] Error fetching hosting packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
