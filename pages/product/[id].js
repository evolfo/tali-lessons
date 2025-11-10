import React from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Header, Button, Image } from 'semantic-ui-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useCartModal } from '../../contexts/CartModalContext';
import { products } from '../../data/products';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addItem, cartDetails, incrementItem } = useShoppingCart();
  const { openCart } = useCartModal();

  const product = products[id];

  if (!product) {
    return (
      <Container style={{ padding: '5rem', textAlign: 'center' }}>
        <Header as="h1">Product not found</Header>
        <Button primary onClick={() => router.push('/book-bundle')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
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
  const isSheetMusic = product.id.startsWith('sheetMusic');

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .sheet-music-overlay {
            display: block;
          }
          .sheet-music-mobile {
            display: none;
          }
          @media (max-width: 1199px) {
            .sheet-music-overlay {
              display: none !important;
            }
            .sheet-music-mobile {
              display: block !important;
            }
          }
        `
      }} />
      <div className="product-page" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <Container style={{ padding: '2rem', maxWidth: '1200px' }}>
        {/* Back Button */}
        <div style={{ marginBottom: '2rem' }}>
          <Button
            basic
            onClick={() => router.back()}
            style={{
              border: 'none',
              color: '#666',
              fontSize: '1.1rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ← Back to Products
          </Button>
        </div>

        {/* Main Product Section */}
        <Grid stackable>
          <Grid.Row>
            {/* Media Section */}
            <Grid.Column widescreen={10} computer={10} tablet={16} mobile={16}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                marginBottom: '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {product.youtubeUrl && product.youtubeUrl !== '' ? (
                  <div className="iframe-container" style={{ position: 'relative', height: 0 }}>
                    <iframe
                      src={product.youtubeUrl}
                      title={product.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '16px 16px 0 0'
                      }}
                    />
                  </div>
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '16px 16px 0 0'
                    }}
                  />
                )}
                {/* Sheet Music Image for YouTube products */}
                {product.youtubeUrl && product.youtubeUrl !== '' && isSheetMusic && (
                  <>
                    {/* Overlay version for large screens */}
                    <div className="sheet-music-overlay" style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      padding: '12px',
                      maxWidth: '200px'
                    }}>
                      <Image
                        src={product.image}
                        alt={`${product.name} sheet music`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px'
                        }}
                      />
                    </div>

                    {/* Separate container for mobile/tablet */}
                    <div className="sheet-music-mobile" style={{
                      marginTop: '1rem',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <Header as="h4" style={{ color: '#2c3e50', marginBottom: '1rem' }}>
                        Sheet Music Preview
                      </Header>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image
                          src={product.image}
                          alt={`${product.name} sheet music`}
                          style={{
                            maxWidth: '300px',
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Grid.Column>

            {/* Product Info Section */}
            <Grid.Column widescreen={6} computer={6} tablet={16} mobile={16}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                padding: '3rem',
                height: 'fit-content',
                position: 'sticky',
                top: '2rem'
              }}>
                <Header
                  as="h1"
                  style={{
                    color: '#2c3e50',
                    marginBottom: '1rem',
                    lineHeight: '1.2'
                  }}
                >
                  {product.name}
                </Header>

                <p style={{
                  fontSize: '1.2rem',
                  color: '#7f8c8d',
                  lineHeight: '1.6',
                  marginBottom: '0'
                }}>
                  {product.description}
                </p>

                {/* Price Section */}
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  marginBottom: '.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    {originalPrice && (
                      <span style={{
                        textDecoration: 'line-through',
                        opacity: '0.7',
                        fontSize: '1.5rem'
                      }}>
                        ${(originalPrice / 100).toFixed(2)}
                      </span>
                    )}
                    <span style={{
                      fontSize: '2.5rem',
                      fontWeight: '700'
                    }}>
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  primary
                  size="large"
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    height: '60px',
                    borderRadius: '12px',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    background: 'linear-gradient(180deg, #2b77c4 0%, #2a5a8a 100%)',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* Additional Content Section */}
        <Grid stackable>
          <Grid.Column width={16}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              padding: '3rem',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '150px'
            }}>
              <img
                src="/img/about1.jpg"
                alt="Tali Rubinstein"
                style={{
                  position: 'absolute',
                  left: '2px',
                  top: '0',
                  width: '450px',
                  height: 'auto',
                  opacity: '0.35',
                  pointerEvents: 'none'
                }}
              />
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <Header as="h2" style={{ color: '#2c3e50', marginBottom: '1rem' }}>
                  Why {isSheetMusic ? 'Choose This Sheet Music' : 'Take Recorder Lessons with Tali'}?
                </Header>
                <p style={{ fontSize: '1.1rem', textShadow: '1px 1px 9px rgba(0, 0, 0, 0.1)', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
                  {isSheetMusic
                    ? "Experience the beauty of recorder music with professionally arranged sheet music by Tali Rubinstein. Perfect for students and enthusiasts looking to expand their repertoire."
                    : "Join Tali Rubinstein for personalized recorder lessons that will elevate your playing. Whether you're a beginner or advanced student, these lessons are designed to help you progress and enjoy the journey."
                  }
                </p>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default ProductPage;
