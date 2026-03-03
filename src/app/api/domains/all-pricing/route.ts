import { NextResponse } from 'next/server';
import { domainNameAPI } from '@/lib/domainnameapi';

export async function GET() {
  try {
    const pricing = await domainNameAPI.getDomainPricing([]);
    
    return NextResponse.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error('Error fetching all TLD pricing:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch TLD pricing',
      },
      { status: 500 }
    );
  }
}
