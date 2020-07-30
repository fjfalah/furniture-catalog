import React, { useRef, useCallback } from 'react';

import styled from '../themes';
import { ProductFilterType } from '../types';
import { filterByKeywordName } from '../utils/filters';

import ButtonBase from './Button';

const Root = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  @media only screen and (max-width: 720px) {
    width: 100%;
  }
`;

const InputSearch = styled.input`
  outline: 0;
  border: 0;
  padding: 16px 110px 16px 32px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  font-family: inherit;
  box-shadow: ${(props) => props.theme.boxShadow};
  min-width: 500px;
  width: 100%;
  &:focus {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }

  @media only screen and (max-width: 720px) {
    min-width: unset;
  }
`;

const Button = styled(ButtonBase)`
  position: absolute;
  right: 10px;
`;

const ProductSearchInput: React.FC<ProductFilterType> = (props) => {
  const inputRef = useRef(null);
  const { products, onSearchDone } = props;

  const handleSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();

      const { value } = e.target.inputSearch;
      const resultProducts = filterByKeywordName(products, value);

      if (value === '') {
        onSearchDone(products);
      } else {
        onSearchDone(resultProducts);
      }

      inputRef.current.value = '';
    },
    [onSearchDone, products]
  );

  return (
    <Root onSubmit={handleSubmitSearch}>
      <InputSearch
        type="text"
        placeholder="Search Furniture Name"
        ref={inputRef}
        name="inputSearch"
        minLength={3}
      />
      <Button type="submit">Search</Button>
    </Root>
  );
};

export default ProductSearchInput;
