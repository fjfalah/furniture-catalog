import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
  color: {
    white: '#ffffff',
    black: '#101419',
    yellow: '#ffd41c',
    green: '#017865',
    red: '#c3423f',
    grey: '#9da5a5',
    lightGrey: '#dee7e7',
  },
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  boxShadowHover:
    '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  fontFamily: {
    baloo: 'Baloo Thambi, cursive',
    nunito: 'Nunito, sans-serif',
  },
};

export type Theme = typeof theme;
const styled = baseStyled as ThemedStyledInterface<Theme>;
export default styled;
