import React, { useCallback, useState, useEffect } from 'react';

import styled from '../themes';
import { ProductFilterType } from '../types';
import { filterByDeliveryTime } from '../utils/filters';

import Button from './Button';
import InputCheckbox from './InputCheckbox';

const deliveryTimeData = [
  { value: 1, label: '1 Week' },
  { value: 2, label: '2 Weeks' },
  { value: 3, label: '3 Weeks' },
  { value: 4, label: '1 Month' },
  { value: 5, label: '5 Weeks' },
  { value: 6, label: '6 Weeks' },
  { value: 7, label: '7 Weeks' },
  { value: 8, label: '2 Months' },
];

const Root = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;
  background: ${(props) => props.theme.color.white};
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FilterDeliveryTime: React.FC<ProductFilterType> = (props) => {
  const { onSearchDone, products } = props;

  const handleAddSelect = useCallback(
    (e) => {
      const { checked, value } = e.target;
      const filters = [];
      const valueInt = parseInt(value, 10);
      if (checked) {
        filters.push(valueInt);
      } else {
        const index = filters.indexOf(valueInt);
        if (index > -1) {
          filters.splice(index, 1);
        }
      }
      if (filters.length === 0) {
        onSearchDone(products);
      } else {
        onSearchDone(filterByDeliveryTime(products, filters));
      }
    },
    [onSearchDone, products]
  );

  return (
    <Root>
      <InputCheckbox>
        {deliveryTimeData.map((item) => {
          return (
            <InputCheckbox.Item
              value={item.value}
              label={item.label}
              onChange={handleAddSelect}
            />
          );
        })}
      </InputCheckbox>
    </Root>
  );
};

export default FilterDeliveryTime;
