import React, { useEffect, useState, useCallback } from 'react';

import {
  Section,
  ProductCard,
  ProductSearchInput,
  NoDataFound,
  FilterDeliveryTime,
  Button,
} from '../components';
import styled, { theme } from '../themes';
import { ProductsType, CatalogType } from '../types';

const FlexWrapper = styled.div`
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

const FilterWrapper = styled(FlexWrapper)`
  justify-content: flex-end;
`;

const ButtonFilter = styled(Button)`
  margin-left: 10px;
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

const DeliveryFilterText = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color.white};
  margin-right: 20px;
`;

const HomePage: React.FC<CatalogType> & {
  getInitialProps: () => void;
} = (props) => {
  const [productsDisplayed, setProductsDisplayed] = useState(null);
  const [stylesDisplayed, setStylesDisplayed] = useState(null);
  const [isShowDeliveryFilter, setIsShowDeliveryFilter] = useState(false);
  const [isShowStyleFilter, setIsShowStyleFilter] = useState(false);
  const { furnitureStyles, products } = props;
  const hasProducts = productsDisplayed?.length !== 0;

  const handleCloseFilter = useCallback(() => {
    setProductsDisplayed(products);
    setIsShowStyleFilter(false);
    setIsShowDeliveryFilter(false);
  }, [products]);

  const handleFilterDone = useCallback((productsFiltered) => {
    setProductsDisplayed(productsFiltered);
  }, []);

  const handleDeliveryFilter = useCallback(() => {
    setIsShowDeliveryFilter(!isShowDeliveryFilter);
    setIsShowStyleFilter(false);
    setProductsDisplayed(products);
  }, [isShowDeliveryFilter, products]);

  const handleStyleFilter = useCallback(() => {
    setIsShowStyleFilter(!isShowStyleFilter);
    setIsShowDeliveryFilter(false);
    setProductsDisplayed(products);
  }, [isShowStyleFilter, products]);

  useEffect(() => {
    setProductsDisplayed(products);
    setStylesDisplayed(furnitureStyles);
  }, [products, furnitureStyles]);

  if (!furnitureStyles || !products) {
    return <Section>No Data</Section>;
  }

  return (
    <Section>
      <FlexWrapper>
        <Title>FURNITURE CATALOG</Title>
        <ProductSearchInput
          products={products}
          onSearchDone={handleFilterDone}
        />
      </FlexWrapper>
      <FilterWrapper>
        <ButtonFilter
          onClick={handleDeliveryFilter}
          background={
            isShowDeliveryFilter ? theme.color.grey : theme.color.yellow
          }
          textColor={
            isShowDeliveryFilter ? theme.color.white : theme.color.black
          }
        >
          {isShowDeliveryFilter
            ? 'Close Filter by Delivery Time'
            : 'Filter by Delivery Time'}
        </ButtonFilter>
        <ButtonFilter
          onClick={handleStyleFilter}
          background={isShowStyleFilter ? theme.color.grey : theme.color.yellow}
          textColor={isShowStyleFilter ? theme.color.white : theme.color.black}
        >
          {isShowStyleFilter
            ? 'Close Filter by Furniture Style'
            : 'Filter by Furniture Style'}
        </ButtonFilter>
      </FilterWrapper>
      {isShowDeliveryFilter && (
        <FilterDeliveryTime
          products={products}
          onSearchDone={handleFilterDone}
        />
      )}
      {!hasProducts && <NoDataFound onClose={handleCloseFilter} />}
      <ProductsWrapper>
        {hasProducts &&
          (productsDisplayed || []).map((item: ProductsType) => {
            const {
              deliveryTime,
              deliveryTimeWeek,
              description,
              furnitureStyle,
              name,
              price,
            } = item;

            return (
              <ProductCardWrapper key={name + price}>
                <ProductCard
                  deliveryTime={deliveryTime}
                  deliveryTimeWeek={deliveryTimeWeek}
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
      deliveryTimeWeek: Math.ceil(parseInt(deliveryTime, 10) / 7),
      description,
      furnitureStyle,
      name,
      price,
    });
  });
  return { products: productsTransform, furnitureStyles: resFurnitureStyles };
};

export default HomePage;
