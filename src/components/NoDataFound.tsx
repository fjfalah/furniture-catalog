import React from 'react';

import styled from '../themes';

import ButtonBase from './Button';

type NoDataFountType = {
  onClose?: () => void;
  textClose?: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoDataFoundText = styled.label`
  font-size: 20px;
  color: ${(props) => props.theme.color.white};
`;

const NoDataFoundEmotion = styled.label`
  font-size: 30px;
  color: ${(props) => props.theme.color.white};
`;

const Button = styled(ButtonBase)`
  background: ${(props) => props.theme.color.yellow};
  color: ${(props) => props.theme.color.black};
  padding: 5px 15px;
`;

const NoDataFound: React.FC<NoDataFountType> = ({ onClose, textClose }) => {
  return (
    <Root>
      <NoDataFoundEmotion>:(</NoDataFoundEmotion>
      <NoDataFoundText>Data Not Found</NoDataFoundText>
      {onClose && <Button onClick={onClose}>{textClose || 'close'}</Button>}
    </Root>
  );
};

export default NoDataFound;
