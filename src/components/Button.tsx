import styled from '../themes';

type ButtonType = {
  textColor?: string;
  background?: string;
};

const Button = styled.button<ButtonType>`
  border: 0;
  padding: 10px 15px;
  background: ${(props) => props.background || props.theme.color.green};
  color: ${(props) => props.textColor || props.theme.color.white};
  font-size: 15px;
  font-family: inherit;
  font-weight: bold;
  outline: none;
  border-radius: 8px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default Button;
