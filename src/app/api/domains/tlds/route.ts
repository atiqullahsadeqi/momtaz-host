import { NextResponse } from 'next/server';
import { domainNameAPI } from '@/lib/domainnameapi';

export async function GET() {
  try {
    const tlds = await domainNameAPI.getAllTLDs();
    
    return NextResponse.json({ 
      success: true, 
      data: tlds
    });
  } catch (error) {
    console.error('Error fetching TLDs:', error);
    
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
