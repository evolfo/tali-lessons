import React, { useEffect } from 'react';
import { Container, Header, Message } from 'semantic-ui-react';
import SvgIcon from '../components/SvgIcon';
import { useShoppingCart } from '../contexts/CartContext';
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
      <SvgIcon name="check-circle" style={{ fontSize: '8em', color: '#21ba45' }} />
      <Header as="h1">Payment Successful!</Header>
      <Message positive>
        <Message.Header>Thank you for your purchase!</Message.Header>
        <p>You will receive a confirmation email shortly.</p>
      </Message>
      <Link href="/" style={{ display: 'inline-block', padding: '0.75rem 1rem' }}>Return to Home</Link>
    </Container>
  );
};

export default Success;
