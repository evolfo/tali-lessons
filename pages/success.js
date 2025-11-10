import React, { useEffect } from 'react';
import { Container, Header, Icon, Message } from 'semantic-ui-react';
import { useShoppingCart } from 'use-shopping-cart';
import Link from 'next/link';

const Success = () => {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
