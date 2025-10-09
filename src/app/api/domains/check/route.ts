import { NextRequest, NextResponse } from 'next/server';
import { resellerClubAPI } from '@/lib/resellerclub';

function extractDomainAndTld(input: string): { domainName: string; tld: string } {
  // Remove protocol if present
  let domain = input.replace(/^https?:\/\//, '');
  
  // Remove www if present
  domain = domain.replace(/^www\./, '');
  
  // Remove trailing slash
  domain = domain.replace(/\/$/, '');
  
  // Split by last dot to get TLD
  const parts = domain.split('.');
  
  if (parts.length < 2) {
    // No TLD provided, default to .com
    return {
      domainName: domain,
      tld: 'com'
    };
  }
  
  const tld = parts.pop()!; // Last part is TLD
  const domainName = parts.join('.'); // Rest is domain name
  
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
    
    // Check availability only for the user's input TLD
    const availability = await resellerClubAPI.checkDomainAvailability(domainName, [tld]);
    
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
