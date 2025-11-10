import React from "react";
import { Modal, Button, List, Icon, Header, Input } from 'semantic-ui-react';
import { useShoppingCart } from 'use-shopping-cart';

const ShoppingCart = ({ open, onClose }) => {
  const { cartCount, cartDetails, removeItem, totalPrice, setItemQuantity } = useShoppingCart();

  const handleCheckout = async () => {
    try {
      const items = Object.values(cartDetails).map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        id: item.id,
        pdfFile: item.pdfFile,
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });

      const { clientSecret } = await response.json();
      window.location.href = `/checkout?client_secret=${clientSecret}`;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (qty > 0) {
      setItemQuantity(itemId, qty);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="small">
      <Modal.Header>
        Shopping Bag
        <Icon name="close" style={{ float: 'right', cursor: 'pointer' }} onClick={onClose} />
      </Modal.Header>
      <Modal.Content>
        {cartCount === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <List divided relaxed>
              {Object.values(cartDetails).map((item) => (
                <List.Item key={item.id}>
                  <List.Content floated="right">
                    <Button icon size="mini" onClick={() => removeItem(item.id)}>
                      <Icon name="trash" />
                    </Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>{item.name}</List.Header>
                    <List.Description>
                      ${(item.price / 100).toFixed(2)} x
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        style={{ width: '60px', margin: '0 0.5rem' }}
                        size="mini"
                      />
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Header as="h3" style={{ marginTop: '1rem' }}>
              Total: ${(totalPrice / 100).toFixed(2)}
            </Header>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Continue Shopping</Button>
        <Button primary disabled={cartCount === 0} onClick={handleCheckout}>
          Checkout
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ShoppingCart;
