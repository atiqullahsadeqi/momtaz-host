import { NextRequest, NextResponse } from 'next/server';
import { domainNameAPI } from '@/lib/domainnameapi';

function extractDomainAndTld(input: string): { domainName: string; tld: string } {
  let domain = input.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  const parts = domain.split('.');
  
  if (parts.length < 2) {
    return { domainName: domain, tld: 'com' };
  }
  
  const tld = parts.pop()!;
  const domainName = parts.join('.');
  
  return { domainName, tld };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('domain');

    if (!input) {
      return NextResponse.json(
        { success: false, error: 'Domain input is required' },
        { status: 400 }
      );
    }

    const { domainName, tld } = extractDomainAndTld(input);
    const availability = await domainNameAPI.checkDomainAvailability(domainName, [tld]);
    
    return NextResponse.json({ 
      success: true, 
      data: {
        searchedDomain: input,
        extractedDomain: domainName,
        extractedTld: tld,
        results: availability
      }
    });
  } catch (error) {
    console.error('Error checking domain availability:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}
