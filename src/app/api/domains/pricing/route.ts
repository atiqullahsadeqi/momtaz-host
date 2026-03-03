import { NextRequest, NextResponse } from 'next/server';
import { domainNameAPI } from '@/lib/domainnameapi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tlds = searchParams.get('tlds')?.split(',') || ['com', 'net', 'org', 'af'];

    const pricing = await domainNameAPI.getDomainPricing(tlds);
    
    return NextResponse.json({ success: true, data: pricing });
  } catch (error) {
    console.error('Error fetching domain pricing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch domain pricing' },
      { status: 500 }
    );
  }
}
