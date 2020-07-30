import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
  color: {
    white: '#ffffff',
    black: '#101419',
  },
  fontFamily: {
    baloo: 'Baloo Thambi, cursive',
    nunito: 'Nunito, sans-serif',
  },
};

export type Theme = typeof theme;
const styled = baseStyled as ThemedStyledInterface<Theme>;
export default styled;
