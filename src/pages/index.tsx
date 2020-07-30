import Head from 'next/head';
import React, { useEffect, useState, useCallback } from 'react';

import {
  Section,
  ProductCard,
  ProductSearchInput,
  NoDataFound,
  ProductsFilter,
} from '../components';
import {
  ButtonFilter,
  FilterWrapper,
  FlexWrapper,
  ProductCardWrapper,
  ProductsWrapper,
  Title,
} from '../components/HomeComponents';
import { theme } from '../themes';
import { ProductsType, CatalogType } from '../types';
import { deliveryTimeData, furnitureStylesData } from '../utils/optionData';

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
    setIsShowStyleFilter(false);
    setIsShowDeliveryFilter(false);
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
    <>
      <Head>
        <title>Sofalog</title>
      </Head>
      <Section>
        <FlexWrapper>
          <Title>SOFALOG</Title>
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
            background={
              isShowStyleFilter ? theme.color.grey : theme.color.yellow
            }
            textColor={
              isShowStyleFilter ? theme.color.white : theme.color.black
            }
          >
            {isShowStyleFilter
              ? 'Close Filter by Furniture Style'
              : 'Filter by Furniture Style'}
          </ButtonFilter>
        </FilterWrapper>
        {isShowDeliveryFilter && (
          <ProductsFilter
            products={products}
            onSearchDone={handleFilterDone}
            optionData={deliveryTimeData}
            filterMethod="deliveryTime"
          />
        )}
        {isShowStyleFilter && (
          <ProductsFilter
            products={products}
            onSearchDone={handleFilterDone}
            optionData={furnitureStylesData(stylesDisplayed)}
            filterMethod="furnitureStyles"
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
    </>
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
