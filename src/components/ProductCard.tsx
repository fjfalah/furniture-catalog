import React, { useCallback, useState } from 'react';

import styled, { theme } from '../themes';
import { ProductsType } from '../types';
import { toIndonesianCurrency, textWithMaxLength } from '../utils/text';

import Pill from './Pill';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${(props) => props.theme.color.white};
  padding: 16px;
  border-radius: 8px;
  margin: 8px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.label`
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 14px;
  height: 66px;
  overflow: auto;
`;

const FurnitureStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Delivery = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const IconDelivery = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const DeliveryTime = styled.label`
  color: ${(props) => props.theme.color.grey};
`;

const MoreDescription = styled.a`
  text-decoration: unset;
  color: ${(props) => props.theme.color.green};
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
`;

const maxDescLength = 144;
const ProductCard: React.FC<ProductsType> = (props) => {
  const [isFullDescription, setIsFullDescription] = useState(false);
  const { deliveryTime, description, furnitureStyle, name, price } = props;
  const formatPrice = toIndonesianCurrency(price);
  const formatDelivery = `${deliveryTime} day(s)`;
  const formatDescription = textWithMaxLength(description, maxDescLength);
  const descLength = description.length;
  console.log(descLength);

  const handleMoreDescription = useCallback(() => {
    setIsFullDescription(!isFullDescription);
  }, [isFullDescription]);
  return (
    <Root>
      <Header>
        <Title>{name}</Title>
        <Pill background={theme.color.red}>{formatPrice}</Pill>
      </Header>
      <Description>
        {isFullDescription ? description : formatDescription}

        {descLength > maxDescLength && (
          <MoreDescription onClick={handleMoreDescription}>
            {isFullDescription ? 'less' : 'more'}
          </MoreDescription>
        )}
      </Description>
      <FurnitureStyle>
        {(furnitureStyle || []).map((item) => {
          return <Pill key={item}>{item}</Pill>;
        })}
      </FurnitureStyle>
      <Delivery>
        <IconDelivery src="/icons/icon-delivery.svg" alt="icon-delivery" />
        <DeliveryTime>{formatDelivery}</DeliveryTime>
      </Delivery>
    </Root>
  );
};

export default ProductCard;
