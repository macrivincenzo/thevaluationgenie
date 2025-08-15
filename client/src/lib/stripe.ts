import { loadStripe } from '@stripe/stripe-js';

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface StripeConfig {
  publicKey: string;
  mode: 'live' | 'test';
}

// Initialize Stripe with configuration from server
let cachedStripePromise: Promise<any> | null = null;
let stripeConfig: StripeConfig | null = null;

export async function initializeStripe() {
  if (!cachedStripePromise) {
    cachedStripePromise = (async () => {
      try {
        // Try to fetch config from API endpoint first
        let config: StripeConfig;
        
        try {
          const response = await fetch('/api/stripe/config', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
            config = await response.json();
          } else {
            throw new Error('API endpoint not responding with JSON');
          }
        } catch (apiError) {
          console.warn('API config endpoint failed, using environment fallback:', apiError);
          
          // Fallback: Try to create payment intent to get the public key
          try {
            const testResponse = await fetch('/api/create-payment-intent', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ valuationId: 'test-for-config' }),
            });
            
            if (testResponse.status === 401) {
              // Expected - we're not authenticated, but this tells us Stripe is working
              // For now, assume live mode since we've set up live keys
              config = {
                publicKey: '', // Will be populated by server response
                mode: 'live' // Assume live mode since we configured live keys
              };
              console.warn('Using live mode assumption - authentication required for full test');
            } else {
              throw new Error('Cannot determine Stripe configuration');
            }
          } catch (fallbackError) {
            console.error('All config methods failed:', fallbackError);
            throw new Error('Unable to initialize Stripe - configuration not available');
          }
        }
        
        stripeConfig = config;
        
        if (config.publicKey) {
          console.log('Stripe mode:', config.mode, 'Key prefix:', config.publicKey?.substring(0, 8) + '...');
          return await loadStripe(config.publicKey);
        } else {
          console.warn('No public key in config, Stripe initialization may fail');
          // For now, return a promise that will be resolved when needed
          return null;
        }
      } catch (error) {
        console.error('Failed to load Stripe configuration:', error);
        throw error;
      }
    })();
  }
  return cachedStripePromise;
}

// Export the promise directly for Stripe Elements
export const stripePromise = initializeStripe();

export async function getStripeConfig(): Promise<StripeConfig> {
  if (!stripeConfig) {
    await initializeStripe(); // This will fetch and cache the config
  }
  return stripeConfig!;
}