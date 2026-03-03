import { cache } from './cache';

const RESELLERCLUB_BASE_URL = process.env.RESELLERCLUB_TEST_MODE === 'true' 
  ? 'https://test.httpapi.com/api' 
  : 'https://httpapi.com/api';
const CACHE_KEY_PRICING = 'domain_pricing_all';
const CACHE_TTL_MINUTES = 120; // 2 hours

export interface DomainPrice {
  tld: string;
  price: number;
  currency: string;
}

export interface DomainAvailability {
  domain: string;
  available: boolean;
  price?: number;
}

class ResellerClubAPI {
  private authUserId: string;
  private apiKey: string;
  private isRefreshing = false;

  constructor() {
    this.authUserId = process.env.RESELLERCLUB_AUTH_USERID!;
    this.apiKey = process.env.RESELLERCLUB_API_KEY!;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${RESELLERCLUB_BASE_URL}${endpoint}`);
    
    // Add auth parameters
    url.searchParams.append('auth-userid', this.authUserId);
    url.searchParams.append('api-key', this.apiKey);
    
    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.log('Making API request to:', url.toString());
    
    const response = await fetch(url.toString());
    console.log('API Response status:', response.status);
    
    const responseText = await response.text();
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} - ${responseText}`);
    }
    
    try {
      return JSON.parse(responseText);
    } catch {
      console.error('Failed to parse JSON:', responseText);
      throw new Error('Invalid JSON response');
    }
  }

  async checkDomainAvailability(domainName: string, tlds: string[]): Promise<DomainAvailability[]> {
    try {
      const url = new URL('https://httpapi.com/api/domains/available.json');
      
      url.searchParams.append('auth-userid', this.authUserId);
      url.searchParams.append('api-key', this.apiKey);
      url.searchParams.append('domain-name', domainName);
      url.searchParams.append('tlds', tlds.join(','));

      console.log('Checking availability:', url.toString());
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', JSON.stringify(result, null, 2));
      
      return tlds.map(tld => {
        const domainKey = `${domainName}.${tld}`;
        const domainData = result[domainKey];
        
        return {
          domain: domainKey,
          available: domainData?.status === 'available'
        };
      });
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }

  private async fetchPricingFromAPI(): Promise<DomainPrice[]> {
    console.log('🔄 Fetching fresh pricing data from ResellerClub API...');
    
    const prices: DomainPrice[] = [];
    
    // Add fixed .af pricing
    prices.push({
      tld: 'af',
      price: 30,
      currency: 'USD'
    });
    
    try {
      const result = await this.makeRequest('/products/customer-price.json', {});
      console.log('✅ API call successful, processing ALL TLD data...');
      
      // Process ALL TLDs from the API response
      for (const [key, value] of Object.entries(result)) {
        // Extract TLD name from keys like "dotcom", "dotnet", etc.
        if (key.startsWith('dot') && typeof value === 'object') {
          const tld = key.replace('dot', '');
          const tldData = value as any;
          
          if (tldData.addnewdomain && tldData.addnewdomain['1']) {
            const price = parseFloat(tldData.addnewdomain['1']);
            
            prices.push({
              tld,
              price,
              currency: 'USD'
            });
            
            console.log(`✅ Added pricing for .${tld}: $${price}`);
          }
        }
      }
      
      // Cache the results
      cache.set(CACHE_KEY_PRICING, prices, CACHE_TTL_MINUTES);
      console.log(`💾 Cached ${prices.length} TLD prices for ${CACHE_TTL_MINUTES} minutes`);
      
      return prices;
      
    } catch (error) {
      console.error('❌ API Error:', error);
      
      // Return minimal fallback pricing if API fails
      const fallbackTlds = ['com', 'net', 'org', 'online', 'store', 'shop', 'xyz', 'info', 'biz'];
      const fallbackPrices: Record<string, number> = {
        'com': 12.99,
        'net': 14.99,
        'org': 13.99,
        'online': 9.99,
        'store': 7.99,
        'shop': 6.99,
        'xyz': 5.99,
        'info': 11.99,
        'biz': 13.99
      };
      
      for (const tld of fallbackTlds) {
        prices.push({
          tld,
          price: fallbackPrices[tld],
          currency: 'USD'
        });
      }
      
      cache.set(CACHE_KEY_PRICING, prices, 30);
      
      return prices;
    }
  }

  async getDomainPricing(tlds: string[]): Promise<DomainPrice[]> {
    // If no TLDs specified, get all available TLDs from cache or API
    if (tlds.length === 0) {
      const cachedPricing = cache.get<DomainPrice[]>(CACHE_KEY_PRICING);
      if (cachedPricing) {
        console.log('🎯 Using cached pricing data for all TLDs');
        return cachedPricing;
      }
      
      // Fetch all TLDs if not cached
      if (this.isRefreshing) {
        console.log('⏳ API refresh in progress, waiting...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const retryCache = cache.get<DomainPrice[]>(CACHE_KEY_PRICING);
        if (retryCache) {
          return retryCache;
        }
      }
      
      this.isRefreshing = true;
      
      try {
        const freshPricing = await this.fetchPricingFromAPI();
        return freshPricing;
      } finally {
        this.isRefreshing = false;
      }
    }
    
    // Check cache first for specific TLDs
    const cachedPricing = cache.get<DomainPrice[]>(CACHE_KEY_PRICING);
    
    if (cachedPricing) {
      console.log('🎯 Using cached pricing data');
      // Filter to requested TLDs
      return cachedPricing.filter(price => tlds.includes(price.tld));
    }
    
    // Prevent multiple simultaneous API calls
    if (this.isRefreshing) {
      console.log('⏳ API refresh in progress, waiting...');
      // Wait a bit and try cache again
      await new Promise(resolve => setTimeout(resolve, 1000));
      const retryCache = cache.get<DomainPrice[]>(CACHE_KEY_PRICING);
      if (retryCache) {
        return retryCache.filter(price => tlds.includes(price.tld));
      }
    }
    
    this.isRefreshing = true;
    
    try {
      const freshPricing = await this.fetchPricingFromAPI();
      return freshPricing.filter(price => tlds.includes(price.tld));
    } finally {
      this.isRefreshing = false;
    }
  }

  // Method to manually refresh cache (for admin use)
  async refreshPricingCache(): Promise<void> {
    console.log('🔄 Manual cache refresh requested');
    cache.delete(CACHE_KEY_PRICING);
    await this.fetchPricingFromAPI();
  }

  // Get cache status
  getCacheStatus() {
    const hasCachedPricing = cache.has(CACHE_KEY_PRICING);
    const cacheStats = cache.getStats();
    
    return {
      hasCachedPricing,
      cacheStats,
      ttlMinutes: CACHE_TTL_MINUTES
    };
  }
}

export const resellerClubAPI = new ResellerClubAPI();
