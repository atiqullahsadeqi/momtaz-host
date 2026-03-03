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

class DomainNameAPIClient {
  private client: any;

  constructor() {
    const DomainNameApi = require('nodejs-dna');
    const username = process.env.DOMAIN_NAME_API_USERNAME!;
    const password = process.env.DOMAIN_NAME_API_PASSWORD!;
    const testMode = process.env.DOMAIN_NAME_API_TEST_MODE === 'true';

    this.client = new DomainNameApi(username, password, testMode);
  }

  async checkDomainAvailability(domainName: string, tlds: string[]): Promise<DomainAvailability[]> {
    try {
      const response = await this.client.CheckAvailability([domainName], tlds, 1, 'create');
      
      if (Array.isArray(response)) {
        return response.map((item: any) => ({
          domain: item.DomainName,
          available: item.Status === 'available',
          price: item.Price,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }

  async getDomainPricing(tlds: string[]): Promise<DomainPrice[]> {
    try {
      const dummyDomain = 'pricing-check-' + Date.now();
      const response = await this.client.CheckAvailability([dummyDomain], tlds, 1, 'create');
      
      if (Array.isArray(response)) {
        return response.map((item: any) => ({
          tld: item.TLD,
          price: parseFloat(item.Price || 0),
          currency: item.Currency || 'USD',
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching domain pricing:', error);
      throw error;
    }
  }

  async getAllTLDs(): Promise<string[]> {
    try {
      const response = await this.client.GetTldList(500);
      
      if (response && response.data) {
        return response.data.map((item: any) => item.tld.replace('.', ''));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching TLDs:', error);
      throw error;
    }
  }
}

export const domainNameAPI = new DomainNameAPIClient();
