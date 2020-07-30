import React from 'react';

import { Section, ProductCard } from '../components';
import { useCatalog } from '../provider/catalog';
import styled from '../themes';
import { ProductsType } from '../types';

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ProductCardWrapper = styled.div`
  width: 50%;

  @media only screen and (max-width: 720px) {
    width: 100%;
  }
`;

const HomePage: React.FC = () => {
  const { furnitureStyles, products } = useCatalog();

  return (
    <Section>
      <ProductsWrapper>
        {(products || []).map((item: ProductsType) => {
          const {
            deliveryTime,
            description,
            furnitureStyle,
            name,
            price,
          } = item;

          return (
            <ProductCardWrapper key={name + price}>
              <ProductCard
                deliveryTime={deliveryTime}
                description={description}
                furnitureStyle={furnitureStyle}
                name={name}
                price={price}
              />
            </ProductCardWrapper>
          );
        })}
      </ProductsWrapper>
    </Section>
  );
};

export default HomePage;
