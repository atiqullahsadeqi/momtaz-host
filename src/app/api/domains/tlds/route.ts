import { NextResponse } from 'next/server';
import { resellerClubAPI } from '@/lib/resellerclub';

export async function GET() {
  try {
    // Get all domain pricing to extract TLD names
    const pricing = await resellerClubAPI.getDomainPricing([]);
    
    // Extract TLD names from the pricing data
    const tlds = pricing.map(item => item.tld);
    
    return NextResponse.json({ 
      success: true, 
      data: tlds
    });
  } catch (error) {
    console.error('Error fetching TLDs:', error);
    
    // Fallback TLDs if API fails
    const fallbackTlds = [
      'com', 'net', 'org', 'info', 'biz', 'online', 'store', 'shop', 'xyz', 
      'tech', 'site', 'space', 'website', 'app', 'blog', 'cloud', 'dev',
      'digital', 'email', 'expert', 'group', 'host', 'io', 'live', 'me',
      'media', 'news', 'photo', 'solutions', 'studio', 'team', 'today',
      'top', 'vip', 'world', 'zone', 'af'
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: fallbackTlds
    });
  }
}
