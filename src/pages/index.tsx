import React from 'react';

import styled from '../themes';

const H1 = styled.h1`
  color: ${(props) => props.theme.color.black};
`;

const HomePage: React.FC = () => {
  return <H1>hello world</H1>;
};

export default HomePage;
