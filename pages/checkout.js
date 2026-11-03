import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { Container, Loader } from 'semantic-ui-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const router = useRouter();
  const { client_secret } = router.query;
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (client_secret) {
      setOptions({ clientSecret: client_secret });
    }
  }, [client_secret]);

  if (!options) {
    return (
      <Container style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h1 className="sr-only">Checkout</h1>
        <Loader active inline="centered">Loading checkout...</Loader>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2rem', marginBottom: '2rem', maxWidth: '800px' }}>
      <h1 className="sr-only">Checkout</h1>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Container>
  );
};

export default CheckoutPage;
