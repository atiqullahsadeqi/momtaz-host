import { NextResponse } from 'next/server';
import { resellerClubAPI } from '@/lib/resellerclub';

export async function GET() {
  try {
    const status = resellerClubAPI.getCacheStatus();
    
    return NextResponse.json({ 
      success: true, 
      data: status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting cache status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await resellerClubAPI.refreshPricingCache();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cache refreshed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to refresh cache' },
      { status: 500 }
    );
  }
}
