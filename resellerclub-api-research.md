# ResellerClub API Research

## Key API Endpoints for Domain Operations:

### 1. Domain Availability Check
- **Endpoint**: `https://httpapi.com/api/domains/available.json`
- **Method**: GET
- **Parameters**:
  - `auth-userid`: Your user ID
  - `api-key`: Your API key
  - `domain-name`: Domain name to check (without TLD)
  - `tlds`: Comma-separated list of TLDs to check

### 2. Domain Pricing
- **Endpoint**: `https://httpapi.com/api/domains/customer-price.json`
- **Method**: GET
- **Parameters**:
  - `auth-userid`: Your user ID
  - `api-key`: Your API key
  - `domain-name`: Domain name
  - `years`: Number of years (default: 1)

### 3. TLD List with Pricing
- **Endpoint**: `https://httpapi.com/api/domains/customer-price.json`
- **Method**: GET
- **Parameters**:
  - `auth-userid`: Your user ID
  - `api-key`: Your API key

## Implementation Plan:

1. Create API utility functions for ResellerClub
2. Create server-side API routes in Next.js
3. Update the domains page to fetch real data
4. Add domain search functionality
5. Display real pricing from ResellerClub

## Required Environment Variables:
- RESELLERCLUB_USER_ID
- RESELLERCLUB_API_KEY
