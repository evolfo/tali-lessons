import React from "react";
import { Card, Header, Container } from "semantic-ui-react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const StoreGrid = () => {
  const lessonBundles = Object.values(products).filter(p => p.id.startsWith('lesson') || p.id.startsWith('price'));
  const sheetMusic = Object.values(products).filter(p => p.id.startsWith('sheet'));

  return (
    <Container id="lesson-bundles" className="bundle-container">
      <Header>Lessons and Sheet Music</Header>
      <p>
        Get 5% off 5 lessons, 7% off 10 lessons, or 10% off 20 lessons by choosing one of the options below.
        <br />
        (The prices listed are for 5-lesson bundles, click on a box for more options)
      </p>

      <Header as="h2">Lessons</Header>
      <Card.Group itemsPerRow={3} stackable>
        {lessonBundles.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Card.Group>

      {sheetMusic.length > 0 && (
        <>
          <Header as="h2" style={{ marginTop: '2rem' }}>Sheet Music</Header>
          <Card.Group itemsPerRow={3} stackable>
            {sheetMusic.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Card.Group>
        </>
      )}
    </Container>
  );
};

export default StoreGrid;
