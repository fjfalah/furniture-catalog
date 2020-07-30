import * as React from 'react';

import styled from '../../themes';

const Item = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin: 0 10px 10px 0;
  font-family: ${(props) => props.theme.fontFamily.nunito};
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  &:checked ~ .check {
    background: ${(props) => props.theme.color.green} !important;
  }

  &:disabled {
    & ~ .check {
      background: ${(props) => props.theme.color.grey};
    }

    &:checked ~ .check {
      ::after {
        background: ${(props) => props.theme.color.grey};
      }
    }

    & ~ .label {
      color: ${(props) => props.theme.color.grey};
    }
  }
`;

const Dot = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.grey};
  transition: all 0.3s;

  ::after {
    content: '';
    height: 8px;
    width: 4px;
    border: solid white;
    border-width: 0 1.5px 1.5px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    transition: all 0.3s;
  }
`;

const Label = styled.span`
  padding: 0 16px;
`;

export type InputCheckboxItemType = React.FC<
  { label?: string } & React.InputHTMLAttributes<HTMLElement>
>;

const InputCheckboxItem: InputCheckboxItemType = (props) => {
  const { label, ...inputProps } = props;

  return (
    <Item>
      <Input type="checkbox" {...inputProps} />
      <Dot className="check" />
      <Label className="label">{label}</Label>
    </Item>
  );
};

export default InputCheckboxItem;
