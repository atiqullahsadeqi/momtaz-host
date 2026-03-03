export interface WHMPackage {
  name: string;
  DISKSPACE: string;
  BWLIMIT: string;
  MAXADDON: string;
  MAXSUB: string;
  MAXPARK: string;
  MAXSQL: string;
  MAXPOP: string;
  MAXLST: string;
  FEATURELIST: string;
  [key: string]: any;
}

export interface HostingPlan {
  name: string;
  displayName: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

class WHMClient {
  private hostname: string;
  private apiKey: string;

  constructor() {
    this.hostname = process.env.SHARED_SERVER_WHM_HOSTNAME || 'cloudf.momtaz.ws:2087';
    this.apiKey = process.env.SHARED_SERVER_WHM_API_KEY!;
  }

  async getPackage(packageName: string): Promise<WHMPackage | null> {
    try {
      const url = `https://${this.hostname}/json-api/getpkginfo?api.version=1&pkg=${packageName}`;
      
      console.log(`[WHM] Fetching package: ${packageName}`);
      console.log(`[WHM] URL: ${url}`);
      console.log(`[WHM] Hostname: ${this.hostname}`);
      console.log(`[WHM] API Key exists: ${!!this.apiKey}`);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `WHM root:${this.apiKey}`,
        },
        cache: 'no-store',
      });

      console.log(`[WHM] Response status for ${packageName}:`, response.status);
      const data = await response.json();
      console.log(`[WHM] Response data for ${packageName}:`, JSON.stringify(data, null, 2));
      
      if (data?.data?.pkg) {
        console.log(`[WHM] Package ${packageName} found:`, data.data.pkg);
        return data.data.pkg;
      }
      
      console.log(`[WHM] Package ${packageName} not found in response`);
      return null;
    } catch (error) {
      console.error(`[WHM] Error fetching package ${packageName}:`, error);
      return null;
    }
  }

  async getAllPackages(): Promise<WHMPackage[]> {
    try {
      const url = `https://${this.hostname}/json-api/listpkgs?api.version=1`;
      
      console.log(`[WHM] Fetching all packages`);
      console.log(`[WHM] URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `WHM root:${this.apiKey}`,
        },
        cache: 'no-store',
      });

      console.log(`[WHM] Response status:`, response.status);
      const data = await response.json();
      console.log(`[WHM] Response data:`, JSON.stringify(data, null, 2));
      
      if (data?.data?.pkg) {
        console.log(`[WHM] Found ${data.data.pkg.length} packages`);
        return data.data.pkg;
      }
      
      return [];
    } catch (error) {
      console.error('[WHM] Error fetching packages:', error);
      return [];
    }
  }

  formatPackageFeatures(pkg: WHMPackage): string[] {
    const features: string[] = [];
    
    // Storage - check both DISKSPACE and QUOTA
    const diskspace = pkg.DISKSPACE || pkg.QUOTA;
    if (diskspace) {
      if (diskspace === 'unlimited') {
        features.push('Unlimited SSD Storage');
      } else {
        const sizeInMB = parseInt(diskspace);
        const sizeInGB = Math.round(sizeInMB / 1024);
        features.push(`${sizeInGB}GB SSD Storage`);
      }
    }
    
    if (pkg.MAXSQL) {
      features.push(pkg.MAXSQL === 'unlimited' ? 'Unlimited Databases' : `${pkg.MAXSQL} Databases`);
    }
    
    if (pkg.MAXPOP) {
      features.push(pkg.MAXPOP === 'unlimited' ? 'Unlimited Email Accounts' : `${pkg.MAXPOP} Email Accounts`);
    }
    
    if (pkg.MAXADDON) {
      const addonCount = pkg.MAXADDON === 'unlimited' ? 'unlimited' : parseInt(pkg.MAXADDON);
      if (addonCount === 'unlimited') {
        features.push('Unlimited Websites');
      } else {
        features.push(`${addonCount + 1} Websites`);
      }
    }
    
    features.push('Free SSL Certificate');
    features.push('cPanel Control Panel');
    features.push('24/7 Support');
    
    return features;
  }
}

export const whmClient = new WHMClient();
