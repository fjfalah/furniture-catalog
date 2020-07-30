import React, { useCallback, useState } from 'react';

import styled from '../themes';
import { ProductFilterType, OptionDataType } from '../types';
import { filterByDeliveryTime, filterByFurnitureStyle } from '../utils/filters';

import InputCheckbox from './InputCheckbox';

type OptDataType = {
  optionData: OptionDataType[];
  filterMethod: 'furnitureStyles' | 'deliveryTime';
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;
  background: ${(props) => props.theme.color.white};
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductsFilter: React.FC<ProductFilterType & OptDataType> = (props) => {
  const [filters, setFilters] = useState([]);
  const { onSearchDone, products, optionData, filterMethod } = props;
  const handleAddSelect = useCallback(
    (e) => {
      const { checked, value } = e.target;
      let filter = [];
      if (checked) {
        filter = [...filters, value];
      } else {
        filter = filters.filter((i) => i !== value);
      }
      setFilters(filter);
      const selectedProducts =
        filterMethod === 'deliveryTime'
          ? filterByDeliveryTime(products, filter)
          : filterByFurnitureStyle(products, filter);
      if (filter.length === 0) {
        onSearchDone(products);
      } else {
        onSearchDone(selectedProducts);
      }
    },
    [onSearchDone, products, filterMethod, filters]
  );
  return (
    <Root>
      <InputCheckbox>
        {optionData.map((item) => {
          return (
            <InputCheckbox.Item
              key={item.value}
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

export default ProductsFilter;
