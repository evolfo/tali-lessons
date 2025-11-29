import React from "react";
import Link from 'next/link';
import NextImage from 'next/image';
import { Card, Button } from 'semantic-ui-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useCartModal } from '../contexts/CartModalContext';

const ProductCard = ({ product }) => {
  const { addItem, cartDetails, incrementItem } = useShoppingCart();
  const { openCart } = useCartModal();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartDetails[product.id]) {
      incrementItem(product.id);
    } else {
      addItem(product);
    }
    openCart();
  };

  const getOriginalPrice = () => {
    if (product.id.includes('_5')) return product.price / 0.95;
    if (product.id.includes('_10')) return product.price / 0.93;
    if (product.id.includes('_20')) return product.price / 0.90;
    return null;
  };

  const originalPrice = getOriginalPrice();

  const isSheetMusic = (() => {
    if (product.isSheetMusic) return true;
    const category = (product.category || product.type || '').toString().toLowerCase();
    if (category.includes('sheet')) return true;
    if (product.image && product.image.toString().toLowerCase().includes('sheet')) return true;
    return false;
  })();

  return (
    <Link href={`/product/${product.id}`} legacyBehavior>
        <Card raised className="product-card">
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: isSheetMusic ? '200px' : '250px',
            overflow: 'hidden'
          }}>
            <NextImage 
              src={product.image} 
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>
              {originalPrice && (
                <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>
                  ${(originalPrice / 100).toFixed(2)}
                </span>
              )}
              <span style={{ color: '#000', fontWeight: 'bold' }}>
                ${(product.price / 100).toFixed(2)}
              </span>
            </Card.Meta>
            <Card.Description>{product.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button primary fluid onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Card.Content>
        </Card>
    </Link>
  );
};

export default ProductCard;
