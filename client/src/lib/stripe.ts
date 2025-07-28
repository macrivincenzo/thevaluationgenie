import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export { stripePromise };

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface StripeConfig {
  publicKey: string;
  secretKey?: string; // Only available on server
}

export const stripeConfig: StripeConfig = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
};