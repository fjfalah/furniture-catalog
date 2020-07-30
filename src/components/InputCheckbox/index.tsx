import React from 'react';

import styled from '../../themes';

import InputCheckboxItem, { InputCheckboxItemType } from './InputCheckboxItem';

type InputCheckboxType = {
  isVertical?: boolean;
};

const Root = styled('div')<{ isVertical?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: ${(props) => (props.isVertical ? 'column' : 'row')};
  flex-wrap: wrap;
`;

const InputCheckbox: React.FC<InputCheckboxType> & {
  Item?: InputCheckboxItemType;
} = ({ isVertical, children }) => {
  return <Root isVertical={isVertical}>{children}</Root>;
};

InputCheckbox.Item = InputCheckboxItem;

export default InputCheckbox;
