import { NextResponse } from 'next/server';

const DomainNameApi = require('nodejs-dna');

export async function GET() {
  try {
    const username = process.env.DOMAIN_NAME_API_USERNAME!;
    const password = process.env.DOMAIN_NAME_API_PASSWORD!;
    const testMode = process.env.DOMAIN_NAME_API_TEST_MODE === 'true';
    
    const client = new DomainNameApi(username, password, testMode);
    const response = await client.GetTldList(1000);
    
    if (!response || !response.data) {
      return NextResponse.json({ success: false, error: 'No data' }, { status: 500 });
    }
    
    const tlds = response.data.map((item: any) => {
      const regPricing = item.pricing?.registration || {};
      const renewPricing = item.pricing?.renew || {};
      const transferPricing = item.pricing?.transfer || {};
      
      const regPeriods = Object.keys(regPricing);
      const renewPeriods = Object.keys(renewPricing);
      const transferPeriods = Object.keys(transferPricing);
      
      const getYearlyPrice = (pricing: any, periods: string[]) => {
        if (periods.length === 0) return 0;
        const period = parseInt(periods[0]);
        return parseFloat(pricing[period]) / period;
      };
      
      return {
        tld: item.tld.replace('.', ''),
        registration: getYearlyPrice(regPricing, regPeriods),
        renew: getYearlyPrice(renewPricing, renewPeriods),
        transfer: getYearlyPrice(transferPricing, transferPeriods),
        currency: item.currencies?.registration || 'USD',
      };
    });
    
    // Add .af manually
    tlds.push({
      tld: 'af',
      registration: 29.99,
      renew: 29.99,
      transfer: 29.99,
      currency: 'USD',
    });
    
    return NextResponse.json({ success: true, data: tlds });
  } catch (error) {
    console.error('Error fetching detailed TLD info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch TLD details' },
      { status: 500 }
    );
  }
}
