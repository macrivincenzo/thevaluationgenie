import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode, useEffect, useState } from 'react';

// Lazy load Stripe only when needed
let stripePromise: ReturnType<typeof loadStripe> | null = null;

interface LazyStripeProps {
  children: ReactNode;
  enableStripe?: boolean;
}

export function LazyStripe({ children, enableStripe = false }: LazyStripeProps) {
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);

  useEffect(() => {
    if (enableStripe && !stripePromise) {
      // Load Stripe asynchronously when needed
      const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      if (publicKey) {
        stripePromise = loadStripe(publicKey);
        stripePromise.then(() => setIsStripeLoaded(true));
      }
    } else if (enableStripe && stripePromise) {
      setIsStripeLoaded(true);
    }
  }, [enableStripe]);

  // If Stripe is not needed, just render children
  if (!enableStripe) {
    return <>{children}</>;
  }

  // If Stripe is needed but not loaded yet, show loading
  if (!isStripeLoaded || !stripePromise) {
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}