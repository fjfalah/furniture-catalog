import styled from '../themes';

const TypeItem = styled.label<{ background?: string; textColor?: string }>`
  background: ${(props) => props.background || props.theme.color.green};
  color: ${(props) => props.textColor || props.theme.color.white};
  padding: 0 5px;
  margin: 5px;
  border-radius: 5px;
  flex-shrink: 0;
`;

export default TypeItem;
