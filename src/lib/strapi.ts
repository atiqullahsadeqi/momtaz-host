// Strapi API configuration and utilities

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      large?: {
        url: string;
        width: number;
        height: number;
      };
    };
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiComponent {
  id: number;
  __component: string;
  [key: string]: any;
}

export interface StrapiEntry {
  id: number;
  attributes: {
    [key: string]: any;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Helper function to get full image URL
export function getStrapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image) return '';
  
  const url = image.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// Helper function to get image with specific format
export function getStrapiImageFormat(
  image: StrapiImage | null | undefined,
  format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): { url: string; width: number; height: number } | null {
  if (!image) return null;
  
  const formats = image.attributes.formats;
  if (formats && formats[format]) {
    const formatData = formats[format];
    return {
      url: formatData.url.startsWith('http') ? formatData.url : `${STRAPI_URL}${formatData.url}`,
      width: formatData.width,
      height: formatData.height,
    };
  }
  
  // Fallback to original image
  return {
    url: getStrapiImageUrl(image),
    width: image.attributes.width,
    height: image.attributes.height,
  };
}

// Generic API fetch function
export async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Only add Authorization header if we have a token
  // For public content, we don't need a token
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  console.log('Fetching from Strapi:', url);
  console.log('Headers:', headers);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Strapi API error response:', errorText);
    throw new Error(`Strapi API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

// Test function to check Strapi connection
export async function testStrapiConnection() {
  try {
    console.log('Testing Strapi connection...');
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage`);
    console.log('Strapi response status:', response.status);
    console.log('Strapi response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi error response:', errorText);
      return { success: false, error: errorText };
    }
    
    const data = await response.json();
    console.log('Strapi test data:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Strapi connection test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Homepage specific API functions
export async function getHomepage() {
  try {
    console.log('Fetching homepage from Strapi...');
    
    // First test the connection
    const connectionTest = await testStrapiConnection();
    if (!connectionTest.success) {
      throw new Error(`Strapi connection failed: ${connectionTest.error}`);
    }
    
    // Start with basic homepage data first
    console.log('Trying basic homepage fetch...');
    let response;
    
    try {
      // First try with just basic data
      response = await fetchStrapi('/homepage');
      console.log('Basic homepage data received:', response);
    } catch (basicError) {
      console.log('Basic fetch failed, trying with populate=*...');
      // Fallback to populate=*
      response = await fetchStrapi('/homepage?populate=*');
      console.log('Homepage data with populate=* received:', response);
    }
    
    return response.data;
    
  } catch (error) {
    console.error('Error fetching homepage from Strapi:', error);
    throw error;
  }
}

// Helper function to populate relations
export function populateRelations<T extends Record<string, any>>(
  data: T,
  relations: string[]
): T {
  const populated = { ...data } as any;
  
  relations.forEach(relation => {
    if (populated[relation] && populated[relation].data) {
      populated[relation] = populated[relation].data;
    }
  });
  
  return populated as T;
}

// Helper function to transform Strapi data to component props
export function transformStrapiData<T>(data: any): T {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return data.map(transformStrapiData) as T;
  }
  
  if (typeof data === 'object' && data !== null) {
    const transformed: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (key === 'attributes' && typeof value === 'object') {
        Object.assign(transformed, transformStrapiData(value));
      } else if (key === 'data' && typeof value === 'object') {
        transformed[key] = transformStrapiData(value);
      } else if (key === 'url' && typeof value === 'string' && !value.startsWith('http')) {
        transformed[key] = `${STRAPI_URL}${value}`;
      } else {
        transformed[key] = transformStrapiData(value);
      }
    }
    
    return transformed as T;
  }
  
  return data as T;
}

// Helper function to safely get nested Strapi data
export function getStrapiData(data: any, path: string, defaultValue: any = null) {
  if (!data) return defaultValue;
  
  const keys = path.split('.');
  let current = data;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  
  return current !== undefined ? current : defaultValue;
}