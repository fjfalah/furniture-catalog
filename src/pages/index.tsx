import React, { useEffect, useState, useCallback } from 'react';

import {
  Section,
  ProductCard,
  ProductSearchInput,
  NoDataFound,
} from '../components';
import styled from '../themes';
import { ProductsType, CatalogType } from '../types';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media only screen and (max-width: 720px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.color.white};
`;

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

const HomePage: React.FC<CatalogType> & {
  getInitialProps: () => void;
} = (props) => {
  const [productsDisplayed, setProductsDisplayed] = useState(null);
  const [stylesDisplayed, setStylesDisplayed] = useState(null);
  const { furnitureStyles, products } = props;
  const hasProducts = productsDisplayed?.length !== 0;

  const handleSearchDone = useCallback((productsFiltered) => {
    setProductsDisplayed(productsFiltered);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setProductsDisplayed(products);
  }, [products]);

  useEffect(() => {
    setProductsDisplayed(products);
    setStylesDisplayed(furnitureStyles);
  }, [products, furnitureStyles]);

  if (!furnitureStyles || !products) {
    return <Section>No Data</Section>;
  }

  return (
    <Section>
      <Header>
        <Title>FURNITURE CATALOG</Title>
        <ProductSearchInput
          products={products}
          onSearchDone={handleSearchDone}
        />
      </Header>
      {!hasProducts && <NoDataFound onClose={handleCloseFilter} />}
      <ProductsWrapper>
        {hasProducts &&
          (productsDisplayed || []).map((item: ProductsType) => {
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

HomePage.getInitialProps = async () => {
  const res = await fetch('http://www.mocky.io/v2/5c9105cb330000112b649af8');
  const catalog = await res.json();

  const {
    furniture_styles: resFurnitureStyles,
    products: resProducts,
  } = catalog;

  const productsTransform = [];
  (resProducts || []).map((item) => {
    const {
      delivery_time: deliveryTime,
      description,
      furniture_style: furnitureStyle,
      name,
      price,
    } = item;
    return productsTransform.push({
      deliveryTime,
      description,
      furnitureStyle,
      name,
      price,
    });
  });
  return { products: productsTransform, furnitureStyles: resFurnitureStyles };
};

export default HomePage;
