import styled from '../themes';

import Button from './Button';

export const FlexWrapper = styled.div`
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

export const FilterWrapper = styled(FlexWrapper)`
  justify-content: flex-end;
`;

export const ButtonFilter = styled(Button)`
  margin-left: 10px;
`;
export const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.color.white};
`;

export const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ProductCardWrapper = styled.div`
  width: 50%;

  @media only screen and (max-width: 720px) {
    width: 100%;
  }
`;
