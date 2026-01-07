import React, { useEffect } from 'react';
import { Container, Header, Icon, Message } from 'semantic-ui-react';
import { useShoppingCart } from 'use-shopping-cart';
import Link from 'next/link';

const Success = () => {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    // Clear cart on successful purchase
    clearCart();
    
    // Also clear localStorage directly as a fallback
    if (typeof window !== 'undefined') {
      // The use-shopping-cart package stores cart in localStorage
      const cartKeys = Object.keys(localStorage).filter(key => 
        key.includes('cart') || key.includes('stripe')
      );
      cartKeys.forEach(key => {
        if (key.toLowerCase().includes('cart')) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [clearCart]);

  return (
    <Container style={{ marginTop: '4rem', textAlign: 'center' }}>
      <Icon name="check circle" size="massive" color="green" />
      <Header as="h1">Payment Successful!</Header>
      <Message positive>
        <Message.Header>Thank you for your purchase!</Message.Header>
        <p>You will receive a confirmation email shortly.</p>
      </Message>
      <Link href="/">Return to Home</Link>
    </Container>
  );
};

export default Success;
